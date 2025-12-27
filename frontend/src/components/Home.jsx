import React, { useState } from 'react';

/**
 * Vantage Car Hire - Premium HomePage Component
 * * Design System:
 * Primary: Deep Navy Blue (#0F172A)
 * Accent: Vibrant Orange (#F97316)
 */

const Home = () => {
  const [searchQuery, setSearchQuery] = useState({
    location: '',
    pickupDate: '',
    returnDate: '',
    carType: 'All'
  });

  const featuredCars = [
    {
      id: 1,
      name: "Tesla Model S Plaid",
      type: "Electric",
      price: "150",
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800",
      specs: { transmission: "Auto", seats: "5", fuel: "Electric" }
    },
    {
      id: 2,
      name: "BMW M4 Competition",
      type: "Sport",
      price: "180",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800",
      specs: { transmission: "Auto", seats: "4", fuel: "Petrol" }
    },
    {
      id: 3,
      name: "Range Rover Autobiography",
      type: "Luxury SUV",
      price: "220",
      image: "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&q=80&w=800",
      specs: { transmission: "Auto", seats: "7", fuel: "Hybrid" }
    }
  ];

  return (
    <div className="w-full min-h-screen bg-white selection:bg-[#F97316] selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-[#0F172A]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1920" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-white uppercase bg-[#F97316] rounded-full">
              Premium Mobility Solutions
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Premium Car Rentals <br />
              <span className="text-[#F97316]">You Can Trust</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-xl">
              Experience the ultimate freedom on the road with our curated fleet of luxury and performance vehicles. Exceptional service, every mile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-xl transition-all shadow-lg transform hover:-translate-y-1">
                Browse Cars
              </button>
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl transition-all">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEARCH / BOOKING SECTION */}
      <section className="relative z-20 mt-16 container mx-auto px-6 max-w-7xl">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Pickup Location</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="City, Airport, Zip" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Pickup Date</label>
              <input 
                type="date" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#F97316] outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Return Date</label>
              <input 
                type="date" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#F97316] outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Car Type</label>
              <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#F97316] outline-none">
                <option>All Types</option>
                <option>Luxury</option>
                <option>Electric</option>
                <option>SUV</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold py-3.5 rounded-lg transition-colors shadow-lg shadow-navy-200">
                Find Available Cars
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED CARS SECTION */}
      <section className="py-24 container mx-auto px-6 max-w-7xl">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">Featured Vehicles</h2>
            <div className="h-1.5 w-20 bg-[#F97316] rounded-full"></div>
          </div>
          <button className="hidden md:block text-[#F97316] font-bold hover:underline underline-offset-8">
            View All Fleet →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCars.map((car) => (
            <div key={car.id} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300">
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={car.image} 
                  alt={car.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur rounded-lg text-sm font-bold text-[#0F172A]">
                  {car.type}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-[#0F172A]">{car.name}</h3>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#F97316]">${car.price}</p>
                    <p className="text-xs text-slate-400 font-medium">per day</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-50 mb-6">
                  <div className="text-center">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Trans</p>
                    <p className="text-sm font-semibold text-slate-700">{car.specs.transmission}</p>
                  </div>
                  <div className="text-center border-x border-slate-100">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Seats</p>
                    <p className="text-sm font-semibold text-slate-700">{car.specs.seats}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Fuel</p>
                    <p className="text-sm font-semibold text-slate-700">{car.specs.fuel}</p>
                  </div>
                </div>
                <button className="w-full py-3 bg-slate-50 group-hover:bg-[#F97316] text-[#0F172A] group-hover:text-white font-bold rounded-xl transition-all duration-300">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. WHY CHOOSE VANTAGE */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">The Vantage Advantage</h2>
            <p className="text-slate-500">We redefine the rental experience with a focus on quality, speed, and absolute customer satisfaction.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Affordable Pricing", desc: "Premium vehicles at rates that make sense.", icon: "💰" },
              { title: "Well-Maintained", desc: "Rigorous safety checks after every single rental.", icon: "🛡️" },
              { title: "24/7 Support", desc: "Our concierge team is always one call away.", icon: "📞" },
              { title: "Easy Booking", desc: "Reservations made simple via our web platform.", icon: "⚡" }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-6">{feature.icon}</div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-3">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="py-24 container mx-auto px-6 max-w-7xl">
        <h2 className="text-3xl font-bold text-center text-[#0F172A] mb-16">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {[
            { step: "01", title: "Choose Car", desc: "Select your dream car from our catalog." },
            { step: "02", title: "Book Online", desc: "Provide your dates and secure payment." },
            { step: "03", title: "Pick Up", desc: "Quick check-in at our premium lounge." },
            { step: "04", title: "Enjoy Drive", desc: "Hit the road with total peace of mind." }
          ].map((item, i) => (
            <div key={i} className="text-center relative">
              <div className="w-16 h-16 bg-[#0F172A] text-[#F97316] text-xl font-bold rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                {item.step}
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.desc}</p>
              {i < 3 && <div className="hidden lg:block absolute top-8 left-[60%] w-full h-[2px] bg-slate-100"></div>}
            </div>
          ))}
        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section className="py-24 bg-[#0F172A] overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-3xl font-bold text-white text-center mb-16">What Our Clients Say</h2>
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar">
            {[1, 2, 3].map((t) => (
              <div key={t} className="min-w-[320px] md:min-w-[400px] bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl snap-center">
                <div className="flex text-[#F97316] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-slate-300 italic mb-6">"Vantage Car Hire provided an impeccable service. The booking was easy, and the car was in showroom condition. Highly recommended!"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-700"></div>
                  <div>
                    <h4 className="text-white font-bold">Jonathan Vance</h4>
                    <p className="text-slate-500 text-xs">Business Executive</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION SECTION */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="bg-[#F97316] rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to hit the road?</h2>
              <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">Join over 10,000 satisfied customers who trust Vantage for their travel needs. Your journey begins here.</p>
              <button className="bg-[#0F172A] hover:bg-slate-800 text-white font-bold px-10 py-4 rounded-xl shadow-lg transition-all transform hover:scale-105">
                Get Started
              </button>
            </div>
            {/* Decorative SVG */}
            <svg className="absolute top-0 right-0 opacity-10 w-64 h-64 -mr-20 -mt-20 text-white" fill="currentColor" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"/></svg>
          </div>
        </div>
      </section>

      {/* 8. FOOTER SECTION */}
      <footer className="bg-[#0F172A] pt-20 pb-10 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 lg:col-span-1">
              <h3 className="text-2xl font-bold text-white mb-6">Vantage<span className="text-[#F97316]">CarHire</span></h3>
              <p className="text-slate-400 leading-relaxed mb-6">Redefining luxury rentals since 2015. We provide premium vehicles with a focus on client satisfaction and safety.</p>
              <div className="flex gap-4">
                {[1, 2, 3].map(i => <div key={i} className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:bg-[#F97316] transition-colors cursor-pointer"></div>)}
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-slate-400">
                <li className="hover:text-[#F97316] cursor-pointer transition-colors">Home</li>
                <li className="hover:text-[#F97316] cursor-pointer transition-colors">Our Fleet</li>
                <li className="hover:text-[#F97316] cursor-pointer transition-colors">About Us</li>
                <li className="hover:text-[#F97316] cursor-pointer transition-colors">Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Services</h4>
              <ul className="space-y-4 text-slate-400">
                <li className="hover:text-[#F97316] cursor-pointer transition-colors">Chauffeur Service</li>
                <li className="hover:text-[#F97316] cursor-pointer transition-colors">Airport Transfer</li>
                <li className="hover:text-[#F97316] cursor-pointer transition-colors">Corporate Accounts</li>
                <li className="hover:text-[#F97316] cursor-pointer transition-colors">Event Rentals</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Newsletter</h4>
              <p className="text-slate-400 text-sm mb-4">Subscribe to receive updates and exclusive offers.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-[#F97316]" />
                <button className="bg-[#F97316] p-2 rounded-lg text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Vantage Car Hire. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Global CSS for hidden scrollbar */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Home;