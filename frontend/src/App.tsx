import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { LandingPage } from './components/LandingPage';
import { TodoApp } from './components/TodoApp';
import { AuthProvider, useAuth } from './contexts/AuthContext';

type Page = 'home' | 'about' | 'todo' | 'login' | 'register';

function AppContent() {
  const { isLoggedIn, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleLogout = () => {
    logout();
    setCurrentPage('home');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const renderPage = () => {
    if (!isLoggedIn && currentPage === 'login') {
      return <Login onNavigate={handleNavigate} />;
    }

    if (!isLoggedIn && currentPage === 'register') {
      return <Register onNavigate={handleNavigate} />;
    }

    if (isLoggedIn && currentPage === 'todo') {
      return <TodoApp />;
    }

    // Landing page with sections
    return <LandingPage currentSection={currentPage} onNavigate={handleNavigate} />;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        isLoggedIn={isLoggedIn}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
      {renderPage()}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
