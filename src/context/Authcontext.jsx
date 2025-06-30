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

      if (!savedToken || !savedUser) {
        clearAuthData();
        return;
      }

      const response = await fetch('/api/auth/verify-token', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${savedToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } else {
        clearAuthData();
      }
    } catch (error) {
      console.error('Auth check error:', error);
      clearAuthData();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userData, userToken) => {
    try {
      setUser(userData);
      setToken(userToken);
      localStorage.setItem('devconnect_token', userToken);
      localStorage.setItem('devconnect_user', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    }
  };

  const register = async (formData) => {
    try {
      const response = await fetch('/api/auth/register', {
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
      }

      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'Registration failed'
        };
      }

      await login(data.user, data.token);
      return { success: true, data };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Network error' };
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await fetch('/api/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuthData();
    }
  };

  const updateUser = (updatedUserData) => {
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
        headers: getAuthHeaders()
      });

      if (response.status === 401) {
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
