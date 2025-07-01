import React, { createContext, useState, useEffect, useMemo } from 'react';

export const AuthContext = createContext({
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
  login: () => Promise.reject('AuthProvider not mounted'),
  register: () => Promise.reject('AuthProvider not mounted'),
  logout: () => {},
  updateUser: () => {},
  checkAuthStatus: () => {},
  getAuthHeaders: () => ({}),
  apiCall: () => Promise.reject('AuthProvider not mounted'),
  getUserRole: () => null,
  getUserId: () => null,
  getUserName: () => 'User'
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = !!user && !!token;

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const clearAuthData = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('devconnect_token');
    localStorage.removeItem('devconnect_user');
  };

  const checkAuthStatus = async () => {
    try {
      const savedToken = localStorage.getItem('devconnect_token');
      const savedUser = localStorage.getItem('devconnect_user');

      console.log('Checking auth status...', { 
        hasToken: !!savedToken, 
        hasUser: !!savedUser 
      });

      if (!savedToken || !savedUser) {
        console.log('No saved credentials found');
        clearAuthData();
        return;
      }

      // Validate token format
      if (!savedToken.trim() || savedToken === 'null' || savedToken === 'undefined') {
        console.log('Invalid token format');
        clearAuthData();
        return;
      }

      console.log('Verifying token with server...');
      const response = await fetch('/api/verify-token', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${savedToken}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Token verification response:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Token verified successfully');
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } else {
        console.log('Token verification failed:', response.status);
        
        // Handle different error scenarios
        if (response.status === 401) {
          console.log('Token expired or invalid');
        } else if (response.status === 404) {
          console.log('Verify endpoint not found');
        } else {
          console.log('Unexpected error during token verification');
        }
        
        clearAuthData();
      }
    } catch (error) {
      console.error('Auth check error:', error);
      
      // Network error or server unavailable
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        console.log('Network error - server may be unavailable');
        // Optionally, you might want to retry or show a different message
      }
      
      clearAuthData();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userData, userToken) => {
    try {
      // Validate inputs
      if (!userData || !userToken) {
        return { success: false, error: 'Invalid login data' };
      }

      console.log('Logging in user:', userData.email || userData.username);
      
      setUser(userData);
      setToken(userToken);
      localStorage.setItem('devconnect_token', userToken);
      localStorage.setItem('devconnect_user', JSON.stringify(userData));
      
      console.log('Login successful');
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    }
  };

  const register = async (formData) => {
    try {
      console.log('Attempting registration...');
      
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      let data = {};
      const rawText = await response.text();

      try {
        data = rawText ? JSON.parse(rawText) : {};
      } catch (e) {
        console.error('Failed to parse JSON response:', e);
        console.log('Raw response:', rawText);
      }

      if (!response.ok) {
        console.log('Registration failed:', response.status, data.message);
        return {
          success: false,
          error: data.message || 'Registration failed'
        };
      }

      console.log('Registration successful');
      await login(data.user, data.token);
      return { success: true, data };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Network error' };
    }
  };

  const logout = async () => {
    try {
      console.log('Logging out...');
      
      if (token) {
        await fetch('/api/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }
      
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuthData();
    }
  };

  const updateUser = (updatedUserData) => {
    console.log('Updating user data');
    setUser(updatedUserData);
    localStorage.setItem('devconnect_user', JSON.stringify(updatedUserData));
  };

  const getAuthHeaders = () => {
    return token ? {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    } : { 'Content-Type': 'application/json' };
  };

  const apiCall = async (url, options = {}) => {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...getAuthHeaders(),
          ...options.headers
        }
      });

      if (response.status === 401) {
        console.log('API call received 401 - logging out');
        logout();
        throw new Error('Session expired');
      }

      return response;
    } catch (error) {
      throw error;
    }
  };

  const contextValue = useMemo(() => ({
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    checkAuthStatus,
    getAuthHeaders,
    apiCall,
    getUserRole: () => user?.role || null,
    getUserId: () => user?.id || null,
    getUserName: () => user?.name || user?.email || 'User'
  }), [user, token, isLoading, isAuthenticated]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};