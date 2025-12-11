// app/about/page.js
'use client';

import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Award, 
  Heart, 
  Users, 
  Clock, 
  Palette, 
  Shield, 
  Star, 
  Instagram, 
  MapPin, 
  Mail, 
  Phone, 
  Calendar,
  ChevronRight,
  ArrowRight,
  Target,
  Gem,
  Brush,
  Zap
} from 'lucide-react';
// Navbar is already included in the layout, no need to import here
import Image from 'next/image';

const AboutPage = () => {
  const [activeStat, setActiveStat] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const stats = [
    { icon: <Heart className="w-6 h-6" />, value: '100%', label: 'Client Satisfaction', suffix: 'Satisfaction Rate' },
    { icon: <Users className="w-6 h-6" />, value: '61+', label: 'Happy Clients', suffix: 'and Counting' },
    { icon: <Clock className="w-6 h-6" />, value: '24/7', label: 'Support', suffix: 'DM Response' },
    { icon: <Palette className="w-6 h-6" />, value: 'Unlimited', label: 'Design Options', suffix: 'Custom Creations' },
  ];

  const values = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Creativity & Innovation',
      description: 'Pushing boundaries with unique designs and modern nail art techniques.',
      color: 'from-pink-400 to-rose-500'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Quality Assurance',
      description: 'Using only premium products and ensuring long-lasting, durable results.',
      color: 'from-emerald-500 to-green-600'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Client-Centric',
      description: 'Personalized service tailored to each client\'s style and preferences.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Precision & Detail',
      description: 'Meticulous attention to detail in every stroke and design element.',
      color: 'from-blue-500 to-cyan-500'
    },
  ];

  const timeline = [
    {
      year: '2020',
      title: 'Passion Ignited',
      description: 'Started experimenting with nail art as a creative hobby.',
      icon: '🎨'
    },
    {
      year: '2021',
      title: 'First Clients',
      description: 'Began taking custom orders from friends and family.',
      icon: '✨'
    },
    {
      year: '2022',
      title: 'Professional Training',
      description: 'Completed advanced nail artistry certification courses.',
      icon: '🏆'
    },
    {
      year: '2023',
      title: 'Brand Launch',
      description: 'Officially launched nailsworld2025 as a professional service.',
      icon: '🚀'
    },
    {
      year: '2024',
      title: 'Community Growth',
      description: 'Expanded client base and built strong community presence.',
      icon: '🌟'
    },
  ];

  const certifications = [
    { name: 'Nail Artistry Certification', issuer: 'International Nail Association' },
    { name: 'Gel Extension Specialist', issuer: 'Beauty Professionals Academy' },
    { name: 'Acrylic Application Expert', issuer: 'Nail Masters Institute' },
    { name: 'Sanitation & Safety', issuer: 'Health & Beauty Council' },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FBEFF2]/30 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#F7DDE2] to-transparent opacity-30"></div>
        
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] text-white px-6 py-2 rounded-full mb-6">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">About nailsworld2025</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-[#0A1F1D] mb-6 leading-tight">
              Where Art Meets
              <span className="text-[#1A5C52]"> Precision</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Welcome to nailsworld2025, where Priya transforms nails into wearable art. 
              Based in Punjab, India, we specialize in creating stunning nail designs 
              that reflect personality and style.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Founder Section */}
            <div className={`space-y-8 transition-all duration-1000 transform ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#F7DDE2] to-[#FBEFF2] rounded-3xl blur-xl opacity-50"></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-[#F7DDE2]">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] flex items-center justify-center">
                        <span className="text-2xl text-white font-bold">P</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#0A1F1D] mb-2">Priya Mahey</h3>
                      <p className="text-[#1A5C52] font-medium mb-3">Founder & Lead Nail Artist</p>
                      <p className="text-gray-600">
                        With a passion for creativity and an eye for detail, Priya brings 
                        your nail visions to life. Each design is crafted with love, 
                        precision, and professional expertise.
                      </p>
                      <div className="flex items-center space-x-4 mt-4">
                        <a
                          href="https://instagram.com/priya_mahey610"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 text-[#0F4C45] hover:text-[#1A5C52] transition-colors"
                        >
                          <Instagram className="w-5 h-5" />
                          <span className="font-medium">@priya_mahey610</span>
                        </a>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
                          ))}
                          <span className="text-sm text-gray-600 ml-2">5.0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Location Card */}
              <div className="bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] text-white rounded-2xl p-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold mb-2">Based in Punjab, India</h4>
                    <p className="text-white/90">
                      Serving clients across Punjab with premium nail artistry services. 
                      Available for appointments and custom orders.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className={`grid grid-cols-2 gap-6 transition-all duration-1000 delay-300 transform ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}>
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl p-6 border border-[#F7DDE2] shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                    activeStat === index ? 'ring-2 ring-[#1A5C52]' : ''
                  }`}
                  onMouseEnter={() => setActiveStat(index)}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-2 rounded-lg ${
                      activeStat === index 
                        ? 'bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] text-white' 
                        : 'bg-[#FBEFF2] text-[#0F4C45]'
                    }`}>
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold text-[#0A1F1D]">{stat.value}</div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-lg text-[#0A1F1D]">{stat.label}</h4>
                    <p className="text-sm text-gray-600">{stat.suffix}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-[#FBEFF2]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0A1F1D] mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a passionate hobby to a thriving nail artistry business
            </p>
          </div>
          
          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#F7DDE2] via-[#1A5C52] to-[#F7DDE2]"></div>
            
            {/* Timeline Items */}
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`w-1/2 ${
                    index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'
                  }`}>
                    <div className={`bg-white rounded-2xl p-6 border border-[#F7DDE2] shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 ${
                      index === timeline.length - 1 ? 'ring-2 ring-[#1A5C52]' : ''
                    }`}>
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <div className="text-sm font-semibold text-[#1A5C52]">{item.year}</div>
                          <h3 className="text-xl font-bold text-[#0A1F1D]">{item.title}</h3>
                        </div>
                      </div>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Center Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-white border-4 border-[#1A5C52] z-10"></div>
                  
                  {/* Empty div for spacing */}
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values & Philosophy */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0A1F1D] mb-4">Our Philosophy</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide every design and client interaction
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {values.map((value, index) => (
              <div
                key={index}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-transparent via-[#F7DDE2] to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-white rounded-2xl p-6 border border-[#F7DDE2] hover:border-[#1A5C52] transition-all duration-500 hover:-translate-y-2">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${value.color} w-fit mb-4`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#0A1F1D] mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mission & Vision */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-[#FBEFF2] to-white rounded-3xl p-8 border border-[#F7DDE2]">
              <div className="flex items-center space-x-3 mb-6">
                <Target className="w-8 h-8 text-[#0F4C45]" />
                <h3 className="text-2xl font-bold text-[#0A1F1D]">Our Mission</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To empower individuals to express their unique style through exceptional 
                nail artistry. We believe every nail tells a story, and we're here to 
                help you tell yours with confidence and creativity.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-[#0F4C45] to-[#1A5C52] text-white rounded-3xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Gem className="w-8 h-8" />
                <h3 className="text-2xl font-bold">Our Vision</h3>
              </div>
              <p className="text-white/90 text-lg leading-relaxed">
                To become the most trusted and innovative nail artistry brand in Punjab, 
                known for setting trends, delivering excellence, and creating a community 
                of nail art enthusiasts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Expertise */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-[#FBEFF2]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0A1F1D] mb-4">Expertise & Certifications</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional training and continuous learning in nail artistry
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Certifications */}
            <div>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#F7DDE2]">
                <div className="flex items-center space-x-3 mb-8">
                  <Award className="w-8 h-8 text-[#0F4C45]" />
                  <h3 className="text-2xl font-bold text-[#0A1F1D]">Certifications</h3>
                </div>
                
                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 rounded-xl hover:bg-[#FBEFF2] transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] flex items-center justify-center flex-shrink-0">
                        <CheckIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#0A1F1D] group-hover:text-[#1A5C52] transition-colors">
                          {cert.name}
                        </h4>
                        <p className="text-gray-600 text-sm">{cert.issuer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Services Expertise */}
            <div>
              <div className="bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] text-white rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-8">
                  <Brush className="w-8 h-8" />
                  <h3 className="text-2xl font-bold">Specialized Services</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="group">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-lg">Press-on Nails</h4>
                      <span className="text-white/80">Expert</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white w-4/5 rounded-full group-hover:w-full transition-all duration-500"></div>
                    </div>
                  </div>
                  
                  <div className="group">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-lg">Gel Extensions</h4>
                      <span className="text-white/80">Expert</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white w-5/6 rounded-full group-hover:w-full transition-all duration-500"></div>
                    </div>
                  </div>
                  
                  <div className="group">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-lg">Acrylic Nails</h4>
                      <span className="text-white/80">Advanced</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white w-3/4 rounded-full group-hover:w-5/6 transition-all duration-500"></div>
                    </div>
                  </div>
                  
                  <div className="group">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-lg">Gel-X Nails</h4>
                      <span className="text-white/80">Expert</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white w-4/5 rounded-full group-hover:w-full transition-all duration-500"></div>
                    </div>
                  </div>
                  
                  <div className="group">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-lg">Nail Art Design</h4>
                      <span className="text-white/80">Master</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-white w-11/12 rounded-full group-hover:w-full transition-all duration-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-[#F7DDE2] to-[#FBEFF2] rounded-3xl p-12 text-center">
            <div className="inline-flex items-center space-x-2 bg-white text-[#0F4C45] px-6 py-2 rounded-full mb-6">
              <Zap className="w-5 h-5" />
              <span className="font-semibold">Ready to Transform Your Nails?</span>
            </div>
            
            <h2 className="text-4xl font-bold text-[#0A1F1D] mb-6">
              Let's Create Something Beautiful Together
            </h2>
            
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Whether you're looking for a simple manicure or elaborate nail art, 
              we're here to bring your vision to life with professional expertise.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="https://instagram.com/nailsworld2025"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] text-white px-8 py-4 rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 group"
              >
                <Instagram className="w-6 h-6" />
                <div className="text-left">
                  <div className="font-bold text-lg">Book on Instagram</div>
                  <div className="text-sm text-white/90">DM @nailsworld2025</div>
                </div>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </a>
              
              <a
                href="https://instagram.com/priya_mahey610"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-3 bg-white text-[#0F4C45] px-8 py-4 rounded-full border-2 border-[#F7DDE2] hover:border-[#1A5C52] hover:scale-105 transition-all duration-300 group"
              >
                <Instagram className="w-6 h-6" />
                <div className="text-left">
                  <div className="font-bold text-lg">Follow Owner</div>
                  <div className="text-sm text-gray-600">@priya_mahey610</div>
                </div>
              </a>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/50">
              <div className="flex flex-wrap justify-center gap-8 text-[#0A1F1D]">
                <div className="text-center">
                  <div className="text-2xl font-bold">Punjab, India</div>
                  <div className="text-sm text-gray-600">Location</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">Professional</div>
                  <div className="text-sm text-gray-600">Quality</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">Custom</div>
                  <div className="text-sm text-gray-600">Designs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">61+</div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </div>
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
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold">nailsworld2025</h2>
              </div>
              <p className="text-white/70">Professional Nail Artist • Owned by Priya</p>
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
            <p>© 2025 nailsworld2025 • Passionate Nail Artistry • All rights reserved</p>
            <p className="mt-2 text-sm">Press-on Nails • Gel Extensions • Acrylic Nails • Gel-X Nails • Custom Nail Art</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Helper component for check icon
const CheckIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export default AboutPage;