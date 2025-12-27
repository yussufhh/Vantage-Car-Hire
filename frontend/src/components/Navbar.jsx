import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';

/**
 * Vantage Car Hire - Professional Navbar Component
 * Design System:
 * Primary: Deep Navy Blue (#0F172A)
 * Accent: Vibrant Orange (#F97316)
 */

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Our Fleet', path: '/fleet' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0F172A]/95 backdrop-blur-md shadow-xl border-b border-white/5' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#F97316] rounded-xl flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="ml-3">
                <h1 className="text-2xl font-bold text-white">
                  Vantage<span className="text-[#F97316]">CarHire</span>
                </h1>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Premium Rentals</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="px-5 py-2.5 text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="px-6 py-2.5 text-sm font-bold text-white hover:text-slate-200 rounded-lg transition-all"
            >
              Sign In
            </button>
            <button className="px-6 py-2.5 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm rounded-lg transition-all shadow-lg transform hover:-translate-y-0.5">
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <svg 
              className="w-6 h-6 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#0F172A]/98 backdrop-blur-md border-t border-white/5">
          <div className="container mx-auto px-6 max-w-7xl py-6">
            <div className="space-y-2 mb-6">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-5 py-3 text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex flex-col space-y-3 pt-6 border-t border-white/5">
              <button 
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full px-6 py-3 text-sm font-bold text-white hover:text-slate-200 border border-white/10 rounded-lg transition-all"
              >
                Sign In
              </button>
              <button className="w-full px-6 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm rounded-lg transition-all shadow-lg">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Features Bar (Optional - Shows on scroll) */}
      {isScrolled && (
        <div className="hidden xl:block bg-[#F97316]/10 border-b border-[#F97316]/20 backdrop-blur-md">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex items-center justify-center space-x-12 py-2.5">
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
                <span className="text-[#F97316]">✓</span>
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
                <span className="text-[#F97316]">✓</span>
                <span>Best Price Guarantee</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
                <span className="text-[#F97316]">✓</span>
                <span>Free Cancellation</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
                <span className="text-[#F97316]">✓</span>
                <span>Premium Fleet</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </nav>
  );
};

export default Navbar;
