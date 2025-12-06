'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const response = await fetch('/data/services.json');
        const data = await response.json();
        setServices(data.services);
      } catch (error) {
        console.error('Error loading services:', error);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex pt-20 items-center justify-center bg-gradient-to-br from-[#F4F7F8] to-[#7FC8A9]/10">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#2C7A7B] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg text-[#1F2937] font-medium">Loading Services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F7F8] to-[#7FC8A9]/10 mt-20">
      {/* Page Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-[#7FC8A9]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center space-x-2 text-sm text-[#6B7280] mb-4">
            <Link 
              href="/" 
              className="hover:text-[#2C7A7B] transition-colors duration-300 hover:translate-x-1 transform"
            >
              Home
            </Link>
            <span>/</span>
            <span className="text-[#1F2937] font-medium">Services</span>
          </nav>
          
          <div className="animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2e817a] leading-tight">
              Our Services
            </h1>
            <p className="text-lg text-[#6B7280] mt-3 max-w-2xl leading-relaxed">
              Discover our comprehensive range of healing therapies combining traditional wisdom 
              with advanced laser technology
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {services.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-[#2C7A7B]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-[#2C7A7B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#1F2937] mb-4">No Services Available</h2>
            <p className="text-[#6B7280] mb-6">We're currently updating our services. Please check back soon.</p>
            <Link 
              href="/contact" 
              className="inline-flex items-center bg-gradient-to-r from-[#2C7A7B] to-[#3BB273] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
            <div
              key={service.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link
                href={`/services/${service.id}`}
                className="block bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group hover:scale-[1.02] border border-[#7FC8A9]/20 hover:border-[#8A6BF4]/30"
              >
                {/* Service Image/Icon Area */}
                <div className="relative w-full h-48 bg-gradient-to-br from-[#2C7A7B] to-[#3BB273] flex items-center justify-center group-hover:from-[#8A6BF4] group-hover:to-[#2C7A7B] transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500"></div>
                  <div className="relative z-10 text-white text-center px-4 transform group-hover:scale-110 transition-transform duration-500">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-white/30 transition-colors duration-300">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <h3 className="text-xl font-semibold">{service.name}</h3>
                  </div>
                  
                  {/* Animated Laser Effect */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8A6BF4] to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
                
                {/* Content Area */}
                <div className="p-6 sm:p-8">
                  <h2 className="text-xl font-semibold text-[#1F2937] mb-3 group-hover:text-[#2C7A7B] transition-colors duration-300 line-clamp-2">
                    {service.name}
                  </h2>
                  <p className="text-[#6B7280] mb-6 leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                  
                  {/* CTA Button */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-[#2C7A7B] font-semibold group-hover:text-[#8A6BF4] transition-colors duration-300">
                      Learn More
                      <svg 
                        className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    
                    {/* Duration/Tag */}
                    {service.duration && (
                      <span className="px-3 py-1 bg-[#7FC8A9]/20 text-[#2C7A7B] text-sm rounded-full font-medium">
                        {service.duration}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
          </div>
        )}

        {/* Call to Action Section */}
        <div className="mt-16 text-center animate-fade-in-up">
          <div className="bg-gradient-to-r from-[#2C7A7B] to-[#3BB273] rounded-2xl p-8 sm:p-12 text-white shadow-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Begin Your Healing Journey?
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto text-lg">
              Book your consultation today and experience the perfect blend of traditional healing and modern technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/appointments"
                className="bg-white text-[#2C7A7B] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Book Appointment
              </Link>
              <Link
                href="/about"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                Learn About Us
              </Link>
            </div>
          </div>  
        </div>
      </div>
    </div>
  );
}