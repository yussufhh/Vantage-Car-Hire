import React, { useState } from 'react';

/**
 * Vantage Car Hire - Professional Contact Component
 * Design System:
 * Primary: Deep Navy Blue (#0F172A)
 * Accent: Vibrant Orange (#F97316)
 */

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const contactMethods = [
    {
      icon: "📞",
      title: "Call Us",
      primary: "+254 (20) 123-4567",
      secondary: "Mon-Sun: 24/7 Available",
      action: "tel:+25420123456"
    },
    {
      icon: "✉️",
      title: "Email Us",
      primary: "hello@vantagecarhire.com",
      secondary: "We'll respond within 24 hours",
      action: "mailto:hello@vantagecarhire.com"
    },
    {
      icon: "📍",
      title: "Visit Us",
      primary: "Garissa Town, Township Road",
      secondary: "Garissa, Kenya",
      action: "#location"
    },
    {
      icon: "💬",
      title: "Live Chat",
      primary: "Chat with our team",
      secondary: "Average response: 2 minutes",
      action: "#chat"
    }
  ];

  const locations = [
    {
      city: "Garissa Central",
      address: "Township Road, Garissa Town",
      phone: "+254 (20) 123-4567",
      hours: "24/7 Open"
    },
    {
      city: "Garissa Airport",
      address: "Garissa Airport Road",
      phone: "+254 (20) 234-5678",
      hours: "24/7 Open"
    },
    {
      city: "Garissa East",
      address: "Bulla Pesa Road, Garissa",
      phone: "+254 (20) 345-6789",
      hours: "24/7 Open"
    }
  ];

  const faqs = [
    {
      question: "What documents do I need to rent a car?",
      answer: "You'll need a valid driver's license, a credit card in your name, and proof of insurance. International customers should bring their passport and international driving permit."
    },
    {
      question: "Can I modify or cancel my reservation?",
      answer: "Yes, you can modify or cancel your reservation up to 24 hours before pickup for a full refund. Changes can be made through our website or by calling customer service."
    },
    {
      question: "Do you offer airport pickup and delivery?",
      answer: "Absolutely! We provide complimentary airport pickup and delivery services at all major airports. Just provide your flight details when booking."
    },
    {
      question: "What is your fuel policy?",
      answer: "We offer flexible fuel options: full-to-full (most economical), pre-purchase fuel, or fuel service charge. You choose what works best for your trip."
    },
    {
      question: "Are there age restrictions?",
      answer: "Drivers must be at least 25 years old for most vehicles. For luxury and exotic cars, the minimum age is 30. Young driver surcharges may apply for ages 25-30."
    },
    {
      question: "Is insurance included in the rental price?",
      answer: "Basic insurance is included. We also offer comprehensive coverage packages for additional protection and peace of mind during your rental period."
    }
  ];

  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <div className="w-full min-h-screen bg-white selection:bg-[#F97316] selection:text-white">
      
      {/* 1. HERO HEADER SECTION */}
      <section className="relative min-h-[60vh] flex items-center pt-20 overflow-hidden bg-[#0F172A]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920" 
            alt="Contact Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/95 to-[#0F172A]/80"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-white uppercase bg-[#F97316] rounded-full">
              Get In Touch
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              We're Here <br />
              <span className="text-[#F97316]">To Help You</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
              Have questions about our services? Need assistance with a booking? Our dedicated team is available 24/7 to ensure you get the support you need.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CONTACT METHODS */}
      <section className="relative z-20 mt-16 container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method, i) => (
            <a
              key={i}
              href={method.action}
              className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-[#F97316]/20 transform hover:-translate-y-1"
            >
              <div className="text-5xl mb-4">{method.icon}</div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2">{method.title}</h3>
              <p className="text-[#F97316] font-semibold mb-1">{method.primary}</p>
              <p className="text-sm text-slate-500">{method.secondary}</p>
            </a>
          ))}
        </div>
      </section>

      {/* 3. CONTACT FORM & INFO SECTION */}
      <section className="py-24 container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">Send Us a Message</h2>
            <div className="h-1.5 w-20 bg-[#F97316] rounded-full mb-8"></div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Email Address *</label>
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
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Subject *</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#F97316] outline-none"
                >
                  <option>General Inquiry</option>
                  <option>Booking Assistance</option>
                  <option>Technical Support</option>
                  <option>Corporate Accounts</option>
                  <option>Feedback</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell us how we can help you..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white font-bold py-4 rounded-xl transition-all shadow-lg transform hover:-translate-y-0.5"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">Get in Touch</h2>
            <div className="h-1.5 w-20 bg-[#F97316] rounded-full mb-8"></div>
            <p className="text-slate-600 leading-relaxed mb-8 text-lg">
              Whether you're planning your next adventure or have questions about our services, we're here to help. Reach out to us through any of the channels below.
            </p>

            {/* Business Hours */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-bold text-[#0F172A] mb-4 flex items-center gap-3">
                <span className="text-2xl">🕐</span>
                Business Hours
              </h3>
              <div className="space-y-3">
                {[
                  { day: "Monday - Friday", hours: "24/7 Available" },
                  { day: "Saturday - Sunday", hours: "24/7 Available" },
                  { day: "Holidays", hours: "24/7 Available" }
                ].map((schedule, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-slate-200 last:border-0">
                    <span className="font-semibold text-slate-700">{schedule.day}</span>
                    <span className="text-[#F97316] font-bold">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-[#0F172A] rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <span className="text-2xl">🚨</span>
                Emergency Support
              </h3>
              <p className="text-slate-300 mb-4">
                For urgent roadside assistance or emergency support during your rental period:
              </p>
              <a href="tel:+254720999999" className="inline-block bg-[#F97316] hover:bg-[#EA580C] text-white font-bold px-8 py-3 rounded-lg transition-all">
                Call Emergency: +254 720 999-999
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LOCATIONS SECTION */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">Our Locations</h2>
            <p className="text-slate-500">Visit us at any of our premium locations nationwide</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {locations.map((location, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">📍</div>
                <h3 className="text-2xl font-bold text-[#0F172A] mb-4">{location.city}</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#F97316] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-slate-600">{location.address}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#F97316] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <p className="text-slate-600">{location.phone}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#F97316] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-[#F97316] font-bold">{location.hours}</p>
                  </div>
                </div>
                <button className="w-full mt-6 bg-slate-50 hover:bg-[#F97316] text-[#0F172A] hover:text-white font-bold py-3 rounded-lg transition-all">
                  Get Directions
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MAP SECTION */}
      <section className="py-24 container mx-auto px-6 max-w-7xl">
        <div className="bg-slate-100 rounded-2xl overflow-hidden shadow-xl h-96 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🗺️</div>
            <p className="text-xl font-bold text-[#0F172A] mb-2">Interactive Map</p>
            <p className="text-slate-500">Map integration would be displayed here</p>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6">Frequently Asked Questions</h2>
            <p className="text-slate-500">Quick answers to common questions about our services</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100">
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-8 py-6 flex items-center justify-between hover:bg-slate-50 transition-all"
                >
                  <h3 className="text-lg font-bold text-[#0F172A] text-left">{faq.question}</h3>
                  <svg
                    className={`w-6 h-6 text-[#F97316] flex-shrink-0 transition-transform ${
                      activeFaq === i ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    activeFaq === i ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-8 pb-6">
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SOCIAL MEDIA & NEWSLETTER */}
      <section className="py-24 container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Social Media */}
          <div className="bg-[#0F172A] rounded-2xl p-10 text-white">
            <h3 className="text-3xl font-bold mb-4">Follow Our Journey</h3>
            <p className="text-slate-300 mb-8">
              Stay updated with the latest news, exclusive offers, and behind-the-scenes content from Vantage Car Hire.
            </p>
            <div className="flex gap-4">
              {[
                { name: 'Facebook', icon: '📘' },
                { name: 'Instagram', icon: '📷' },
                { name: 'Twitter', icon: '🐦' },
                { name: 'LinkedIn', icon: '💼' }
              ].map((social, i) => (
                <button
                  key={i}
                  className="w-14 h-14 bg-white/10 hover:bg-[#F97316] rounded-lg flex items-center justify-center text-2xl transition-all transform hover:scale-110"
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="bg-slate-50 rounded-2xl p-10">
            <h3 className="text-3xl font-bold text-[#0F172A] mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-slate-600 mb-8">
              Get exclusive deals, travel tips, and news delivered straight to your inbox.
            </p>
            <form className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#F97316] outline-none"
              />
              <button className="px-8 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-lg transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="bg-[#F97316] rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Still Have Questions?</h2>
              <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
                Our customer support team is standing by 24/7 to help you with any questions or concerns. Don't hesitate to reach out!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+25420123456" className="bg-[#0F172A] hover:bg-slate-800 text-white font-bold px-10 py-4 rounded-xl shadow-lg transition-all transform hover:scale-105">
                  Call Us Now
                </a>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-white text-white font-bold px-10 py-4 rounded-xl transition-all">
                  Start Live Chat
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

export default Contact;
