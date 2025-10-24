import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Target, Zap, Cloud } from 'lucide-react';

interface LandingPageProps {
  currentSection: string;
  onNavigate: (page: string) => void;
}

export function LandingPage({ currentSection, onNavigate }: LandingPageProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  React.useEffect(() => {
    if (currentSection === 'about') {
      scrollToSection('about');
    } else if (currentSection === 'todo') {
      scrollToSection('preview');
    }
  }, [currentSection]);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center px-6 bg-white">
        <div className="max-w-5xl text-center">
          <h1 className="mb-8 text-6xl font-bold text-[96px]">
            From chaos to clarity, 
          </h1>
          <p className="text-gray-500 text-2xl text-[40px]">
            one task at a time.
          </p>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="min-h-screen flex items-center px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto py-20">
          <h2 className="text-center mb-16">About Taskify</h2>
          
          <p className="text-center text-gray-600 mb-20 max-w-3xl mx-auto">
            Taskify is built on the principle that productivity doesn't have to be complicated. 
            Our minimalist approach helps you focus on what matters most – getting things done. 
            With a clean, distraction-free interface, you can organize your tasks and achieve your goals effortlessly.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-black mb-6">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="mb-4">Focused</h3>
              <p className="text-gray-600">
                Stay on track with a distraction-free interface designed for maximum productivity.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-black mb-6">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="mb-4">Simple</h3>
              <p className="text-gray-600">
                No clutter, no complexity. Just you and your tasks in perfect harmony.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-black mb-6">
                <Cloud className="w-10 h-10 text-white" />
              </div>
              <h3 className="mb-4">Accessible</h3>
              <p className="text-gray-600">
                Access your tasks anywhere, anytime. Your productivity travels with you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* To Do Preview Section */}
      <section id="preview" className="min-h-screen flex items-center px-6 bg-white">
        <div className="max-w-6xl mx-auto py-20 text-center">
          <h2 className="mb-8">Ready to get organized?</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Join thousands of people who have simplified their lives with Taskify. 
            Start managing your tasks with clarity and purpose.
          </p>
          
          <div className="mb-12 max-w-3xl mx-auto">
          </div>
          
          <button
            onClick={() => onNavigate('register')}
            className="px-12 py-4 bg-black text-white rounded hover:bg-gray-800 transition-colors"
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}
