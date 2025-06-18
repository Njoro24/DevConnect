// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/loginpage'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default App
