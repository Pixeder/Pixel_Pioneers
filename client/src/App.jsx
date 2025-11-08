// src/App.jsx
import React, { useState, useMemo, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import YouTubeQuiz from './pages/YoutubeQuiz.jsx';
import SyllabusResourcesHub from './pages/SyllabusResources.jsx';
import SmartSummarizer from './pages/SmartSummarizer.jsx';
import ChatBotWidget from './hooks/ChatBot.jsx';

import StudentSupportPage from './pages/Support.jsx';
import SanaLabsLandingPage from './pages/Home.jsx';


// ✅ Create Auth Context first
export const AuthContext = React.createContext();

// ✅ Protected Route now uses context instead of reading localStorage directly
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// ✅ Auth Provider
const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));

  const login = useCallback((token) => {
    setAuthToken(token);
    setIsAuthenticated(true);
    localStorage.setItem('authToken', token);
  }, []);

  const logout = useCallback(() => {
    setAuthToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
  }, []);

  const contextValue = useMemo(
    () => ({
      authToken,
      isAuthenticated,
      login,
      logout,
    }),
    [authToken, isAuthenticated, login, logout]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SanaLabsLandingPage/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/quiz" element={<YouTubeQuiz />} />
          <Route path="/syllabus" element={<SyllabusResourcesHub/>} />
           <Route path="/summarize" element={<SmartSummarizer/>} />
            <Route path="/support" element={<StudentSupportPage/>} />


          
        </Routes>
         <ChatBotWidget position="bottom-right" />
      </Router>
    </AuthProvider>
  );
}

export default App;