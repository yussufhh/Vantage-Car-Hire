import React, { useState } from 'react';

/**
 * Vantage Car Hire - Professional Our Fleet Component
 * Design System:
 * Primary: Deep Navy Blue (#0F172A)
 * Accent: Vibrant Orange (#F97316)
 */

const OurFleet = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  const categories = ['All', 'Luxury', 'Sport', 'SUV', 'Electric', 'Convertible', 'Executive'];
  const priceFilters = ['All', 'Under $100', '$100-$200', 'Over $200'];

  const fleetCars = [
    {
      id: 1,
      name: "Tesla Model S Plaid",
      category: "Electric",
      price: "150",
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800",
      specs: { transmission: "Auto", seats: "5", fuel: "Electric", luggage: "3" },
      features: ["Autopilot", "Premium Sound", "Glass Roof"],
      year: "2024",
      rating: 4.9
    },
    {
      id: 2,
      name: "BMW M4 Competition",
      category: "Sport",
      price: "180",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800",
      specs: { transmission: "Auto", seats: "4", fuel: "Petrol", luggage: "2" },
      features: ["Sport Mode", "Carbon Fiber", "Track Package"],
      year: "2024",
      rating: 4.8
    },
    {
      id: 3,
      name: "Range Rover Autobiography",
      category: "SUV",
      price: "220",
      image: "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&q=80&w=800",
      specs: { transmission: "Auto", seats: "7", fuel: "Hybrid", luggage: "5" },
      features: ["Massage Seats", "Air Suspension", "Panoramic Roof"],
      year: "2024",
      rating: 4.9
    },
    {
      id: 4,
      name: "Mercedes-Benz S-Class",
      category: "Luxury",
      price: "200",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800",
      specs: { transmission: "Auto", seats: "5", fuel: "Hybrid", luggage: "3" },
      features: ["Executive Rear", "MBUX System", "4MATIC AWD"],
      year: "2024",
      rating: 5.0
    },
    {
      id: 5,
      name: "Porsche 911 Carrera",
      category: "Sport",
      price: "250",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800",
      specs: { transmission: "Auto", seats: "4", fuel: "Petrol", luggage: "2" },
      features: ["Sport Chrono", "PASM", "Launch Control"],
      year: "2024",
      rating: 4.9
    },
    {
      id: 6,
      name: "Audi e-tron GT",
      category: "Electric",
      price: "170",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=800",
      specs: { transmission: "Auto", seats: "5", fuel: "Electric", luggage: "3" },
      features: ["Quattro AWD", "800V Charging", "Virtual Cockpit"],
      year: "2024",
      rating: 4.8
    },
    {
      id: 7,
      name: "BMW X7 M Sport",
      category: "SUV",
      price: "190",
      image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=800",
      specs: { transmission: "Auto", seats: "7", fuel: "Diesel", luggage: "5" },
      features: ["Sky Lounge Roof", "Comfort Seats", "xDrive AWD"],
      year: "2024",
      rating: 4.7
    },
    {
      id: 8,
      name: "Ferrari F8 Tributo",
      category: "Sport",
      price: "500",
      image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=800",
      specs: { transmission: "Auto", seats: "2", fuel: "Petrol", luggage: "1" },
      features: ["V8 Twin Turbo", "Carbon Package", "Race Mode"],
      year: "2024",
      rating: 5.0
    },
    {
      id: 9,
      name: "Bentley Continental GT",
      category: "Luxury",
      price: "350",
      image: "https://images.unsplash.com/photo-1581540222194-0def2dda95b8?auto=format&fit=crop&q=80&w=800",
      specs: { transmission: "Auto", seats: "4", fuel: "Petrol", luggage: "2" },
      features: ["Handcrafted Interior", "Naim Audio", "Mulliner Spec"],
      year: "2024",
      rating: 5.0
    }
  ];

  const filteredCars = fleetCars.filter(car => {
    const categoryMatch = activeCategory === 'All' || car.category === activeCategory;
    const priceMatch = priceRange === 'All' || 
      (priceRange === 'Under $100' && parseInt(car.price) < 100) ||
      (priceRange === '$100-$200' && parseInt(car.price) >= 100 && parseInt(car.price) <= 200) ||
      (priceRange === 'Over $200' && parseInt(car.price) > 200);
    return categoryMatch && priceMatch;
  });

  return (
    <div className="w-full min-h-screen bg-white selection:bg-[#F97316] selection:text-white">
      
      {/* 1. HERO HEADER SECTION */}
      <section className="relative min-h-[60vh] flex items-center pt-20 overflow-hidden bg-[#0F172A]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920" 
            alt="Fleet Background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/80 via-[#0F172A]/60 to-[#0F172A]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-white uppercase bg-[#F97316] rounded-full">
              Premium Selection
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Explore Our <br />
              <span className="text-[#F97316]">Exceptional Fleet</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              From elegant luxury sedans to high-performance sports cars, discover the perfect vehicle for every journey and occasion.
            </p>
            <div className="flex items-center justify-center gap-8 text-white">
              <div className="text-center">
                <p className="text-4xl font-bold text-[#F97316]">50+</p>
                <p className="text-sm text-slate-400 mt-1">Premium Cars</p>
              </div>
              <div className="h-12 w-px bg-white/10"></div>
              <div className="text-center">
                <p className="text-4xl font-bold text-[#F97316]">15+</p>
                <p className="text-sm text-slate-400 mt-1">Brands</p>
              </div>
              <div className="h-12 w-px bg-white/10"></div>
              <div className="text-center">
                <p className="text-4xl font-bold text-[#F97316]">2024</p>
                <p className="text-sm text-slate-400 mt-1">Latest Models</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FILTER & SEARCH SECTION */}
      <section className="relative z-20 mt-16 container mx-auto px-6 max-w-7xl">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-[#0F172A] mb-2">Filter by Category</h3>
              <p className="text-sm text-slate-500">Choose your preferred vehicle type</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-slate-600">{filteredCars.length} vehicles found</span>
              <div className="flex bg-slate-50 rounded-lg p-1">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                >
                  <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                >
                  <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                  activeCategory === category
                    ? 'bg-[#F97316] text-white shadow-lg shadow-orange-200'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Price Range Filter */}
          <div className="pt-6 border-t border-slate-100">
            <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-3 block">Price Range (per day)</label>
            <div className="flex flex-wrap gap-3">
              {priceFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setPriceRange(filter)}
                  className={`px-5 py-2 rounded-lg font-medium text-sm transition-all ${
                    priceRange === filter
                      ? 'bg-[#0F172A] text-white'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. FLEET GRID/LIST SECTION */}
      <section className="py-20 container mx-auto px-6 max-w-7xl">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <div key={car.id} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300">
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#0F172A]/80 backdrop-blur rounded-lg text-xs font-bold text-white">
                    {car.year}
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur rounded-lg text-sm font-bold text-[#0F172A]">
                    {car.category}
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur px-2 py-1 rounded-lg">
                    <svg className="w-4 h-4 text-[#F97316] fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-bold text-[#0F172A]">{car.rating}</span>
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
                  <div className="grid grid-cols-4 gap-3 py-4 border-y border-slate-50 mb-6">
                    <div className="text-center">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Trans</p>
                      <p className="text-xs font-semibold text-slate-700">{car.specs.transmission}</p>
                    </div>
                    <div className="text-center border-x border-slate-100">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Seats</p>
                      <p className="text-xs font-semibold text-slate-700">{car.specs.seats}</p>
                    </div>
                    <div className="text-center border-r border-slate-100">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Fuel</p>
                      <p className="text-xs font-semibold text-slate-700">{car.specs.fuel}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Bags</p>
                      <p className="text-xs font-semibold text-slate-700">{car.specs.luggage}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {car.features.slice(0, 2).map((feature, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-slate-50 text-slate-600 rounded font-medium">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button className="w-full py-3 bg-slate-50 group-hover:bg-[#F97316] text-[#0F172A] group-hover:text-white font-bold rounded-xl transition-all duration-300">
                    Reserve Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredCars.map((car) => (
              <div key={car.id} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col md:flex-row">
                  <div className="relative md:w-96 h-64 overflow-hidden">
                    <img 
                      src={car.image} 
                      alt={car.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-[#0F172A]/80 backdrop-blur rounded-lg text-xs font-bold text-white">
                      {car.year}
                    </div>
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur rounded-lg text-sm font-bold text-[#0F172A]">
                      {car.category}
                    </div>
                  </div>
                  <div className="flex-1 p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-[#0F172A] mb-2">{car.name}</h3>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-[#F97316] fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm font-bold text-[#0F172A]">{car.rating}</span>
                            <span className="text-sm text-slate-400">(150+ reviews)</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-[#F97316]">${car.price}</p>
                        <p className="text-xs text-slate-400 font-medium">per day</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 py-4 mb-6">
                      <div>
                        <p className="text-xs text-slate-400 uppercase font-bold mb-1">Transmission</p>
                        <p className="text-sm font-semibold text-slate-700">{car.specs.transmission}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase font-bold mb-1">Seats</p>
                        <p className="text-sm font-semibold text-slate-700">{car.specs.seats}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase font-bold mb-1">Fuel Type</p>
                        <p className="text-sm font-semibold text-slate-700">{car.specs.fuel}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase font-bold mb-1">Luggage</p>
                        <p className="text-sm font-semibold text-slate-700">{car.specs.luggage} Bags</p>
                      </div>
                    </div>
                    <div className="mb-6">
                      <p className="text-xs text-slate-400 uppercase font-bold mb-3">Key Features</p>
                      <div className="flex flex-wrap gap-2">
                        {car.features.map((feature, i) => (
                          <span key={i} className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-sm font-medium">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button className="flex-1 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-xl transition-all shadow-lg">
                        Reserve Now
                      </button>
                      <button className="px-6 py-3 bg-slate-50 hover:bg-slate-100 text-[#0F172A] font-bold rounded-xl transition-all">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredCars.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🚗</div>
            <h3 className="text-2xl font-bold text-[#0F172A] mb-3">No vehicles found</h3>
            <p className="text-slate-500 mb-6">Try adjusting your filters to see more options</p>
            <button 
              onClick={() => { setActiveCategory('All'); setPriceRange('All'); }}
              className="px-8 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-xl transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* 4. WHY CHOOSE OUR FLEET */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">Premium Fleet Standards</h2>
            <p className="text-slate-500">Every vehicle in our collection meets the highest standards of quality, safety, and performance.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Latest Models", desc: "All 2024 vehicles with cutting-edge technology.", icon: "🚗" },
              { title: "Regular Maintenance", desc: "Professional servicing after every rental period.", icon: "🔧" },
              { title: "Fully Insured", desc: "Comprehensive coverage for complete peace of mind.", icon: "🛡️" },
              { title: "GPS & WiFi", desc: "Stay connected with premium navigation systems.", icon: "📡" }
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

      {/* 5. CALL TO ACTION */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="bg-[#0F172A] rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Can't Find Your Perfect Car?</h2>
              <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">Our concierge team is here to help you find exactly what you're looking for. Get in touch with us today.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-[#F97316] hover:bg-[#EA580C] text-white font-bold px-10 py-4 rounded-xl shadow-lg transition-all transform hover:scale-105">
                  Contact Us
                </button>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold px-10 py-4 rounded-xl transition-all">
                  Request Custom Quote
                </button>
              </div>
            </div>
            <div className="absolute top-0 right-0 opacity-5 w-96 h-96 -mr-32 -mt-32">
              <svg fill="currentColor" className="text-white" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="50"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default OurFleet;
