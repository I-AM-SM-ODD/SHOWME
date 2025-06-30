import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProfileProvider } from './contexts/ProfileContext';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PortfolioBuilder from './pages/PortfolioBuilder';
import ViewPortfolio from './pages/ViewPortfolio';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProfileProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
              <ThemeToggle />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/portfolio/:username" element={<ViewPortfolio />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/create" 
                  element={
                    <ProtectedRoute>
                      <PortfolioBuilder />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: 'var(--toast-bg)',
                    color: 'var(--toast-color)',
                  },
                }}
              />
            </div>
          </Router>
        </ProfileProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;