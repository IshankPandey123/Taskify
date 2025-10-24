import React from 'react';
import { CheckSquare } from 'lucide-react';

interface NavbarProps {
  isLoggedIn: boolean;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function Navbar({ isLoggedIn, currentPage, onNavigate, onLogout }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
          <CheckSquare className="w-6 h-6" />
          <span className="tracking-tight">Taskify</span>
        </div>
        
        <div className="flex items-center gap-8">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors ${
              currentPage === 'home' ? 'text-black' : 'text-gray-500 hover:text-black'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`transition-colors ${
              currentPage === 'about' ? 'text-black' : 'text-gray-500 hover:text-black'
            }`}
          >
            About Us
          </button>
          <button
            onClick={() => onNavigate('todo')}
            className={`transition-colors ${
              currentPage === 'todo' ? 'text-black' : 'text-gray-500 hover:text-black'
            }`}
          >
            {isLoggedIn ? 'My To-Do' : 'To Do'}
          </button>
          
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => onNavigate('register')}
                className="px-5 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
              >
                Sign Up
              </button>
              <button
                onClick={() => onNavigate('login')}
                className="px-5 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
              >
                Sign In
              </button>
            </>
          ) : (
            <button
              onClick={onLogout}
              className="px-5 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
