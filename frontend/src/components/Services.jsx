import React, { useState } from 'react';

/**
 * Vantage Car Hire - Professional Services Component
 * Design System:
 * Primary: Deep Navy Blue (#0F172A)
 * Accent: Vibrant Orange (#F97316)
 */

const Services = () => {
  const [activeService, setActiveService] = useState(0);

  const mainServices = [
    {
      id: 1,
      title: "Self-Drive Rentals",
      icon: "🚗",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800",
      description: "Experience the freedom of the open road with our premium self-drive rental service. Choose from our extensive fleet and create your own adventure.",
      features: [
        "Flexible rental periods (hourly to monthly)",
        "Unlimited mileage options available",
        "GPS navigation included",
        "24/7 roadside assistance",
        "Free vehicle delivery within city limits"
      ],
      pricing: "Starting from $80/day"
    },
    {
      id: 2,
      title: "Chauffeur Services",
      icon: "🎩",
      image: "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?auto=format&fit=crop&q=80&w=800",
      description: "Arrive in style with our professional chauffeur service. Experienced, discreet drivers who know the city inside out.",
      features: [
        "Professional, licensed chauffeurs",
        "Airport meet & greet service",
        "Multi-stop itineraries",
        "Corporate accounts available",
        "Complimentary refreshments"
      ],
      pricing: "Starting from $150/day"
    },
    {
      id: 3,
      title: "Airport Transfers",
      icon: "✈️",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800",
      description: "Seamless airport transfers with flight tracking and guaranteed on-time pickup. Travel stress-free from door to terminal.",
      features: [
        "Real-time flight tracking",
        "Meet & greet at arrivals",
        "Luggage assistance included",
        "All major airports covered",
        "Fixed pricing, no surge charges"
      ],
      pricing: "Starting from $60 per transfer"
    },
    {
      id: 4,
      title: "Corporate Solutions",
      icon: "💼",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
      description: "Tailored mobility solutions for businesses. From executive transportation to fleet management, we've got you covered.",
      features: [
        "Dedicated account management",
        "Volume discounts available",
        "Monthly billing & reporting",
        "Employee booking portal",
        "Priority vehicle allocation"
      ],
      pricing: "Custom pricing available"
    },
    {
      id: 5,
      title: "Event & Wedding Rentals",
      icon: "💒",
      image: "https://images.unsplash.com/photo-1519167758481-83f29da8c2b0?auto=format&fit=crop&q=80&w=800",
      description: "Make your special day unforgettable with our luxury event and wedding car rental service. Elegance meets reliability.",
      features: [
        "Premium wedding car packages",
        "Decorated vehicles available",
        "Professional event coordination",
        "Red carpet service",
        "Photography-friendly timings"
      ],
      pricing: "Starting from $300 per event"
    },
    {
      id: 6,
      title: "Long-Term Leasing",
      icon: "📅",
      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800",
      description: "Flexible long-term rental solutions for extended stays. Enjoy the benefits of ownership without the commitment.",
      features: [
        "Monthly rates with discounts",
        "Vehicle swap options",
        "Maintenance & insurance included",
        "No depreciation worries",
        "Flexible contract terms"
      ],
      pricing: "Starting from $1,200/month"
    }
  ];

  const additionalServices = [
    {
      title: "Delivery & Collection",
      description: "We bring the car to you and pick it up when you're done.",
      icon: "🚚"
    },
    {
      title: "GPS Navigation",
      description: "Latest GPS systems with real-time traffic updates included.",
      icon: "🗺️"
    },
    {
      title: "Child Safety Seats",
      description: "Complimentary child seats for your family's safety.",
      icon: "👶"
    },
    {
      title: "WiFi Hotspot",
      description: "Stay connected on the go with in-car WiFi.",
      icon: "📡"
    },
    {
      title: "Express Check-in",
      description: "Skip the lines with our fast-track booking process.",
      icon: "⚡"
    },
    {
      title: "Fuel Plans",
      description: "Flexible fuel options to suit your needs.",
      icon: "⛽"
    }
  ];

  const serviceProcess = [
    {
      step: "01",
      title: "Select Service",
      description: "Choose from our range of premium services tailored to your needs.",
      icon: "🎯"
    },
    {
      step: "02",
      title: "Customize Details",
      description: "Specify dates, preferences, and any special requirements.",
      icon: "⚙️"
    },
    {
      step: "03",
      title: "Confirm Booking",
      description: "Review your selection and complete secure payment.",
      icon: "✅"
    },
    {
      step: "04",
      title: "Enjoy Experience",
      description: "Sit back and enjoy our premium service excellence.",
      icon: "🌟"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-white selection:bg-[#F97316] selection:text-white">
      
      {/* 1. HERO HEADER SECTION */}
      <section className="relative min-h-[70vh] flex items-center pt-20 overflow-hidden bg-[#0F172A]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1920" 
            alt="Services Background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/90 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-white uppercase bg-[#F97316] rounded-full">
              Premium Services
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Tailored Solutions <br />
              <span className="text-[#F97316]">For Every Journey</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
              From executive chauffeur services to long-term leasing, discover our comprehensive range of mobility solutions designed to exceed your expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-xl transition-all shadow-lg transform hover:-translate-y-1">
                View All Services
              </button>
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl transition-all">
                Request Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN SERVICES GRID */}
      <section className="py-24 container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">Our Core Services</h2>
          <div className="h-1.5 w-20 bg-[#F97316] rounded-full mx-auto mb-6"></div>
          <p className="text-slate-500">Comprehensive mobility solutions tailored to meet diverse transportation needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mainServices.map((service) => (
            <div 
              key={service.id} 
              className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
              onClick={() => setActiveService(service.id)}
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent opacity-60"></div>
                <div className="absolute top-4 right-4 w-14 h-14 bg-[#F97316] rounded-full flex items-center justify-center text-2xl shadow-lg">
                  {service.icon}
                </div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-600 leading-relaxed mb-4">{service.description}</p>
                <div className="space-y-2 mb-6">
                  {service.features.slice(0, 3).map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-[#F97316] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-sm text-slate-600">{feature}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <p className="text-lg font-bold text-[#F97316]">{service.pricing}</p>
                  <button className="px-6 py-2 bg-slate-50 group-hover:bg-[#F97316] text-[#0F172A] group-hover:text-white font-bold rounded-lg transition-all">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ADDITIONAL SERVICES */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">Additional Services</h2>
            <p className="text-slate-500">Enhance your rental experience with our complimentary and premium add-ons</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{service.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0F172A] mb-2">{service.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="py-24 container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">How Our Services Work</h2>
          <div className="h-1.5 w-20 bg-[#F97316] rounded-full mx-auto mb-6"></div>
          <p className="text-slate-500 max-w-2xl mx-auto">A seamless process from booking to delivery</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {serviceProcess.map((item, i) => (
            <div key={i} className="text-center relative">
              <div className="mb-6">
                <div className="w-20 h-20 bg-[#0F172A] text-white text-3xl font-bold rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  {item.icon}
                </div>
                <div className="inline-block px-4 py-1 bg-[#F97316] text-white text-sm font-bold rounded-full">
                  {item.step}
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-3">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
              {i < 3 && <div className="hidden lg:block absolute top-10 left-[60%] w-full h-[2px] bg-slate-200"></div>}
            </div>
          ))}
        </div>
      </section>

      {/* 5. SERVICE PACKAGES */}
      <section className="py-24 bg-[#0F172A]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Service Packages</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">Choose the perfect package that suits your needs and budget</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Essential",
                price: "$199",
                period: "/day",
                features: [
                  "Premium vehicle selection",
                  "Standard insurance coverage",
                  "24/7 customer support",
                  "GPS navigation included",
                  "100 miles per day"
                ],
                popular: false
              },
              {
                name: "Premium",
                price: "$349",
                period: "/day",
                features: [
                  "Luxury vehicle selection",
                  "Comprehensive insurance",
                  "Priority support & assistance",
                  "WiFi hotspot included",
                  "Unlimited mileage",
                  "Free delivery & collection"
                ],
                popular: true
              },
              {
                name: "Executive",
                price: "$599",
                period: "/day",
                features: [
                  "Exotic & luxury fleet access",
                  "Chauffeur service included",
                  "VIP concierge support",
                  "All premium amenities",
                  "Unlimited everything",
                  "Airport lounge access"
                ],
                popular: false
              }
            ].map((pkg, i) => (
              <div 
                key={i} 
                className={`relative bg-white/5 backdrop-blur-sm border rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 ${
                  pkg.popular ? 'border-[#F97316] transform scale-105' : 'border-white/10'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-1.5 bg-[#F97316] text-white text-xs font-bold rounded-full uppercase">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">{pkg.name}</h3>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold text-[#F97316]">{pkg.price}</span>
                    <span className="text-slate-400">{pkg.period}</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#F97316] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 font-bold rounded-xl transition-all ${
                  pkg.popular 
                    ? 'bg-[#F97316] hover:bg-[#EA580C] text-white shadow-lg' 
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}>
                  Select Package
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY OUR SERVICES */}
      <section className="py-24 container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">Why Choose Our Services</h2>
          <p className="text-slate-500">Experience the Vantage difference across all our service offerings</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Certified Professionals", desc: "All chauffeurs and staff undergo rigorous training.", icon: "🎓" },
            { title: "Transparent Pricing", desc: "No hidden fees, just honest upfront pricing.", icon: "💰" },
            { title: "Quality Assurance", desc: "Every vehicle inspected before each rental.", icon: "✅" },
            { title: "Customer Satisfaction", desc: "98% satisfaction rate from our clients.", icon: "⭐" }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-5xl mb-6">{feature.icon}</div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-3">{feature.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CALL TO ACTION */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="bg-[#F97316] rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Need a Custom Solution?</h2>
              <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
                Our team is ready to create a tailored service package that perfectly matches your unique requirements. Let's discuss your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-[#0F172A] hover:bg-slate-800 text-white font-bold px-10 py-4 rounded-xl shadow-lg transition-all transform hover:scale-105">
                  Contact Our Team
                </button>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-white text-white font-bold px-10 py-4 rounded-xl transition-all">
                  Request Callback
                </button>
              </div>
            </div>
            <svg className="absolute top-0 right-0 opacity-10 w-96 h-96 -mr-32 -mt-32 text-white" fill="currentColor" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="50"/>
            </svg>
            <svg className="absolute bottom-0 left-0 opacity-10 w-64 h-64 -ml-20 -mb-20 text-white" fill="currentColor" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="50"/>
            </svg>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;
