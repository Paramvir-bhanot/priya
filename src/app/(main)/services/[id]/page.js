'use client';

import { useState, useEffect } from 'react';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function ServicePage() {
  const params = useParams();
  const pathname = usePathname();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allServices, setAllServices] = useState([]);
  const [serviceId, setServiceId] = useState(null);

  // Extract service ID from params or pathname
  useEffect(() => {
    let id = null;
    
    console.log('🔍 Service ID extraction - Params:', params, 'Pathname:', pathname);
    
    // Try pathname first since it's always available
    if (pathname) {
      const pathParts = pathname.split('/').filter(Boolean);
      console.log('📂 Path parts:', pathParts);
      const servicesIndex = pathParts.indexOf('services');
      if (servicesIndex !== -1 && pathParts[servicesIndex + 1]) {
        id = pathParts[servicesIndex + 1];
        console.log('✅ Extracted from pathname:', id);
      }
    }
    
    // Fallback to params if pathname didn't work
    if (!id && params) {
      // Check if params has id property
      if ('id' in params && params.id) {
        id = params.id;
        // Handle array case
        if (Array.isArray(id)) {
          id = id[0];
        }
        console.log('✅ Extracted from params:', id);
      }
    }
    
    if (id) {
      // Decode URL encoding (e.g., %20 to space, but keep it as is for IDs)
      let trimmedId = String(id).trim();
      try {
        trimmedId = decodeURIComponent(trimmedId);
      } catch (e) {
        // If decodeURIComponent fails, just use the trimmed version
        console.warn('Could not decode service ID:', e);
      }
      console.log('🎯 Final service ID:', trimmedId);
      setServiceId(trimmedId);
    } else {
      console.error('❌ Could not extract service ID. Params:', JSON.stringify(params), 'Pathname:', pathname);
      // If we can't extract the ID, set loading to false so error state can show
      setLoading(false);
    }
  }, [params, pathname]);

  useEffect(() => {
    const loadServiceData = async () => {
      if (!serviceId) {
        // Keep loading state if we don't have serviceId yet
        // Only set loading to false if we've checked and confirmed no ID is available
        return;
      }

      setLoading(true);
      try {
        // Load all services from public directory
        const response = await fetch('/data/services.json', { 
          cache: 'no-store'
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch services: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.services || !Array.isArray(data.services)) {
          throw new Error('Invalid services data format');
        }
        
        console.log('Loaded services:', data.services.length);
        console.log('Looking for service ID:', serviceId);
        console.log('Available service IDs:', data.services.map(s => s.id));
        
        setAllServices(data.services);
        
        // Find current service - try exact match first, then case-insensitive
        let currentService = data.services.find(s => {
          const serviceIdStr = String(s.id).trim();
          const searchIdStr = String(serviceId).trim();
          return serviceIdStr === searchIdStr;
        });
        
        if (!currentService) {
          // Try case-insensitive match
          console.log('Trying case-insensitive match...');
          currentService = data.services.find(s => {
            const serviceIdStr = String(s.id).trim().toLowerCase();
            const searchIdStr = String(serviceId).trim().toLowerCase();
            return serviceIdStr === searchIdStr;
          });
        }
        
        if (!currentService) {
          console.error(`❌ Service not found with ID: "${serviceId}"`);
          console.error('Available service IDs:', data.services.map(s => s.id));
          console.error('Searching for (trimmed):', String(serviceId).trim());
          console.error('Searching for (lowercase):', String(serviceId).trim().toLowerCase());
          setService(null);
        } else {
          console.log('✅ Found service:', currentService.name, 'with ID:', currentService.id);
          if (currentService.image && typeof window !== 'undefined') {
            // Preload image to ensure it loads - use native browser Image constructor
            const img = new window.Image();
            img.src = currentService.image;
            img.onerror = () => console.warn(`Failed to preload image: ${currentService.image}`);
          }
          setService(currentService);
        }
      } catch (error) {
        console.error('Error loading service data:', error);
        setService(null);
      } finally {
        setLoading(false);
      }
    };

    loadServiceData();
  }, [serviceId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F4F7F8] to-[#7FC8A9]/10">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#2C7A7B] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg text-[#1F2937] font-medium">Loading Service Details...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F4F7F8] to-[#7FC8A9]/10">
        <div className="text-center max-w-md mx-4">
          <div className="w-24 h-24 bg-[#2C7A7B]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-[#2C7A7B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#1F2937] mb-4">Service Not Found</h1>
          <p className="text-[#6B7280] mb-6">The service you're looking for doesn't exist or has been moved.</p>
          <Link 
            href="/services" 
            className="inline-flex items-center bg-gradient-to-r from-[#2C7A7B] to-[#3BB273] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            View All Services
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F7F8] to-[#7FC8A9]/10 mt-20">
      {/* Service Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-[#7FC8A9]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center space-x-2 text-sm text-[#6B7280] mb-6">
            <Link 
              href="/" 
              className="hover:text-[#2C7A7B] transition-all duration-300 hover:translate-x-0.5"
            >
              Home
            </Link>
            <span>/</span>
            <Link 
              href="/services" 
              className="hover:text-[#2C7A7B] transition-all duration-300 hover:translate-x-0.5"
            >
              Services
            </Link>
            <span>/</span>
            <span className="text-[#1F2937] font-medium">{service.name}</span>
          </nav>
          
          <div className="animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2e817a] leading-tight mb-4">
              {service.name}
            </h1>
            <p className="text-lg text-[#6B7280] leading-relaxed max-w-3xl">
              {service.description}
            </p>
          </div>
        </div>
      </div>

      {/* Service Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Service Image */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group border border-[#7FC8A9]/20">
              {service.image ? (
                <div className="w-full h-48 sm:h-64 lg:h-80 relative overflow-hidden bg-gradient-to-br from-[#2C7A7B] to-[#3BB273]">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                    onError={(e) => {
                      console.error(`Failed to load image: ${service.image}`);
                      e.target.style.display = 'none';
                    }}
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500"></div>
                  {/* Animated Laser Line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8A6BF4] to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              ) : (
                <div className="w-full h-48 sm:h-64 lg:h-80 bg-gradient-to-br from-[#2C7A7B] to-[#3BB273] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500"></div>
                  <div className="relative z-10 text-white text-center px-4">
                    <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                      <span className="text-3xl">⚡</span>
                    </div>
                    <h2 className="text-2xl font-bold">{service.name}</h2>
                  </div>
                  {/* Animated Laser Line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8A6BF4] to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              )}
            </div>

            {/* About Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 p-6 lg:p-8 border border-[#7FC8A9]/20 animate-fade-in-up" style={{animationDelay: '100ms'}}>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#1F2937] mb-6 flex items-center">
                <div className="w-2 h-8 bg-gradient-to-b from-[#2C7A7B] to-[#3BB273] rounded-full mr-4"></div>
                About {service.name}
              </h2>
              <div className="prose max-w-none">
                <p className="text-[#6B7280] text-lg leading-relaxed">
                  {service.fullDescription}
                </p>
              </div>
            </div>

            {/* Benefits Section */}
            {service.benefits && service.benefits.length > 0 && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 p-6 lg:p-8 border border-[#7FC8A9]/20 animate-fade-in-up" style={{animationDelay: '200ms'}}>
                <h3 className="text-2xl lg:text-3xl font-bold text-[#1F2937] mb-6 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-[#2C7A7B] to-[#3BB273] rounded-full mr-4"></div>
                  Treatment Benefits
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.benefits.map((benefit, index) => (
                    <div 
                      key={index} 
                      className="flex items-start p-4 rounded-xl bg-gradient-to-r from-[#F4F7F8] to-white hover:from-[#7FC8A9]/10 hover:to-white transition-all duration-300 group"
                    >
                      <div className="w-6 h-6 bg-[#3BB273] rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-[#1F2937] font-medium group-hover:text-[#2C7A7B] transition-colors duration-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Treatment Process */}
            {service.process && service.process.length > 0 && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 p-6 lg:p-8 border border-[#7FC8A9]/20 animate-fade-in-up" style={{animationDelay: '300ms'}}>
                <h3 className="text-2xl lg:text-3xl font-bold text-[#1F2937] mb-6 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-[#2C7A7B] to-[#3BB273] rounded-full mr-4"></div>
                  Treatment Process
                </h3>
                <div className="space-y-4">
                  {service.process.map((step, index) => (
                    <div 
                      key={index} 
                      className="flex items-start p-4 rounded-xl bg-gradient-to-r from-[#F4F7F8] to-white hover:from-[#7FC8A9]/10 hover:to-white transition-all duration-300 group"
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#2C7A7B] to-[#3BB273] rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      <p className="text-[#1F2937] pt-1.5 group-hover:text-[#2C7A7B] transition-colors duration-300">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:space-y-8">
            {/* Service Details Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 p-6 border border-[#7FC8A9]/20 animate-fade-in-up" style={{animationDelay: '400ms'}}>
              <h3 className="text-xl font-bold text-[#1F2937] mb-6 flex items-center">
                <div className="w-2 h-6 bg-gradient-to-b from-[#2C7A7B] to-[#3BB273] rounded-full mr-3"></div>
                Service Details
              </h3>
              <div className="space-y-4">
                {service.duration && (
                  <div className="flex justify-between items-center p-3 rounded-lg bg-[#F4F7F8] hover:bg-[#7FC8A9]/10 transition-colors duration-300">
                    <span className="text-[#6B7280] font-medium">Duration:</span>
                    <span className="font-bold text-[#2C7A7B]">{service.duration}</span>
                  </div>
                )}
                {service.sessions && (
                  <div className="flex justify-between items-center p-3 rounded-lg bg-[#F4F7F8] hover:bg-[#7FC8A9]/10 transition-colors duration-300">
                    <span className="text-[#6B7280] font-medium">Sessions:</span>
                    <span className="font-bold text-[#2C7A7B]">{service.sessions}</span>
                  </div>
                )}
                {service.practitioner && (
                  <div className="flex justify-between items-center p-3 rounded-lg bg-[#F4F7F8] hover:bg-[#7FC8A9]/10 transition-colors duration-300">
                    <span className="text-[#6B7280] font-medium">Practitioner:</span>
                    <span className="font-bold text-[#2C7A7B] text-right">{service.practitioner}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Other Services */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 p-6 border border-[#7FC8A9]/20 animate-fade-in-up" style={{animationDelay: '500ms'}}>
              <h3 className="text-xl font-bold text-[#1F2937] mb-6 flex items-center">
                <div className="w-2 h-6 bg-gradient-to-b from-[#2C7A7B] to-[#3BB273] rounded-full mr-3"></div>
                Other Services
              </h3>
              <div className="space-y-3">
                {allServices
                  .filter(s => s.id !== service.id)
                  .slice(0, 4) // Limit to 4 services on mobile
                  .map((otherService, index) => (
                    <Link
                      key={otherService.id}
                      href={`/services/${otherService.id}`}
                      className="block p-4 rounded-xl border border-[#7FC8A9]/30 hover:border-[#8A6BF4]/50 hover:bg-gradient-to-r from-[#7FC8A9]/5 to-white transition-all duration-300 group transform hover:scale-[1.02]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#1F2937] group-hover:text-[#2C7A7B] transition-colors duration-300">
                          {otherService.name}
                        </span>
                        <svg className="w-4 h-4 text-[#6B7280] group-hover:text-[#8A6BF4] transform group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      <p className="text-sm text-[#6B7280] mt-2 line-clamp-2 group-hover:text-[#6B7280]/80">
                        {otherService.description}
                      </p>
                    </Link>
                  ))
                }
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-[#2C7A7B] to-[#3BB273] rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6 lg:p-8 text-white animate-fade-in-up" style={{animationDelay: '600ms'}}>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Ready to Get Started?
                </h3>
                <p className="text-white/90 text-sm mb-6">
                  Book your {service.name} session today
                </p>
                
                <Link
                  href="/appointments"
                  className="inline-flex items-center justify-center bg-white text-[#2C7A7B] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book Appointment
                </Link>
              </div>
  
              <div className="flex items-center justify-center mt-4 text-white/80">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+919417403743" className="text-sm hover:underline">Or call: +91 94174-03743</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Styles for Animations */}
      <style jsx global>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Smooth scrolling for the whole app */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}