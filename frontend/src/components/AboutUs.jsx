import React from 'react';

/**
 * Vantage Car Hire - Professional About Us Component
 * Design System:
 * Primary: Deep Navy Blue (#0F172A)
 * Accent: Vibrant Orange (#F97316)
 */

const AboutUs = () => {
  const coreValues = [
    {
      icon: "🎯",
      title: "Customer First",
      description: "Every decision we make is centered around delivering exceptional experiences to our clients."
    },
    {
      icon: "⚡",
      title: "Innovation",
      description: "We continuously evolve our services to meet the changing needs of modern travelers."
    },
    {
      icon: "🛡️",
      title: "Integrity",
      description: "Transparency and honesty guide every interaction and transaction we have."
    },
    {
      icon: "🌟",
      title: "Excellence",
      description: "We maintain the highest standards in our fleet, service, and customer care."
    }
  ];

  const milestones = [
    { year: "2015", event: "Vantage Car Hire Founded", desc: "Started with a vision to revolutionize car rentals" },
    { year: "2018", event: "Fleet Expansion", desc: "Grew to over 100 premium vehicles" },
    { year: "2021", event: "Digital Transformation", desc: "Launched seamless online booking platform" },
    { year: "2024", event: "Industry Leader", desc: "Recognized as premier luxury car rental service" }
  ];

  const team = [
    {
      name: "Michael Anderson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      bio: "20+ years in automotive and hospitality industries"
    },
    {
      name: "Sarah Mitchell",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
      bio: "Expert in fleet management and customer service"
    },
    {
      name: "David Chen",
      role: "Technology Director",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
      bio: "Driving innovation in digital booking solutions"
    },
    {
      name: "Emily Rodriguez",
      role: "Customer Experience Lead",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400",
      bio: "Passionate about creating memorable journeys"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-white selection:bg-[#F97316] selection:text-white">
      
      {/* 1. HERO HEADER SECTION */}
      <section className="relative min-h-[70vh] flex items-center pt-20 overflow-hidden bg-[#0F172A]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1920" 
            alt="About Us Background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/90 via-[#0F172A]/70 to-[#0F172A]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-white uppercase bg-[#F97316] rounded-full">
              Our Story
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Redefining Luxury <br />
              <span className="text-[#F97316]">Car Rentals</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-3xl mx-auto">
              For over a decade, Vantage Car Hire has been the trusted choice for discerning travelers seeking premium vehicles and exceptional service. Our commitment to excellence drives everything we do.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MISSION & VISION SECTION */}
      <section className="py-24 container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=800" 
                alt="Luxury Car" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/50 to-transparent"></div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">Our Mission</h2>
            <div className="h-1.5 w-20 bg-[#F97316] rounded-full mb-8"></div>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
              At Vantage Car Hire, we believe that every journey should be extraordinary. Our mission is to provide an unparalleled car rental experience that combines luxury, convenience, and reliability.
            </p>
            <p className="text-slate-600 leading-relaxed mb-8 text-lg">
              We meticulously curate our fleet to include only the finest vehicles, ensuring that whether you're traveling for business or pleasure, you'll always arrive in style and comfort.
            </p>
            <div className="space-y-4">
              {[
                "Premium fleet of latest model luxury vehicles",
                "24/7 dedicated customer support team",
                "Transparent pricing with no hidden fees",
                "Comprehensive insurance coverage included"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#F97316] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-slate-700 font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. STATISTICS SECTION */}
      <section className="py-24 bg-[#0F172A]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Achievements</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">Numbers that showcase our commitment to excellence and customer satisfaction</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "10,000+", label: "Happy Customers", icon: "😊" },
              { number: "50+", label: "Premium Vehicles", icon: "🚗" },
              { number: "15+", label: "Luxury Brands", icon: "⭐" },
              { number: "98%", label: "Satisfaction Rate", icon: "❤️" }
            ].map((stat, i) => (
              <div key={i} className="text-center bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300">
                <div className="text-5xl mb-4">{stat.icon}</div>
                <p className="text-4xl font-bold text-[#F97316] mb-2">{stat.number}</p>
                <p className="text-slate-300 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CORE VALUES SECTION */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">Our Core Values</h2>
            <p className="text-slate-500">The principles that guide our business and shape every customer interaction</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-5xl mb-6">{value.icon}</div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">{value.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TIMELINE SECTION */}
      <section className="py-24 container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">Our Journey</h2>
          <div className="h-1.5 w-20 bg-[#F97316] rounded-full mx-auto mb-6"></div>
          <p className="text-slate-500 max-w-2xl mx-auto">A decade of innovation, growth, and unwavering commitment to excellence</p>
        </div>
        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-slate-200"></div>
          <div className="space-y-12">
            {milestones.map((milestone, i) => (
              <div key={i} className={`flex flex-col lg:flex-row gap-8 items-center ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                <div className="flex-1 lg:text-right">
                  {i % 2 === 0 && (
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all">
                      <h3 className="text-2xl font-bold text-[#F97316] mb-2">{milestone.event}</h3>
                      <p className="text-slate-600">{milestone.desc}</p>
                    </div>
                  )}
                </div>
                <div className="relative z-10 flex items-center justify-center">
                  <div className="w-16 h-16 bg-[#F97316] text-white font-bold rounded-full flex items-center justify-center shadow-lg text-sm">
                    {milestone.year}
                  </div>
                </div>
                <div className="flex-1">
                  {i % 2 !== 0 && (
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all">
                      <h3 className="text-2xl font-bold text-[#F97316] mb-2">{milestone.event}</h3>
                      <p className="text-slate-600">{milestone.desc}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. LEADERSHIP TEAM SECTION */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">Meet Our Team</h2>
            <p className="text-slate-500">The passionate professionals driving Vantage Car Hire forward</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-[#F97316] font-semibold text-sm">{member.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-slate-600 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE US SECTION */}
      <section className="py-24 container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">Why Choose Vantage?</h2>
          <p className="text-slate-500">We go beyond car rentals to deliver unforgettable experiences</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Premium Quality",
              desc: "Every vehicle in our fleet is meticulously maintained to showroom condition.",
              icon: "⭐"
            },
            {
              title: "Flexible Rentals",
              desc: "From hourly to monthly rentals, we adapt to your schedule and needs.",
              icon: "⏰"
            },
            {
              title: "Instant Booking",
              desc: "Reserve your dream car in seconds with our streamlined online platform.",
              icon: "⚡"
            },
            {
              title: "Airport Service",
              desc: "Convenient pickup and drop-off at major airports nationwide.",
              icon: "✈️"
            },
            {
              title: "VIP Treatment",
              desc: "Complimentary upgrades and exclusive perks for loyal customers.",
              icon: "👑"
            },
            {
              title: "Safety First",
              desc: "Comprehensive insurance and 24/7 roadside assistance included.",
              icon: "🛡️"
            }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-[#F97316]/20">
              <div className="text-5xl mb-6">{feature.icon}</div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-3">{feature.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CALL TO ACTION SECTION */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="bg-[#F97316] rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Experience the Vantage Difference?</h2>
              <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust us for their premium car rental needs. Your extraordinary journey begins here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-[#0F172A] hover:bg-slate-800 text-white font-bold px-10 py-4 rounded-xl shadow-lg transition-all transform hover:scale-105">
                  Explore Our Fleet
                </button>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-white text-white font-bold px-10 py-4 rounded-xl transition-all">
                  Contact Us Today
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

export default AboutUs;
