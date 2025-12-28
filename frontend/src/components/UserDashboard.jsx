import React, { useState, useEffect } from 'react';
import { authAPI, bookingAPI, favoriteAPI, paymentAPI, dashboardAPI } from '../api';
import { useNavigate } from 'react-router-dom';

/**
 * Vantage Car Hire - Professional User Dashboard Component
 * Design System:
 * Primary: Deep Navy Blue (#0F172A)
 * Accent: Vibrant Orange (#F97316)
 */

const UserDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    active_bookings: 0,
    total_rentals: 0,
    loyalty_points: 0
  });
  const [bookings, setBookings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      
      // Check if user is authenticated
      if (!authAPI.isAuthenticated()) {
        console.log('Not authenticated, redirecting to home');
        navigate('/');
        return;
      }

      // Load user info from storage first
      const storedUser = authAPI.getStoredUser();
      if (!storedUser) {
        console.log('No stored user, redirecting to home');
        navigate('/');
        return;
      }
      
      setUser(storedUser);

      // Try to load current user data from API (optional - won't fail if JWT has issues)
      try {
        const currentUser = await authAPI.getCurrentUser();
        console.log('Current logged in user:', currentUser);
        setUser(currentUser);
      } catch (apiError) {
        console.warn('Could not fetch current user from API, using stored user:', apiError);
        // Continue with stored user data
      }

      // Load dashboard stats
      const statsData = await dashboardAPI.getUserStats();
      console.log('User stats:', statsData);
      setStats(statsData);

      // Load bookings
      const bookingsData = await bookingAPI.getUserBookings();
      console.log('User bookings:', bookingsData);
      setBookings(bookingsData);

      // Load favorites
      const favoritesData = await favoriteAPI.getAll();
      console.log('User favorites:', favoritesData);
      setFavorites(favoritesData);

      // Load payment methods
      const paymentsData = await paymentAPI.getMethods();
      console.log('User payment methods:', paymentsData);
      setPaymentMethods(paymentsData);

      setLoading(false);
    } catch (error) {
      console.error('Error loading user data:', error);
      if (error.response?.status === 401) {
        // Unauthorized - redirect to login
        authAPI.logout();
      }
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (carId) => {
    try {
      await favoriteAPI.remove(carId);
      // Reload favorites
      const favoritesData = await favoriteAPI.getAll();
      setFavorites(favoritesData);
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#F97316] mx-auto mb-4"></div>
          <p className="text-[#0F172A] font-semibold">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'bookings', name: 'My Bookings', icon: '🚗' },
    { id: 'favorites', name: 'Favorites', icon: '❤️' },
    { id: 'payments', name: 'Payments', icon: '💳' },
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'support', name: 'Support', icon: '🆘' }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStatusColor = (status) => {
    const colors = {
      'Confirmed': 'bg-green-100 text-green-700',
      'Active': 'bg-blue-100 text-blue-700',
      'Completed': 'bg-gray-100 text-gray-700',
      'Cancelled': 'bg-red-100 text-red-700',
      'Pending': 'bg-yellow-100 text-yellow-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 selection:bg-[#F97316] selection:text-white pt-24">
      <div className="container mx-auto px-6 max-w-7xl pb-12">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#0F172A] mb-2">
            Welcome back, {user?.full_name || 'User'}! 👋
          </h1>
          <p className="text-slate-500">Manage your rentals and explore new vehicles</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-28">
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-left transition-all ${
                      activeTab === tab.id
                        ? 'bg-[#F97316] text-white shadow-lg'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span>{tab.name}</span>
                  </button>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-slate-100">
                <button 
                  onClick={() => authAPI.logout()}
                  className="w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-semibold transition-all"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: 'Active Bookings', value: stats.active_bookings, icon: '🚗', color: 'bg-blue-500' },
                    { label: 'Total Rentals', value: stats.total_rentals, icon: '📊', color: 'bg-green-500' },
                    { label: 'Loyalty Points', value: stats.loyalty_points, icon: '⭐', color: 'bg-[#F97316]' }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                          {stat.icon}
                        </div>
                      </div>
                      <p className="text-3xl font-bold text-[#0F172A] mb-1">{stat.value}</p>
                      <p className="text-sm text-slate-500">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Upcoming Bookings */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-[#0F172A]">Your Bookings</h2>
                    <button 
                      onClick={() => setActiveTab('bookings')}
                      className="text-[#F97316] font-semibold hover:underline"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {bookings.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">🚗</div>
                        <h3 className="text-xl font-bold text-[#0F172A] mb-2">No bookings yet</h3>
                        <p className="text-slate-500 mb-6">Start exploring our amazing fleet!</p>
                        <button 
                          onClick={() => navigate('/fleet')}
                          className="px-6 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-lg transition-all"
                        >
                          Browse Cars
                        </button>
                      </div>
                    ) : (
                      bookings.slice(0, 3).map((booking) => (
                        <div key={booking.id} className="flex flex-col md:flex-row gap-4 p-4 border border-slate-100 rounded-xl hover:border-[#F97316]/20 hover:shadow-lg transition-all">
                          <img 
                            src={booking.car?.image_url || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=400'} 
                            alt={booking.car?.name || 'Car'} 
                            className="w-full md:w-32 h-24 object-cover rounded-lg" 
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-bold text-[#0F172A] text-lg">{booking.car?.name || 'Car'}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(booking.status)}`}>
                                {booking.status}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <p className="text-slate-500">Pickup</p>
                                <p className="font-semibold text-slate-700">{formatDate(booking.pickup_date)}</p>
                              </div>
                              <div>
                                <p className="text-slate-500">Return</p>
                                <p className="font-semibold text-slate-700">{formatDate(booking.return_date)}</p>
                              </div>
                              <div>
                                <p className="text-slate-500">Location</p>
                                <p className="font-semibold text-slate-700">{booking.pickup_location}</p>
                              </div>
                              <div>
                                <p className="text-slate-500">Total</p>
                                <p className="font-semibold text-[#F97316]">KES {booking.total_amount?.toLocaleString()}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: 'Browse Fleet', icon: '🚗', desc: 'Explore available cars' },
                    { title: 'Extend Rental', icon: '⏰', desc: 'Extend current booking' },
                    { title: 'Get Support', icon: '💬', desc: 'Contact our team' }
                  ].map((action, i) => (
                    <button key={i} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all text-left group">
                      <div className="text-4xl mb-3">{action.icon}</div>
                      <h3 className="font-bold text-[#0F172A] mb-1 group-hover:text-[#F97316]">{action.title}</h3>
                      <p className="text-sm text-slate-500">{action.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* BOOKINGS TAB */}
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Booking History</h2>
                  {bookings.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">📅</div>
                      <h3 className="text-xl font-bold text-[#0F172A] mb-2">No bookings found</h3>
                      <p className="text-slate-500 mb-6">You haven't made any reservations yet</p>
                      <button 
                        onClick={() => navigate('/fleet')}
                        className="px-6 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-lg transition-all"
                      >
                        Browse Cars
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {bookings.map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:shadow-lg transition-all">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-2xl">
                              🚗
                            </div>
                            <div>
                              <h3 className="font-bold text-[#0F172A]">{booking.car?.name || 'Car'}</h3>
                              <p className="text-sm text-slate-500">
                                {formatDate(booking.pickup_date)} - {formatDate(booking.return_date)}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-[#F97316] mb-1">KES {booking.total_amount?.toLocaleString()}</p>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* FAVORITES TAB */}
            {activeTab === 'favorites' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Favorite Cars</h2>
                  {favorites.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">❤️</div>
                      <h3 className="text-xl font-bold text-[#0F172A] mb-2">No favorites yet</h3>
                      <p className="text-slate-500 mb-6">Save your favorite cars for quick access</p>
                      <button 
                        onClick={() => navigate('/fleet')}
                        className="px-6 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-lg transition-all"
                      >
                        Browse Cars
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {favorites.map((fav) => (
                        <div key={fav.id} className="border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all group">
                          <div className="relative h-48 overflow-hidden">
                            <img 
                              src={fav.car?.image_url || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=400'} 
                              alt={fav.car?.name || 'Car'} 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                            />
                            <button 
                              onClick={() => handleRemoveFavorite(fav.car_id)}
                              className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                            >
                              ❤️
                            </button>
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold text-[#0F172A] mb-2">{fav.car?.name || 'Car'}</h3>
                            <div className="flex items-center justify-between">
                              <span className="text-[#F97316] font-bold">KES {fav.car?.daily_rate?.toLocaleString()}/day</span>
                              <div className="flex items-center gap-1">
                                <span className="text-yellow-500">⭐</span>
                                <span className="font-semibold">{fav.car?.rating || 0}</span>
                              </div>
                            </div>
                            <button 
                              onClick={() => navigate('/fleet')}
                              className="w-full mt-4 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-lg transition-all"
                            >
                              Book Now
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* PAYMENTS TAB */}
            {activeTab === 'payments' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-[#0F172A]">Payment Methods</h2>
                    <button className="px-4 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-lg transition-all">
                      + Add New
                    </button>
                  </div>
                  {paymentMethods.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">💳</div>
                      <h3 className="text-xl font-bold text-[#0F172A] mb-2">No payment methods</h3>
                      <p className="text-slate-500 mb-6">Add a payment method to make bookings easier</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {paymentMethods.map((method) => (
                        <div key={method.id} className="p-6 border-2 border-slate-200 rounded-xl hover:border-[#F97316]/50 transition-all">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center text-2xl">
                                💳
                              </div>
                              <div>
                                <p className="font-bold text-[#0F172A]">{method.card_type} •••• {method.last_four}</p>
                                <p className="text-sm text-slate-500">Expires {method.expiry_month}/{method.expiry_year}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {method.is_default && (
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                                  Default
                                </span>
                              )}
                              <button className="p-2 hover:bg-slate-100 rounded-lg">⋮</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Profile Settings</h2>
                  <div className="space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 bg-[#F97316] rounded-full flex items-center justify-center text-4xl text-white font-bold">
                        {user?.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                      </div>
                      <button className="px-6 py-2 bg-slate-100 hover:bg-slate-200 font-bold rounded-lg transition-all">
                        Change Photo
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { label: 'Full Name', value: user?.full_name || '' },
                        { label: 'Email', value: user?.email || '' },
                        { label: 'Phone', value: user?.phone || '' },
                        { label: 'Location', value: user?.location || 'Garissa, Kenya' }
                      ].map((field, i) => (
                        <div key={i} className="space-y-2">
                          <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">{field.label}</label>
                          <input
                            type="text"
                            defaultValue={field.value}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#F97316] outline-none"
                          />
                        </div>
                      ))}
                    </div>
                    <button className="px-8 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-lg transition-all">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SUPPORT TAB */}
            {activeTab === 'support' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Help & Support</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {[
                      { title: 'Live Chat', desc: 'Chat with support team', icon: '💬' },
                      { title: 'Call Us', desc: '+254 (20) 123-4567', icon: '📞' },
                      { title: 'Email', desc: 'hello@vantagecarhire.com', icon: '✉️' },
                      { title: 'FAQ', desc: 'Browse help articles', icon: '❓' }
                    ].map((option, i) => (
                      <button key={i} className="p-6 border border-slate-200 rounded-xl hover:border-[#F97316]/50 hover:shadow-lg transition-all text-left">
                        <div className="text-3xl mb-3">{option.icon}</div>
                        <h3 className="font-bold text-[#0F172A] mb-1">{option.title}</h3>
                        <p className="text-sm text-slate-500">{option.desc}</p>
                      </button>
                    ))}
                  </div>
                  <div className="bg-slate-50 rounded-xl p-6">
                    <h3 className="font-bold text-[#0F172A] mb-4">Send us a message</h3>
                    <textarea
                      rows="4"
                      placeholder="Describe your issue..."
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#F97316] outline-none mb-4"
                    ></textarea>
                    <button className="px-8 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-lg transition-all">
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
