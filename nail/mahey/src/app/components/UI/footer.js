// components/Footer.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Instagram, 
  Facebook, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Heart,
  Sparkles,
  ArrowRight,
  Send,
  ChevronRight,
  Shield,
  CheckCircle,
  Star,
  MessageCircle,
  Calendar,
  Copyright
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const services = [
    { name: 'Press-on Nails', href: '/services/press-on', description: 'Custom designed press-on sets' },
    { name: 'Gel Extensions', href: '/services/gel-extensions', description: 'Long-lasting gel extensions' },
    { name: 'Acrylic Nails', href: '/services/acrylic', description: 'Durable acrylic applications' },
    { name: 'Gel-X Nails', href: '/services/gel-x', description: 'Lightweight Gel-X system' },
    { name: 'Custom Nail Art', href: '/services/nail-art', description: 'Personalized nail designs' },
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Book Appointment', href: '/booking' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Blog', href: '/blog' },
  ];

  const portfolioCategories = [
    { name: 'Nail Art Gallery', href: '/gallery?category=nail-art' },
    { name: 'Press-on Collections', href: '/gallery?category=press-on' },
    { name: 'Bridal Nails', href: '/gallery?category=bridal' },
    { name: 'Seasonal Designs', href: '/gallery?category=seasonal' },
    { name: 'Custom Creations', href: '/gallery?category=custom' },
  ];

  const socialLinks = [
    { platform: 'Instagram', handle: '@nailsworld2025', icon: <Instagram className="w-4 h-4" />, href: 'https://instagram.com/nailsworld2025', color: 'hover:text-pink-600' },
    { platform: 'Instagram', handle: '@priya_mahey610', icon: <Instagram className="w-4 h-4" />, href: 'https://instagram.com/priya_mahey610', color: 'hover:text-purple-600' },
    { platform: 'Facebook', handle: 'nailsworld2025', icon: <Facebook className="w-4 h-4" />, href: '#', color: 'hover:text-blue-600' },
    { platform: 'YouTube', handle: 'nailsworld2025', icon: <Youtube className="w-4 h-4" />, href: '#', color: 'hover:text-red-600' },
  ];

  const contactInfo = [
    { icon: <MapPin className="w-4 h-4" />, text: 'Punjab, India', description: 'Serving clients across Punjab' },
    { icon: <Mail className="w-4 h-4" />, text: 'hello@nailsworld2025.com', description: 'Email for inquiries' },
    { icon: <Phone className="w-4 h-4" />, text: '+91 98765 43210', description: 'Call for urgent inquiries' },
    { icon: <Clock className="w-4 h-4" />, text: 'Mon-Sat: 10 AM - 8 PM', description: 'Sunday: 11 AM - 6 PM' },
  ];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubscribed(true);
    setEmail('');
    setLoading(false);
    
    // Reset after 5 seconds
    setTimeout(() => setSubscribed(false), 5000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A1F1D] text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Stay Updated</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                Get Exclusive Nail Art Tips & Offers
              </h3>
              <p className="text-white/80">
                Subscribe to our newsletter for design inspiration, special offers, 
                and nail care tips delivered to your inbox.
              </p>
            </div>
            
            <div>
              <form onSubmit={handleSubscribe} className="relative">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center space-x-2 bg-white text-[#0F4C45] px-6 py-3 rounded-full font-semibold hover:bg-white/90 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-[#0F4C45] border-t-transparent rounded-full animate-spin"></div>
                        <span>Subscribing...</span>
                      </>
                    ) : subscribed ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span>Subscribed!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Subscribe</span>
                      </>
                    )}
                  </button>
                </div>
                {subscribed && (
                  <p className="mt-3 text-center text-sm text-white/80 animate-fadeIn">
                    🎉 Thank you for subscribing! Check your email for a welcome gift.
                  </p>
                )}
              </form>
              <p className="mt-4 text-sm text-white/60 text-center sm:text-left">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-4 gap-8 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">nailsworld2025</h2>
                  <p className="text-sm text-white/70">By Priya • Professional Nail Artist</p>
                </div>
              </div>
              
              <p className="text-white/80 mb-6 leading-relaxed">
                Transforming nails into wearable art with precision, creativity, 
                and premium quality since 2020. Based in Punjab, India.
              </p>
              
              <div className="flex items-center space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 bg-white/10 rounded-full hover:bg-white/20 ${social.color} transition-all duration-300 hover:scale-110`}
                    aria-label={`Follow on ${social.platform}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Services Column */}
            <div>
              <h3 className="text-lg font-bold mb-6 pb-3 border-b border-white/20">
                Our Services
              </h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link
                      href={service.href}
                      className="group flex items-center text-white/70 hover:text-white transition-colors duration-300"
                    >
                      <ChevronRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div>
                        <span className="font-medium">{service.name}</span>
                        <p className="text-sm text-white/50">{service.description}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links Column */}
            <div>
              <h3 className="text-lg font-bold mb-6 pb-3 border-b border-white/20">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="group flex items-center text-white/70 hover:text-white transition-colors duration-300"
                    >
                      <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-6 border-t border-white/20">
                <h4 className="text-sm font-semibold mb-3">Portfolio Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {portfolioCategories.map((category, index) => (
                    <Link
                      key={index}
                      href={category.href}
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-xs rounded-full transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="text-lg font-bold mb-6 pb-3 border-b border-white/20">
                Contact Info
              </h3>
              <ul className="space-y-4">
                {contactInfo.map((info, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="p-2 bg-white/10 rounded-lg mt-1">
                      {info.icon}
                    </div>
                    <div>
                      <p className="font-medium">{info.text}</p>
                      <p className="text-sm text-white/50">{info.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 space-y-4">
                <a
                  href="https://instagram.com/nailsworld2025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-white text-[#0A1F1D] px-4 py-3 rounded-lg hover:bg-white/90 transition-all duration-300 group"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-semibold">DM on Instagram</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                
                <Link
                  href="/booking"
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] text-white px-4 py-3 rounded-lg hover:opacity-90 transition-all duration-300 group"
                >
                  <Calendar className="w-5 h-5" />
                  <span className="font-semibold">Book Appointment</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
              <div className="w-10 h-10 mx-auto mb-3 bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <p className="font-semibold">Premium Quality</p>
              <p className="text-sm text-white/60">Certified Products</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
              <div className="w-10 h-10 mx-auto mb-3 bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <p className="font-semibold">61+ Clients</p>
              <p className="text-sm text-white/60">Satisfied Customers</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
              <div className="w-10 h-10 mx-auto mb-3 bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <p className="font-semibold">Custom Designs</p>
              <p className="text-sm text-white/60">Personalized Service</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
              <div className="w-10 h-10 mx-auto mb-3 bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <p className="font-semibold">Flexible Hours</p>
              <p className="text-sm text-white/60">Weekends Available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-white/60 mb-4 md:mb-0">
              <Copyright className="w-4 h-4" />
              <span>{currentYear} nailsworld2025. All rights reserved.</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/privacy-policy" className="text-white/60 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <span className="text-white/30">•</span>
              <Link href="/terms-of-service" className="text-white/60 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <span className="text-white/30">•</span>
              <Link href="/cancellation-policy" className="text-white/60 hover:text-white transition-colors">
                Cancellation Policy
              </Link>
              <span className="text-white/30">•</span>
              <Link href="/sitemap" className="text-white/60 hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
          
          {/* Made with love */}
          <div className="mt-6 text-center">
            <p className="text-white/40 text-sm">
              Made with ❤️ in Punjab, India • Professional Nail Artistry by Priya
            </p>
            <div className="flex items-center justify-center space-x-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-3 h-3 fill-[#FFD700] text-[#FFD700]" />
              ))}
              <span className="text-xs text-white/40 ml-2">4.9/5 from 61+ clients</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-40"
        aria-label="Scroll to top"
      >
        <ArrowRight className="w-5 h-5 transform -rotate-90" />
      </button>
    </footer>
  );
};

export default Footer;