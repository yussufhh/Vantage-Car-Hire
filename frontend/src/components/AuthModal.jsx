import React, { useState } from 'react';

/**
 * Vantage Car Hire - Professional Auth Modal Component
 * Design System:
 * Primary: Deep Navy Blue (#0F172A)
 * Accent: Vibrant Orange (#F97316)
 */

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('renter'); // 'renter' or 'owner'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Login:', formData);
      // Handle login logic
    } else {
      console.log('Signup:', { ...formData, userType });
      // Handle signup logic
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      phone: '',
      agreeToTerms: false
    });
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#0F172A]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden transform transition-all">
          <div className="flex flex-col md:flex-row">
            
            {/* Left Side - Branding */}
            <div className="relative md:w-2/5 bg-[#0F172A] p-12 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <img 
                  src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800" 
                  alt="Background" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-[#F97316] rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">
                      Vantage<span className="text-[#F97316]">CarHire</span>
                    </h1>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Premium Rentals</p>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-white mb-4">
                  {isLogin ? 'Welcome Back!' : 'Join Vantage'}
                </h2>
                <p className="text-slate-300 leading-relaxed mb-8">
                  {isLogin 
                    ? 'Access your account to manage bookings and explore our premium fleet.'
                    : 'Create your account and start your journey with premium car rentals today.'
                  }
                </p>

                {/* Features */}
                <div className="space-y-4">
                  {[
                    { icon: '✓', text: 'Premium luxury vehicles' },
                    { icon: '✓', text: '24/7 customer support' },
                    { icon: '✓', text: 'Flexible rental periods' },
                    { icon: '✓', text: 'Best price guarantee' }
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-[#F97316] text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {feature.icon}
                      </span>
                      <span className="text-slate-300 text-sm">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative circles */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#F97316]/10 rounded-full"></div>
              <div className="absolute -top-20 -left-20 w-48 h-48 bg-[#F97316]/5 rounded-full"></div>
            </div>

            {/* Right Side - Form */}
            <div className="md:w-3/5 p-8 md:p-12 relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors group"
              >
                <svg className="w-6 h-6 text-slate-400 group-hover:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Form Header */}
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-[#0F172A] mb-2">
                  {isLogin ? 'Sign In' : 'Create Account'}
                </h3>
                <p className="text-slate-500">
                  {isLogin 
                    ? 'Enter your credentials to access your account'
                    : 'Fill in your details to get started'
                  }
                </p>
              </div>

              {/* User Type Selection (Only for Signup) */}
              {!isLogin && (
                <div className="mb-6">
                  <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-3 block">
                    I want to
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setUserType('renter')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        userType === 'renter'
                          ? 'border-[#F97316] bg-[#F97316]/5'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">🚗</div>
                      <h4 className="font-bold text-[#0F172A] mb-1">Rent a Car</h4>
                      <p className="text-xs text-slate-500">Browse and rent vehicles</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserType('owner')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        userType === 'owner'
                          ? 'border-[#F97316] bg-[#F97316]/5'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">🔑</div>
                      <h4 className="font-bold text-[#0F172A] mb-1">List My Car</h4>
                      <p className="text-xs text-slate-500">Earn by renting out cars</p>
                    </button>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Full Name (Signup only) */}
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                )}

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Phone (Signup only) */}
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+254 700 000 000"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                )}

                {/* Password */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Confirm Password (Signup only) */}
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                )}

                {/* Remember Me / Forgot Password (Login) */}
                {isLogin && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-[#F97316] border-slate-300 rounded focus:ring-[#F97316]"
                      />
                      <span className="text-sm text-slate-600">Remember me</span>
                    </label>
                    <button type="button" className="text-sm text-[#F97316] hover:text-[#EA580C] font-semibold">
                      Forgot Password?
                    </button>
                  </div>
                )}

                {/* Terms Agreement (Signup) */}
                {!isLogin && (
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      required
                      className="w-4 h-4 text-[#F97316] border-slate-300 rounded focus:ring-[#F97316] mt-1"
                    />
                    <label className="text-sm text-slate-600">
                      I agree to the{' '}
                      <button type="button" className="text-[#F97316] hover:underline font-semibold">
                        Terms & Conditions
                      </button>
                      {' '}and{' '}
                      <button type="button" className="text-[#F97316] hover:underline font-semibold">
                        Privacy Policy
                      </button>
                    </label>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white font-bold py-4 rounded-xl transition-all shadow-lg transform hover:-translate-y-0.5"
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              {/* Social Login */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-slate-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="text-sm font-semibold text-slate-700">Google</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all"
                  >
                    <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="text-sm font-semibold text-slate-700">Facebook</span>
                  </button>
                </div>
              </div>

              {/* Switch Mode */}
              <div className="mt-8 text-center">
                <p className="text-sm text-slate-600">
                  {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                  <button
                    type="button"
                    onClick={switchMode}
                    className="text-[#F97316] hover:text-[#EA580C] font-bold"
                  >
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
