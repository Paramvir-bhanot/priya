// app/page.js
'use client';

import { useState, useEffect } from 'react';
import { Instagram, Sparkles, Star, ChevronRight, ArrowRight, Palette, Brush, Shield } from 'lucide-react';
import Image from 'next/image';
import Review from'@/app/components/UI/home/review';
export default function HomePage() {
  const [activeService, setActiveService] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const services = [
    {
      name: "Press-on Nails",
      description: "Custom-designed press-on nail sets with premium finish.",
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      name: "Gel Extensions",
      description: "Long-lasting gel nail extensions with a smooth finish.",
      icon: <Brush className="w-6 h-6" />
    },
    {
      name: "Acrylic Nails",
      description: "Durable acrylic nail application in multiple designs.",
      icon: <Palette className="w-6 h-6" />
    },
    {
      name: "Gel-X Nails",
      description: "Lightweight and flexible nail extension system using Gel-X tips.",
      icon: <Shield className="w-6 h-6" />
    }
  ];

  const portfolioImages = [
    { id: 1, category: "Nail Art" },
    { id: 2, category: "Press-on Sets" },
    { id: 3, category: "Gel Extensions" },
    { id: 4, category: "Acrylic Nails" },
    { id: 5, category: "Gel-X Nails" },
    { id: 6, category: "Nail Art" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#FBEFF2] to-white">
      
      {isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : ''}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#0F4C45] to-[#1A5C52]"></div>
              <h1 className="text-2xl font-bold text-[#0A1F1D]">nailsworld2025</h1>
            </div>
            <a 
              href="https://instagram.com/nailsworld2025"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] text-white px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Instagram className="w-4 h-4" />
              <span className="font-medium">Book Now</span>
            </a>
          </div>
        </div>
      

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#F7DDE2] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-[#FBEFF2] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full">
                <Star className="w-4 h-4 text-[#1A5C52]" fill="#1A5C52" />
                <span className="text-sm font-medium text-[#0F4C45]">Premium Nail Artistry</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-[#0A1F1D] leading-tight">
                Where Every Nail
                <span className="text-[#1A5C52]"> Tells A Story</span>
              </h1>
              
              <p className="text-xl text-gray-600">
                Professional nail artistry by Priya. Bringing elegance and creativity to your fingertips in Punjab, India.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="https://instagram.com/priya_mahey610"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                >
                  <Instagram className="w-5 h-5" />
                  <span className="font-semibold">Follow @priya_mahey610</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                
                <a 
                  href="#services"
                  className="inline-flex items-center space-x-2 bg-white text-[#0F4C45] px-6 py-3 rounded-full border-2 border-[#F7DDE2] hover:border-[#1A5C52] transition-all duration-300 hover:scale-105 group"
                >
                  <span className="font-semibold">View Services</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {portfolioImages.slice(0, 4).map((image, index) => (
                  <div 
                    key={image.id}
                    className={`bg-gradient-to-br from-[#F7DDE2] to-[#FBEFF2] rounded-2xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer ${index % 2 === 0 ? 'rotate-3' : '-rotate-3'}`}
                  >
                    <div className="aspect-square bg-white/50 rounded-lg flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <p className="text-center mt-4 font-medium text-[#0F4C45]">{image.category}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0A1F1D] mb-4">Our Premium Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Expert nail artistry with attention to detail and quality
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => setActiveService(index)}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-2 ${
                  activeService === index
                    ? 'bg-gradient-to-br from-[#0F4C45] to-[#1A5C52] text-white shadow-2xl'
                    : 'bg-gradient-to-br from-[#FBEFF2] to-white border-2 border-[#F7DDE2] hover:shadow-xl'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                  activeService === index ? 'bg-white/20' : 'bg-[#F7DDE2] text-[#0F4C45]'
                }`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                <p className={`${activeService === index ? 'text-white/90' : 'text-gray-600'}`}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-[#F7DDE2] to-[#FBEFF2] rounded-3xl p-8 md:p-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-[#0A1F1D]">{services[activeService].name}</h3>
                <p className="text-gray-600 mt-2">{services[activeService].description}</p>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                {services.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveService(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeService === index ? 'bg-[#0F4C45] scale-125' : 'bg-[#F7DDE2] hover:bg-[#1A5C52]'
                    }`}
                  />
                ))}
              </div>
            </div>
            <a 
              href="https://instagram.com/nailsworld2025"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 group"
            >
              <span className="font-semibold">Book This Service</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-[#FBEFF2]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0A1F1D] mb-4">Our Work</h2>
            <p className="text-xl text-gray-600">Browse through our latest nail art creations</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {portfolioImages.map((image, index) => (
              <div
                key={image.id}
                className={`bg-gradient-to-br from-[#F7DDE2] to-[#FBEFF2] rounded-2xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer ${
                  index % 3 === 0 ? 'rotate-2' : index % 3 === 1 ? '-rotate-1' : 'rotate-1'
                }`}
              >
                <div className="aspect-square bg-white/50 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] flex items-center justify-center">
                    <Palette className="w-8 h-8 text-white" />
                  </div>
                </div>
                <p className="text-center font-medium text-[#0F4C45]">{image.category}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <a 
              href="https://instagram.com/nailsworld2025"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-white text-[#0F4C45] px-8 py-4 rounded-full border-2 border-[#F7DDE2] hover:border-[#1A5C52] transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            >
              <Instagram className="w-6 h-6" />
              <span className="text-lg font-semibold">View More on Instagram</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>
      </section>


      <Review/>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Book Your Appointment Today</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Nails?
          </h2>
          
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join 61+ satisfied clients who've experienced premium nail artistry by Priya.
            DM on Instagram to book your appointment!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href="https://instagram.com/nailsworld2025"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-white text-[#0F4C45] px-8 py-4 rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
            >
              <Instagram className="w-6 h-6" />
              <div className="text-left">
                <div className="font-bold text-lg">DM on Instagram</div>
                <div className="text-sm">@nailsworld2025</div>
              </div>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </a>
            
            <a 
              href="https://instagram.com/priya_mahey610"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
            >
              <Instagram className="w-6 h-6" />
              <div className="text-left">
                <div className="font-bold text-lg">Follow Owner</div>
                <div className="text-sm">@priya_mahey610</div>
              </div>
            </a>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="flex flex-wrap justify-center gap-8 text-white/80">
              <div className="text-center">
                <div className="text-3xl font-bold">20+</div>
                <div className="text-sm">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm">Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">4.9★</div>
                <div className="text-sm">Quality Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">4</div>
                <div className="text-sm">Services</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A1F1D] text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#0F4C45] to-[#1A5C52]"></div>
                <h2 className="text-2xl font-bold">nailsworld2025</h2>
              </div>
              <p className="text-white/70">Professional Nail Artist • Punjab, India</p>
            </div>
            
            <div className="flex items-center space-x-6">
              <a 
                href="https://instagram.com/nailsworld2025"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/60">
            <p>© 2025 nailsworld2025 • Owned by Priya • All rights reserved</p>
            <p className="mt-2 text-sm">Professional nail artistry services including Press-on Nails, Gel Extensions, Acrylic Nails, and Gel-X Nails</p>
          </div>
        </div>
      </footer>
    </div>
  );
}