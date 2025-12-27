import React, { useState } from 'react';

/**
 * Vantage Car Hire - Professional User Dashboard Component
 * Design System:
 * Primary: Deep Navy Blue (#0F172A)
 * Accent: Vibrant Orange (#F97316)
 */

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'bookings', name: 'My Bookings', icon: '🚗' },
    { id: 'favorites', name: 'Favorites', icon: '❤️' },
    { id: 'payments', name: 'Payments', icon: '💳' },
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'support', name: 'Support', icon: '🆘' }
  ];

  const upcomingBookings = [
    {
      id: 1,
      car: "Tesla Model S Plaid",
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=400",
      pickup: "Jan 15, 2025",
      return: "Jan 20, 2025",
      location: "Garissa Central",
      status: "Confirmed",
      price: "$750"
    },
    {
      id: 2,
      car: "BMW M4 Competition",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=400",
      pickup: "Feb 5, 2025",
      return: "Feb 10, 2025",
      location: "Garissa Airport",
      status: "Pending",
      price: "$900"
    }
  ];

  const bookingHistory = [
    {
      id: 1,
      car: "Range Rover Autobiography",
      date: "Dec 10, 2024",
      duration: "5 days",
      amount: "$1,100",
      status: "Completed"
    },
    {
      id: 2,
      car: "Mercedes-Benz S-Class",
      date: "Nov 20, 2024",
      duration: "3 days",
      amount: "$600",
      status: "Completed"
    },
    {
      id: 3,
      car: "Porsche 911 Carrera",
      date: "Oct 15, 2024",
      duration: "7 days",
      amount: "$1,750",
      status: "Completed"
    }
  ];

  const favoriteCars = [
    {
      id: 1,
      name: "Ferrari F8 Tributo",
      image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=400",
      price: "$500/day",
      rating: 5.0
    },
    {
      id: 2,
      name: "Bentley Continental GT",
      image: "https://images.unsplash.com/photo-1581540222194-0def2dda95b8?auto=format&fit=crop&q=80&w=400",
      price: "$350/day",
      rating: 5.0
    },
    {
      id: 3,
      name: "Audi e-tron GT",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=400",
      price: "$170/day",
      rating: 4.8
    }
  ];

  const paymentMethods = [
    { id: 1, type: 'Visa', last4: '4242', expiry: '12/25', default: true },
    { id: 2, type: 'Mastercard', last4: '8888', expiry: '09/26', default: false }
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50 selection:bg-[#F97316] selection:text-white pt-24">
      <div className="container mx-auto px-6 max-w-7xl pb-12">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#0F172A] mb-2">Welcome back, John! 👋</h1>
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
                <button className="w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-semibold transition-all">
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
                    { label: 'Active Bookings', value: '2', icon: '🚗', color: 'bg-blue-500' },
                    { label: 'Total Rentals', value: '12', icon: '📊', color: 'bg-green-500' },
                    { label: 'Loyalty Points', value: '850', icon: '⭐', color: 'bg-[#F97316]' }
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
                    <h2 className="text-2xl font-bold text-[#0F172A]">Upcoming Bookings</h2>
                    <button className="text-[#F97316] font-semibold hover:underline">View All</button>
                  </div>
                  <div className="space-y-4">
                    {upcomingBookings.map((booking) => (
                      <div key={booking.id} className="flex flex-col md:flex-row gap-4 p-4 border border-slate-100 rounded-xl hover:border-[#F97316]/20 hover:shadow-lg transition-all">
                        <img src={booking.image} alt={booking.car} className="w-full md:w-32 h-24 object-cover rounded-lg" />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-bold text-[#0F172A] text-lg">{booking.car}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <p className="text-slate-500">Pickup</p>
                              <p className="font-semibold text-slate-700">{booking.pickup}</p>
                            </div>
                            <div>
                              <p className="text-slate-500">Return</p>
                              <p className="font-semibold text-slate-700">{booking.return}</p>
                            </div>
                            <div>
                              <p className="text-slate-500">Location</p>
                              <p className="font-semibold text-slate-700">{booking.location}</p>
                            </div>
                            <div>
                              <p className="text-slate-500">Total</p>
                              <p className="font-semibold text-[#F97316]">{booking.price}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex md:flex-col gap-2">
                          <button className="px-4 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-lg transition-all">
                            View Details
                          </button>
                          <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-all">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ))}
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
                  <div className="space-y-4">
                    {bookingHistory.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:shadow-lg transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-2xl">
                            🚗
                          </div>
                          <div>
                            <h3 className="font-bold text-[#0F172A]">{booking.car}</h3>
                            <p className="text-sm text-slate-500">{booking.date} • {booking.duration}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[#F97316] mb-1">{booking.amount}</p>
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* FAVORITES TAB */}
            {activeTab === 'favorites' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Favorite Cars</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {favoriteCars.map((car) => (
                      <div key={car.id} className="border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all group">
                        <div className="relative h-48 overflow-hidden">
                          <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                            ❤️
                          </button>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-[#0F172A] mb-2">{car.name}</h3>
                          <div className="flex items-center justify-between">
                            <span className="text-[#F97316] font-bold">{car.price}</span>
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-500">⭐</span>
                              <span className="font-semibold">{car.rating}</span>
                            </div>
                          </div>
                          <button className="w-full mt-4 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-lg transition-all">
                            Book Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
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
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="p-6 border-2 border-slate-200 rounded-xl hover:border-[#F97316]/50 transition-all">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center text-2xl">
                              💳
                            </div>
                            <div>
                              <p className="font-bold text-[#0F172A]">{method.type} •••• {method.last4}</p>
                              <p className="text-sm text-slate-500">Expires {method.expiry}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {method.default && (
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
                        JD
                      </div>
                      <button className="px-6 py-2 bg-slate-100 hover:bg-slate-200 font-bold rounded-lg transition-all">
                        Change Photo
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { label: 'Full Name', value: 'John Doe' },
                        { label: 'Email', value: 'john@example.com' },
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
