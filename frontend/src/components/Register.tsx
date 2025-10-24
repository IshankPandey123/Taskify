import React, { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuth } from '../contexts/AuthContext';

interface RegisterProps {
  onNavigate: (page: string) => void;
}

export function Register({ onNavigate }: RegisterProps) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    try {
      await register(email, username, password);
      onNavigate('todo');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row pt-16">
      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-md">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Create Account</h1>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
                placeholder="Enter your email"
                required
                disabled={loading}
              />
            </div>
            
            <div>
              <Label htmlFor="username" className="text-sm font-medium">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-2 border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
                placeholder="Choose a username"
                required
                disabled={loading}
              />
            </div>
            
            <div>
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
                placeholder="Create a password"
                required
                disabled={loading}
              />
            </div>
            
            <div>
              <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2 border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
                placeholder="Confirm your password"
                required
                disabled={loading}
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
          
          <p className="mt-6 text-center text-gray-600 text-sm">
            Already have an account?{' '}
            <button
              onClick={() => onNavigate('login')}
              className="text-black underline hover:no-underline font-medium"
              disabled={loading}
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
      
      {/* Image Section - Hidden on mobile, visible on desktop */}
      <div className="hidden md:block md:w-1/2 bg-gray-50">
        <ImageWithFallback
          src="https://images.pexels.com/photos/733857/pexels-photo-733857.jpeg"
          alt="Organization illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
