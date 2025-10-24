import React, { useState } from 'react';
import { CheckSquare, Menu, X } from 'lucide-react';

interface NavbarProps {
  isLoggedIn: boolean;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function Navbar({ isLoggedIn, currentPage, onNavigate, onLogout }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigation('home')}>
          <CheckSquare className="w-6 h-6" />
          <span className="tracking-tight font-semibold">Taskify</span>
        </div>
        
        {/* Mobile Menu Button - Always visible for clean design */}
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-4">
            {/* Navigation Links */}
            <div className="space-y-3">
              <button
                onClick={() => handleNavigation('home')}
                className={`block w-full text-left py-2 px-3 rounded-md transition-colors ${
                  currentPage === 'home' ? 'bg-gray-100 text-black font-medium' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation('about')}
                className={`block w-full text-left py-2 px-3 rounded-md transition-colors ${
                  currentPage === 'about' ? 'bg-gray-100 text-black font-medium' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                About Us
              </button>
              <button
                onClick={() => handleNavigation('todo')}
                className={`block w-full text-left py-2 px-3 rounded-md transition-colors ${
                  currentPage === 'todo' ? 'bg-gray-100 text-black font-medium' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {isLoggedIn ? 'My To-Do' : 'To Do'}
              </button>
            </div>

            {/* Auth Buttons */}
            <div className="pt-4 border-t border-gray-200">
              {!isLoggedIn ? (
                <div className="space-y-3">
                  <button
                    onClick={() => handleNavigation('register')}
                    className="w-full py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors"
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() => handleNavigation('login')}
                    className="w-full py-3 bg-gray-100 text-black rounded hover:bg-gray-200 transition-colors"
                  >
                    Sign In
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full py-3 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors font-medium"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
