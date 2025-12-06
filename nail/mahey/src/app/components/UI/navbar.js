// components/Navbar.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Instagram, 
  Menu, 
  X, 
  Sparkles, 
  ChevronDown, 
  Phone, 
  Calendar,
  Home,
  Images,
  User,
  MessageCircle,
  ShoppingBag,
  Star,
  Search,
  Heart
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  const navLinks = [
    {
      name: 'Home',
      href: '/',
      icon: <Home className="w-4 h-4" />,
      exact: true
    },
    {
      name: 'Services',
      href: '#',
      icon: <Sparkles className="w-4 h-4" />,
      dropdown: [
        { name: 'Press-on Nails', href: '/services/press-on', icon: '💅' },
        { name: 'Gel Extensions', href: '/services/gel-extensions', icon: '✨' },
        { name: 'Acrylic Nails', href: '/services/acrylic', icon: '💎' },
        { name: 'Gel-X Nails', href: '/services/gel-x', icon: '🌟' },
        { name: 'Custom Nail Art', href: '/services/nail-art', icon: '🎨' }
      ]
    },
    {
      name: 'Gallery',
      href: '/gallery',
      icon: <Images className="w-4 h-4" />,
      exact: true
    },
    {
      name: 'About',
      href: '/about',
      icon: <User className="w-4 h-4" />,
      exact: true
    },
    {
      name: 'Contact',
      href: '/contact',
      icon: <MessageCircle className="w-4 h-4" />,
      exact: true
    }
  ];

  const portfolioCategories = [
    { name: 'Nail Art', href: '/gallery?category=nail-art' },
    { name: 'Press-on Sets', href: '/gallery?category=presson-sets' },
    { name: 'Gel Extensions', href: '/gallery?category=gel-extensions' },
    { name: 'Acrylic Nails', href: '/gallery?category=acrylic-nails' },
    { name: 'Gel-X Nails', href: '/gallery?category=gelx-nails' },
  ];

  const isActive = (href, exact = false) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery);
      setSearchQuery('');
      setSearchOpen(false);
      setMobileSearchOpen(false);
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg py-2' 
          : 'bg-white/95 backdrop-blur-sm py-3'
      }`}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center space-x-3 group flex-shrink-0"
              onClick={() => setIsOpen(false)}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#F7DDE2] rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-[#0A1F1D] tracking-tight group-hover:text-[#0F4C45] transition-colors">
                  nailsworld2025
                </span>
                <span className="text-xs text-[#1A5C52] font-medium">By Priya</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <div key={link.name} className="relative dropdown-container">
                  {link.dropdown ? (
                    <>
                      <button
                        className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                          isActive(link.href) || (link.dropdown && activeDropdown === link.name)
                            ? 'bg-gradient-to-r from-[#0F4C45]/10 to-[#1A5C52]/10 text-[#0F4C45] border border-[#F7DDE2]'
                            : 'text-[#0A1F1D] hover:text-[#0F4C45] hover:bg-[#F7DDE2]/30'
                        }`}
                        onClick={() => toggleDropdown(link.name)}
                        onMouseEnter={() => setActiveDropdown(link.name)}
                      >
                        <span className="mr-2">{link.icon}</span>
                        {link.name}
                        <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${
                          activeDropdown === link.name ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      {link.dropdown && (
                        <div
                          className={`absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-[#F7DDE2] transition-all duration-300 transform origin-top ${
                            activeDropdown === link.name
                              ? 'opacity-100 scale-100 visible'
                              : 'opacity-0 scale-95 invisible'
                          }`}
                          onMouseLeave={() => setActiveDropdown(null)}
                        >
                          {link.dropdown.map((item, index) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className={`flex items-center px-6 py-3 hover:bg-[#FBEFF2] text-[#0A1F1D] transition-all duration-300 ${
                                index === 0 ? 'rounded-t-xl' : ''
                              } ${index === link.dropdown.length - 1 ? 'rounded-b-xl' : ''} ${
                                isActive(item.href, true) ? 'bg-[#FBEFF2] text-[#0F4C45] font-semibold' : ''
                              }`}
                              onClick={() => setActiveDropdown(null)}
                            >
                              <span className="mr-3 text-lg">{item.icon}</span>
                              <span>{item.name}</span>
                              {isActive(item.href, true) && (
                                <div className="ml-auto w-2 h-2 rounded-full bg-[#1A5C52]"></div>
                              )}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        isActive(link.href, link.exact)
                          ? 'bg-gradient-to-r from-[#0F4C45]/10 to-[#1A5C52]/10 text-[#0F4C45] border border-[#F7DDE2]'
                          : 'text-[#0A1F1D] hover:text-[#0F4C45] hover:bg-[#F7DDE2]/30'
                      }`}
                    >
                      <span className="mr-2">{link.icon}</span>
                      {link.name}
                      {isActive(link.href, link.exact) && (
                        <div className="ml-2 w-1.5 h-1.5 rounded-full bg-[#1A5C52] animate-pulse"></div>
                      )}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Search Bar */}
              <div className="relative">
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 text-[#0A1F1D] hover:text-[#0F4C45] hover:bg-[#F7DDE2]/30 rounded-lg transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
                
                {searchOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-[#F7DDE2] p-2">
                    <form onSubmit={handleSearch} className="flex">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search designs, services..."
                        className="flex-1 px-4 py-2 bg-[#FBEFF2] border border-[#F7DDE2] rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#1A5C52]"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] text-white rounded-r-lg hover:opacity-90 transition-opacity"
                      >
                        <Search className="w-5 h-5" />
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="relative group">
                <Link
                  href="/favorites"
                  className="p-2 text-[#0A1F1D] hover:text-[#0F4C45] hover:bg-[#F7DDE2]/30 rounded-lg transition-colors relative"
                >
                  <Heart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#F7DDE2] text-[#0F4C45] text-xs rounded-full flex items-center justify-center font-bold">
                    3
                  </span>
                </Link>
              </div>
              
              <Link
                href="/booking"
                className="flex items-center space-x-2 bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] text-white px-5 py-2.5 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 group"
              >
                <Calendar className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span className="font-semibold">Book Now</span>
              </Link>
              
              <a
                href="https://instagram.com/nailsworld2025"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-[#F7DDE2] text-[#0F4C45] px-5 py-2.5 rounded-full hover:bg-[#F7DDE2]/80 hover:scale-105 transition-all duration-300 group"
              >
                <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">Follow</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 lg:hidden">
              <button
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                className="p-2 text-[#0A1F1D] hover:text-[#0F4C45] hover:bg-[#F7DDE2]/30 rounded-lg transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-[#0A1F1D] hover:text-[#0F4C45] hover:bg-[#F7DDE2]/30 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {mobileSearchOpen && (
            <div className="lg:hidden mt-4 animate-slideDown">
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search designs, services..."
                  className="flex-1 px-4 py-3 bg-[#FBEFF2] border border-[#F7DDE2] rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#1A5C52]"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-4 py-3 bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] text-white rounded-r-lg hover:opacity-90 transition-opacity"
                >
                  <Search className="w-5 h-5" />
                </button>
              </form>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
        isOpen 
          ? 'opacity-100 visible' 
          : 'opacity-0 invisible pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-500 ${
            isOpen ? 'opacity-50' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        />
        
        {/* Mobile Menu Panel */}
        <div className={`absolute right-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-500 overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-6 h-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#F7DDE2]">
              <Link 
                href="/" 
                className="flex items-center space-x-3 group"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-[#0A1F1D]">nailsworld2025</div>
                  <div className="text-xs text-[#1A5C52]">By Priya • Punjab</div>
                </div>
              </Link>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-[#F7DDE2] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#0F4C45]" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-1 mb-8">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.dropdown ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(`mobile-${link.name}`)}
                        className={`flex items-center justify-between w-full py-3 px-4 rounded-lg transition-colors ${
                          activeDropdown === `mobile-${link.name}` || isActive(link.href)
                            ? 'bg-gradient-to-r from-[#0F4C45]/10 to-[#1A5C52]/10 text-[#0F4C45] border border-[#F7DDE2]'
                            : 'text-[#0A1F1D] hover:bg-[#FBEFF2]'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="mr-3">{link.icon}</span>
                          <span className="font-medium">{link.name}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                          activeDropdown === `mobile-${link.name}` ? 'rotate-180' : ''
                        }`} />
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ${
                        activeDropdown === `mobile-${link.name}` ? 'max-h-96' : 'max-h-0'
                      }`}>
                        <div className="pl-8 pr-4 py-2 space-y-2">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className={`flex items-center py-2 px-3 rounded-lg transition-colors ${
                                isActive(item.href, true)
                                  ? 'bg-[#FBEFF2] text-[#0F4C45] font-semibold'
                                  : 'text-[#0A1F1D] hover:text-[#0F4C45] hover:bg-[#F7DDE2]/30'
                              }`}
                              onClick={() => setIsOpen(false)}
                            >
                              <span className="mr-3 text-lg">{item.icon}</span>
                              {item.name}
                              {isActive(item.href, true) && (
                                <div className="ml-auto w-2 h-2 rounded-full bg-[#1A5C52] animate-pulse"></div>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className={`flex items-center py-3 px-4 rounded-lg transition-colors ${
                        isActive(link.href, link.exact)
                          ? 'bg-gradient-to-r from-[#0F4C45]/10 to-[#1A5C52]/10 text-[#0F4C45] border border-[#F7DDE2]'
                          : 'text-[#0A1F1D] hover:bg-[#FBEFF2]'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="mr-3">{link.icon}</span>
                      <span className="font-medium">{link.name}</span>
                      {isActive(link.href, link.exact) && (
                        <div className="ml-auto w-2 h-2 rounded-full bg-[#1A5C52] animate-pulse"></div>
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile CTA Section */}
            <div className="space-y-4 p-4 bg-gradient-to-br from-[#FBEFF2] to-white rounded-xl border border-[#F7DDE2] mb-6">
              <p className="text-sm text-[#0F4C45] font-medium text-center mb-2">
                Book your appointment today!
              </p>
              
              <Link
                href="/booking"
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all duration-300 active:scale-95"
                onClick={() => setIsOpen(false)}
              >
                <Calendar className="w-5 h-5" />
                <span className="font-semibold">Book Appointment</span>
              </Link>
              
              <a
                href="https://instagram.com/nailsworld2025"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 border-2 border-[#0F4C45] text-[#0F4C45] py-3 px-4 rounded-lg hover:bg-[#F7DDE2] transition-colors duration-300 active:scale-95"
                onClick={() => setIsOpen(false)}
              >
                <Instagram className="w-5 h-5" />
                <span className="font-semibold">DM on Instagram</span>
              </a>
            </div>

            {/* Social & Contact Links */}
            <div className="space-y-4">
              <div className="flex justify-center space-x-4">
                <a
                  href="https://instagram.com/nailsworld2025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#F7DDE2] text-[#0F4C45] rounded-full hover:bg-[#F7DDE2]/80 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <Link
                  href="/favorites"
                  className="p-3 bg-[#F7DDE2] text-[#0F4C45] rounded-full hover:bg-[#F7DDE2]/80 transition-colors relative"
                  onClick={() => setIsOpen(false)}
                >
                  <Heart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#0F4C45] text-white text-xs rounded-full flex items-center justify-center font-bold">
                    3
                  </span>
                </Link>
              </div>
              
              <div className="text-center">
                <a
                  href="https://instagram.com/priya_mahey610"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-[#1A5C52] hover:text-[#0F4C45] transition-colors text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  <Instagram className="w-4 h-4" />
                  <span>Follow @priya_mahey610</span>
                </a>
              </div>
            </div>

            {/* Mobile Footer Info */}
            <div className="mt-8 pt-6 border-t border-[#F7DDE2]">
              <div className="text-center text-sm text-gray-600">
                <p className="font-medium text-[#0A1F1D]">nailsworld2025</p>
                <p className="mt-1">Professional Nail Artist</p>
                <p className="mt-1">Punjab, India</p>
                <div className="flex items-center justify-center space-x-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-3 h-3 fill-[#FFD700] text-[#FFD700]" />
                  ))}
                  <span className="text-xs ml-1">5.0 (61+ clients)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Page Indicator (Mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#F7DDE2] shadow-lg z-30 py-2 px-4">
        <div className="flex justify-around items-center">
          <Link
            href="/"
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              isActive('/', true) ? 'text-[#0F4C45]' : 'text-gray-600'
            }`}
            onClick={() => setIsOpen(false)}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs mt-1">Home</span>
            {isActive('/', true) && (
              <div className="w-1 h-1 rounded-full bg-[#1A5C52] mt-1"></div>
            )}
          </Link>
          
          <Link
            href="/gallery"
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              isActive('/gallery') ? 'text-[#0F4C45]' : 'text-gray-600'
            }`}
            onClick={() => setIsOpen(false)}
          >
            <Images className="w-5 h-5" />
            <span className="text-xs mt-1">Gallery</span>
            {isActive('/gallery') && (
              <div className="w-1 h-1 rounded-full bg-[#1A5C52] mt-1"></div>
            )}
          </Link>
          
          <div className="relative -top-4">
            <Link
              href="/booking"
              className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              <Calendar className="w-6 h-6" />
            </Link>
          </div>
          
          <Link
            href="/about"
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              isActive('/about') ? 'text-[#0F4C45]' : 'text-gray-600'
            }`}
            onClick={() => setIsOpen(false)}
          >
            <User className="w-5 h-5" />
            <span className="text-xs mt-1">About</span>
            {isActive('/about') && (
              <div className="w-1 h-1 rounded-full bg-[#1A5C52] mt-1"></div>
            )}
          </Link>
          
          <Link
            href="/contact"
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              isActive('/contact') ? 'text-[#0F4C45]' : 'text-gray-600'
            }`}
            onClick={() => setIsOpen(false)}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-xs mt-1">Contact</span>
            {isActive('/contact') && (
              <div className="w-1 h-1 rounded-full bg-[#1A5C52] mt-1"></div>
            )}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;