import React, { useState, useEffect } from 'react';
import { authAPI, carAPI, bookingAPI, dashboardAPI } from '../api';
import { useNavigate } from 'react-router-dom';

/**
 * Vantage Car Hire - Professional Car Owner Dashboard Component
 * Design System:
 * Primary: Deep Navy Blue (#0F172A)
 * Accent: Vibrant Orange (#F97316)
 */

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total_cars: 0,
    active_bookings: 0,
    monthly_earnings: 0,
    avg_rating: 0
  });
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadOwnerData();
  }, []);

  const loadOwnerData = async () => {
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

      // Verify user is an owner
      if (storedUser.user_type !== 'owner') {
        console.log('User is not an owner, redirecting to user dashboard');
        navigate('/user-dashboard');
        return;
      }

      // Try to load current user data from API (optional - won't fail if JWT has issues)
      try {
        const currentUser = await authAPI.getCurrentUser();
        setUser(currentUser);
      } catch (apiError) {
        console.warn('Could not fetch current user from API, using stored user:', apiError);
        // Continue with stored user data
      }

      // Load dashboard stats
      const statsData = await dashboardAPI.getOwnerStats();
      setStats(statsData);

      // Load owner's cars
      const carsData = await carAPI.getOwnerCars();
      setCars(carsData);

      // Load owner's bookings
      const bookingsData = await bookingAPI.getOwnerBookings();
      setBookings(bookingsData);

      setLoading(false);
    } catch (error) {
      console.error('Error loading owner data:', error);
      if (error.response?.status === 401) {
        authAPI.logout();
      }
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStatusColor = (status) => {
    const colors = {
      'Available': 'bg-green-100 text-green-700',
      'Rented': 'bg-blue-100 text-blue-700',
      'Maintenance': 'bg-yellow-100 text-yellow-700',
      'Confirmed': 'bg-green-100 text-green-700',
      'Active': 'bg-blue-100 text-blue-700',
      'Completed': 'bg-gray-100 text-gray-700',
      'Cancelled': 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
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
    { id: 'cars', name: 'My Cars', icon: '🚗' },
    { id: 'add-car', name: 'Add Car', icon: '➕' },
    { id: 'bookings', name: 'Bookings', icon: '📅' },
    { id: 'earnings', name: 'Earnings', icon: '💰' },
    { id: 'reviews', name: 'Reviews', icon: '⭐' },
    { id: 'settings', name: 'Settings', icon: '⚙️' }
  ];

  const reviews = [
    {
      id: 1,
      car: "Tesla Model S Plaid",
      renter: "James Wilson",
      rating: 5,
      comment: "Amazing car! Smooth drive and excellent condition. Highly recommended!",
      date: "Dec 20, 2024"
    },
    {
      id: 2,
      car: "BMW M4 Competition",
      renter: "Sarah Johnson",
      rating: 5,
      comment: "Perfect for my business trip. Owner was very professional.",
      date: "Dec 15, 2024"
    }
  ];

  const monthlyEarnings = [
    { month: 'Jan', amount: 4500 },
    { month: 'Feb', amount: 5200 },
    { month: 'Mar', amount: 4800 },
    { month: 'Apr', amount: 6100 },
    { month: 'May', amount: 5800 },
    { month: 'Jun', amount: 7200 }
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50 selection:bg-[#F97316] selection:text-white pt-24">
      <div className="container mx-auto px-6 max-w-7xl pb-12">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#0F172A] mb-2">
            Welcome, {user?.full_name || 'Owner'}! 🚗
          </h1>
          <p className="text-slate-500">Manage your fleet and maximize your earnings</p>
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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { label: 'Total Cars', value: stats.total_cars, icon: '🚗', color: 'bg-blue-500' },
                    { label: 'Active Bookings', value: stats.active_bookings, icon: '📅', color: 'bg-green-500' },
                    { label: 'Monthly Earnings', value: `KES ${stats.monthly_earnings?.toLocaleString()}`, icon: '💰', color: 'bg-[#F97316]' },
                    { label: 'Avg Rating', value: stats.avg_rating?.toFixed(2), icon: '⭐', color: 'bg-yellow-500' }
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

                {/* Earnings Chart */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Earnings Overview</h2>
                  <div className="flex items-end justify-between h-64 gap-4">
                    {monthlyEarnings.map((data, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full bg-slate-100 rounded-t-lg relative" style={{ height: `${(data.amount / 8000) * 100}%` }}>
                          <div className="absolute inset-0 bg-gradient-to-t from-[#F97316] to-[#EA580C] rounded-t-lg"></div>
                        </div>
                        <p className="text-xs font-bold text-slate-600">{data.month}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="text-sm text-slate-500">Total Earnings (6 months)</p>
                      <p className="text-2xl font-bold text-[#0F172A]">$33,600</p>
                    </div>
                    <button className="px-6 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-lg transition-all">
                      View Details
                    </button>
                  </div>
                </div>

                {/* Recent Bookings */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-[#0F172A]">Recent Bookings</h2>
                    <button className="text-[#F97316] font-semibold hover:underline">View All</button>
                  </div>
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:shadow-lg transition-all">
                        <div>
                          <h3 className="font-bold text-[#0F172A]">{booking.car}</h3>
                          <p className="text-sm text-slate-500">{booking.renter} • {booking.dates}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[#F97316] mb-1">{booking.amount}</p>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            booking.status === 'Active' ? 'bg-blue-100 text-blue-700' :
                            booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* MY CARS TAB */}
            {activeTab === 'cars' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-[#0F172A]">My Fleet</h2>
                    <button 
                      onClick={() => setActiveTab('add-car')}
                      className="px-6 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-lg transition-all"
                    >
                      + Add New Car
                    </button>
                  </div>
                  {cars.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">🚗</div>
                      <h3 className="text-xl font-bold text-[#0F172A] mb-2">No cars in your fleet</h3>
                      <p className="text-slate-500 mb-6">Add your first car to start earning</p>
                      <button 
                        onClick={() => setActiveTab('add-car')}
                        className="px-6 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-lg transition-all"
                      >
                        Add Your First Car
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6">
                      {cars.map((car) => (
                        <div key={car.id} className="flex flex-col md:flex-row gap-4 p-4 border border-slate-100 rounded-xl hover:shadow-xl transition-all">
                          <img 
                            src={car.image_url || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=400'} 
                            alt={car.name} 
                            className="w-full md:w-48 h-32 object-cover rounded-lg" 
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="font-bold text-[#0F172A] text-lg mb-1">{car.name}</h3>
                                <p className="text-[#F97316] font-bold">KES {car.daily_rate?.toLocaleString()}/day</p>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(car.status)}`}>
                                {car.status}
                              </span>
                            </div>
                            <div className="grid grid-cols-3 gap-4 mb-4">
                              <div>
                                <p className="text-xs text-slate-500">Total Bookings</p>
                                <p className="font-bold text-slate-700">{car.total_bookings || 0}</p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-500">Rating</p>
                                <p className="font-bold text-slate-700">⭐ {car.rating || 0}</p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-500">Total Earned</p>
                                <p className="font-bold text-[#F97316]">KES {car.total_earnings?.toLocaleString() || 0}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button className="px-4 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-lg transition-all">
                                Edit
                              </button>
                              <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-all">
                                View Details
                              </button>
                              <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-all">
                                Deactivate
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ADD CAR TAB */}
            {activeTab === 'add-car' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Add New Car</h2>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { label: 'Car Name', type: 'text', placeholder: 'Tesla Model S Plaid' },
                        { label: 'Brand', type: 'text', placeholder: 'Tesla' },
                        { label: 'Model Year', type: 'number', placeholder: '2024' },
                        { label: 'Category', type: 'select', options: ['Electric', 'Sport', 'SUV', 'Luxury'] },
                        { label: 'Daily Rate ($)', type: 'number', placeholder: '150' },
                        { label: 'Location', type: 'text', placeholder: 'Garissa Central' }
                      ].map((field, i) => (
                        <div key={i} className="space-y-2">
                          <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">{field.label} *</label>
                          {field.type === 'select' ? (
                            <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#F97316] outline-none">
                              {field.options.map((option, j) => (
                                <option key={j}>{option}</option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type={field.type}
                              placeholder={field.placeholder}
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#F97316] outline-none"
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Specifications</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['Transmission', 'Seats', 'Fuel Type', 'Luggage'].map((spec, i) => (
                          <input
                            key={i}
                            type="text"
                            placeholder={spec}
                            className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#F97316] outline-none"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Description</label>
                      <textarea
                        rows="4"
                        placeholder="Describe your car's features and condition..."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#F97316] outline-none"
                      ></textarea>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Upload Photos</label>
                      <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:border-[#F97316] transition-all cursor-pointer">
                        <div className="text-5xl mb-4">📷</div>
                        <p className="font-semibold text-slate-700 mb-1">Click to upload car photos</p>
                        <p className="text-sm text-slate-500">PNG, JPG up to 10MB (Minimum 5 photos)</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button type="submit" className="px-8 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-lg transition-all">
                        Add Car to Fleet
                      </button>
                      <button type="button" className="px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-all">
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* BOOKINGS TAB */}
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-6">All Bookings</h2>
                  {bookings.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">📅</div>
                      <h3 className="text-xl font-bold text-[#0F172A] mb-2">No bookings yet</h3>
                      <p className="text-slate-500">Your car bookings will appear here</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {bookings.map((booking) => (
                        <div key={booking.id} className="p-4 border border-slate-100 rounded-xl hover:shadow-lg transition-all">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold text-[#0F172A]">{booking.car?.name || 'N/A'}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                            <div>
                              <p className="text-slate-500">Renter</p>
                              <p className="font-semibold">{booking.user?.full_name || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-slate-500">Dates</p>
                              <p className="font-semibold">{formatDate(booking.start_date)} - {formatDate(booking.end_date)}</p>
                            </div>
                            <div>
                              <p className="text-slate-500">Amount</p>
                              <p className="font-semibold text-[#F97316]">KES {booking.total_price?.toLocaleString()}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="px-4 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-lg transition-all text-sm">
                              View Details
                            </button>
                            <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-all text-sm">
                              Contact Renter
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* EARNINGS TAB */}
            {activeTab === 'earnings' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: 'This Month', value: '$7,200', change: '+12%' },
                    { label: 'Last Month', value: '$5,800', change: '+8%' },
                    { label: 'Total Earnings', value: '$33,600', change: '+25%' }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 shadow-md">
                      <p className="text-sm text-slate-500 mb-2">{stat.label}</p>
                      <p className="text-3xl font-bold text-[#0F172A] mb-2">{stat.value}</p>
                      <span className="text-sm text-green-600 font-bold">{stat.change}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Payout Information</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-sm text-slate-500 mb-1">Bank Account</p>
                      <p className="font-bold text-[#0F172A]">**** **** **** 4242</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-sm text-slate-500 mb-1">Next Payout</p>
                      <p className="font-bold text-[#0F172A]">Jan 31, 2025 • $7,200</p>
                    </div>
                    <button className="px-6 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-lg transition-all">
                      Request Payout
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* REVIEWS TAB */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Customer Reviews</h2>
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="p-6 border border-slate-100 rounded-xl">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-bold text-[#0F172A]">{review.car}</h3>
                            <p className="text-sm text-slate-500">{review.renter}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <span key={i} className="text-yellow-500">⭐</span>
                            ))}
                          </div>
                        </div>
                        <p className="text-slate-600 mb-2">{review.comment}</p>
                        <p className="text-xs text-slate-400">{review.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Account Settings</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { label: 'Business Name', value: 'Vantage Fleet Owner' },
                        { label: 'Email', value: 'owner@vantagecarhire.com' },
                        { label: 'Phone', value: '+254 700 000 000' },
                        { label: 'Location', value: 'Garissa, Kenya' }
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

          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
