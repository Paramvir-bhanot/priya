// components/Gallery.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Filter, Grid3x3, ChevronLeft, ChevronRight, X, Download, Heart, Share2, Instagram, Sparkles, ZoomIn, ArrowUpRight } from 'lucide-react';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const modalRef = useRef(null);

  // Gallery data with enhanced details
  const galleryImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371',
      title: 'Emerald Gel-X',
      category: 'Gel-X Nails',
      description: 'Luxury gel-x extensions with emerald green finish and crystal accents',
      tags: ['Gel-X', 'Green', 'Crystals', 'Luxury'],
      likes: 42,
      date: '2024-01-15',
      serviceType: 'Gel-X Nails'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1607779097383-fb8165f0d0c3',
      title: 'Floral Press-on Set',
      category: 'Press-on Sets',
      description: 'Custom designed press-on nails with delicate floral patterns',
      tags: ['Press-on', 'Floral', 'Spring', 'Custom'],
      likes: 56,
      date: '2024-01-10',
      serviceType: 'Press-on Nails'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1607779055096-0d5277286d7b',
      title: 'Crystal Acrylic',
      category: 'Acrylic Nails',
      description: 'Classic acrylic set with Swarovski crystal arrangement',
      tags: ['Acrylic', 'Crystals', 'Elegant', 'Bridal'],
      likes: 89,
      date: '2024-01-05',
      serviceType: 'Acrylic Nails'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1604656853573-5fd4c0c5b0e6',
      title: 'French Gel Extensions',
      category: 'Gel Extensions',
      description: 'Timeless French tips with modern gel extensions',
      tags: ['Gel', 'French', 'Classic', 'Elegant'],
      likes: 67,
      date: '2024-01-02',
      serviceType: 'Gel Extensions'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371',
      title: 'Abstract Nail Art',
      category: 'Nail Art',
      description: 'Modern abstract design with geometric patterns',
      tags: ['Abstract', 'Geometric', 'Modern', 'Artistic'],
      likes: 78,
      date: '2023-12-28',
      serviceType: 'Press-on Nails'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1607779097383-fb8165f0d0c3',
      title: 'Ombré Press-on',
      category: 'Press-on Sets',
      description: 'Gradual ombré effect from pink to white',
      tags: ['Press-on', 'Ombré', 'Pink', 'Gradient'],
      likes: 45,
      date: '2023-12-25',
      serviceType: 'Press-on Nails'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1607779055096-0d5277286d7b',
      title: 'Marble Gel-X',
      category: 'Gel-X Nails',
      description: 'Marble effect with gold foil details',
      tags: ['Gel-X', 'Marble', 'Gold', 'Luxury'],
      likes: 92,
      date: '2023-12-20',
      serviceType: 'Gel-X Nails'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1604656853573-5fd4c0c5b0e6',
      title: 'Holiday Acrylic',
      category: 'Acrylic Nails',
      description: 'Festive holiday design with glitter accents',
      tags: ['Acrylic', 'Holiday', 'Glitter', 'Festive'],
      likes: 81,
      date: '2023-12-15',
      serviceType: 'Acrylic Nails'
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371',
      title: 'Minimalist Gel',
      category: 'Gel Extensions',
      description: 'Clean minimalist design with nude base',
      tags: ['Gel', 'Minimalist', 'Nude', 'Clean'],
      likes: 34,
      date: '2023-12-10',
      serviceType: 'Gel Extensions'
    },
    {
      id: 10,
      src: 'https://images.unsplash.com/photo-1607779097383-fb8165f0d0c3',
      title: 'Sparkle Nail Art',
      category: 'Nail Art',
      description: 'Full glitter coverage with holographic effects',
      tags: ['Glitter', 'Sparkle', 'Holographic', 'Party'],
      likes: 73,
      date: '2023-12-05',
      serviceType: 'Nail Art'
    },
    {
      id: 11,
      src: 'https://images.unsplash.com/photo-1607779055096-0d5277286d7b',
      title: 'Custom Press-on',
      category: 'Press-on Sets',
      description: 'Personalized press-on set with initials',
      tags: ['Press-on', 'Custom', 'Personalized', 'Initials'],
      likes: 51,
      date: '2023-11-30',
      serviceType: 'Press-on Nails'
    },
    {
      id: 12,
      src: 'https://images.unsplash.com/photo-1604656853573-5fd4c0c5b0e6',
      title: 'Pearl Gel-X',
      category: 'Gel-X Nails',
      description: 'Pearl embellishments on nude gel-x extensions',
      tags: ['Gel-X', 'Pearls', 'Elegant', 'Bridal'],
      likes: 88,
      date: '2023-11-25',
      serviceType: 'Gel-X Nails'
    }
  ];

  // Categories from your data
  const categories = [
    { name: 'All', count: galleryImages.length },
    { name: 'Nail Art', count: galleryImages.filter(img => img.category === 'Nail Art').length },
    { name: 'Press-on Sets', count: galleryImages.filter(img => img.category === 'Press-on Sets').length },
    { name: 'Gel Extensions', count: galleryImages.filter(img => img.category === 'Gel Extensions').length },
    { name: 'Acrylic Nails', count: galleryImages.filter(img => img.category === 'Acrylic Nails').length },
    { name: 'Gel-X Nails', count: galleryImages.filter(img => img.category === 'Gel-X Nails').length }
  ];

  // Filter images based on category and search
  const filteredImages = galleryImages.filter(image => {
    const matchesCategory = activeCategory === 'All' || image.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // Handle modal navigation
  const navigateImage = (direction) => {
    if (!selectedImage) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredImages.length;
    } else {
      newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    }
    
    setSelectedImage(filteredImages[newIndex]);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      
      if (e.key === 'Escape') {
        setSelectedImage(null);
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedImage(null);
      }
    };
    
    if (selectedImage) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  // Toggle favorite
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Share image
  const shareImage = (image) => {
    if (navigator.share) {
      navigator.share({
        title: `Check out this nail art: ${image.title}`,
        text: image.description,
        url: window.location.href,
      });
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(`${image.title} - ${image.description}`);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-white to-[#FBEFF2]">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] text-white px-6 py-2 rounded-full mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">Gallery</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0A1F1D] mb-4">
            Nail Art <span className="text-[#1A5C52]">Portfolio</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of premium nail designs and artistry by Priya. Each piece is crafted with precision and creativity.
          </p>
        </div>

        {/* Controls Bar */}
        <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg border border-[#F7DDE2]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search designs, colors, styles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#FBEFF2] border border-[#F7DDE2] rounded-full focus:outline-none focus:ring-2 focus:ring-[#1A5C52] focus:border-transparent transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat.name
                      ? 'bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] text-white shadow-lg'
                      : 'bg-[#F7DDE2] text-[#0F4C45] hover:bg-[#F7DDE2]/80'
                  }`}
                >
                  {cat.name}
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    activeCategory === cat.name
                      ? 'bg-white/20'
                      : 'bg-white/80'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            {/* View Mode & Filter Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'masonry' : 'grid')}
                className="p-2 bg-[#F7DDE2] text-[#0F4C45] rounded-lg hover:bg-[#F7DDE2]/80 transition-colors"
                title="Toggle view mode"
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="p-2 bg-[#F7DDE2] text-[#0F4C45] rounded-lg hover:bg-[#F7DDE2]/80 transition-colors"
                title="Show filters"
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Advanced Filters (Collapsible) */}
          {showFilter && (
            <div className="mt-6 pt-6 border-t border-[#F7DDE2] animate-slideDown">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#0A1F1D] mb-2">Service Type</label>
                  <select className="w-full px-4 py-2 bg-[#FBEFF2] border border-[#F7DDE2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A5C52]">
                    <option>All Services</option>
                    <option>Press-on Nails</option>
                    <option>Gel Extensions</option>
                    <option>Acrylic Nails</option>
                    <option>Gel-X Nails</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0A1F1D] mb-2">Sort By</label>
                  <select className="w-full px-4 py-2 bg-[#FBEFF2] border border-[#F7DDE2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A5C52]">
                    <option>Most Popular</option>
                    <option>Newest First</option>
                    <option>Oldest First</option>
                    <option>Most Likes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0A1F1D] mb-2">Color Theme</label>
                  <select className="w-full px-4 py-2 bg-[#FBEFF2] border border-[#F7DDE2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A5C52]">
                    <option>All Colors</option>
                    <option>Green</option>
                    <option>Pink</option>
                    <option>Neutral</option>
                    <option>Glitter</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0A1F1D] mb-2">Occasion</label>
                  <select className="w-full px-4 py-2 bg-[#FBEFF2] border border-[#F7DDE2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A5C52]">
                    <option>All Occasions</option>
                    <option>Wedding</option>
                    <option>Party</option>
                    <option>Everyday</option>
                    <option>Holiday</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Gallery Grid */}
        <div className={`mb-8 ${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6'
        }`}>
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className={`group relative overflow-hidden rounded-2xl bg-white shadow-lg border border-[#F7DDE2] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer ${
                viewMode === 'masonry' ? 'break-inside-avoid' : ''
              }`}
              onClick={() => setSelectedImage(image)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden aspect-square">
                {/* Placeholder for images (using gradient) */}
                <div 
                  className="w-full h-full bg-gradient-to-br from-[#F7DDE2] to-[#FBEFF2] group-hover:scale-110 transition-transform duration-700"
                  style={{
                    backgroundImage: `url(${image.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                    <p className="text-sm text-white/80 line-clamp-2">{image.description}</p>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(image.id);
                    }}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  >
                    <Heart 
                      className={`w-5 h-5 ${
                        favorites.includes(image.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                      }`}
                    />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      shareImage(image);
                    }}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  >
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                
                {/* Zoom Indicator */}
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="w-5 h-5 text-white" />
                </div>
                
                {/* Category Badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] text-white text-xs font-medium rounded-full">
                    {image.category}
                  </span>
                </div>
              </div>
              
              {/* Card Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-[#0A1F1D] mb-1">{image.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{image.description}</p>
                  </div>
                  <span className="flex items-center space-x-1 text-sm text-[#1A5C52]">
                    <Heart className="w-4 h-4" />
                    <span>{image.likes}</span>
                  </span>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {image.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-[#F7DDE2] text-[#0F4C45] text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Service Type */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{image.serviceType}</span>
                  <span className="text-gray-400">{image.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-[#F7DDE2] to-[#FBEFF2] rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-[#1A5C52]" />
            </div>
            <h3 className="text-2xl font-bold text-[#0A1F1D] mb-3">No designs found</h3>
            <p className="text-gray-600 mb-8">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
                setShowFilter(false);
              }}
              className="px-6 py-3 bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] text-white rounded-full hover:shadow-lg transition-all duration-300"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 pt-8 border-t border-[#F7DDE2]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-2xl border border-[#F7DDE2] hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-[#0F4C45]">{galleryImages.length}</div>
              <div className="text-gray-600">Total Designs</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl border border-[#F7DDE2] hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-[#0F4C45]">{categories.length - 1}</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl border border-[#F7DDE2] hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-[#0F4C45]">{favorites.length}</div>
              <div className="text-gray-600">Favorites</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl border border-[#F7DDE2] hover:shadow-lg transition-shadow">
              <a
                href="https://instagram.com/nailsworld2025"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-[#0F4C45] hover:text-[#1A5C52]"
              >
                <Instagram className="w-6 h-6" />
                <span className="text-xl font-bold">Follow for More</span>
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Modal for Image Detail */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
            <div 
              ref={modalRef}
              className="relative w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="grid lg:grid-cols-2">
                {/* Image Side */}
                <div className="relative aspect-square lg:aspect-auto lg:h-[600px] bg-gradient-to-br from-[#F7DDE2] to-[#FBEFF2]">
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${selectedImage.src})` }}
                  />
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={() => navigateImage('prev')}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all hover:scale-110"
                  >
                    <ChevronLeft className="w-6 h-6 text-[#0F4C45]" />
                  </button>
                  <button
                    onClick={() => navigateImage('next')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all hover:scale-110"
                  >
                    <ChevronRight className="w-6 h-6 text-[#0F4C45]" />
                  </button>
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/60 text-white rounded-full text-sm">
                    {filteredImages.findIndex(img => img.id === selectedImage.id) + 1} / {filteredImages.length}
                  </div>
                </div>
                
                {/* Info Side */}
                <div className="p-8 lg:p-12">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="inline-block px-4 py-1 bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] text-white text-sm rounded-full mb-3">
                        {selectedImage.category}
                      </div>
                      <h2 className="text-3xl font-bold text-[#0A1F1D] mb-2">{selectedImage.title}</h2>
                      <p className="text-gray-600">{selectedImage.description}</p>
                    </div>
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="p-2 hover:bg-[#F7DDE2] rounded-full transition-colors"
                    >
                      <X className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>
                  
                  {/* Tags */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-[#0A1F1D] mb-3">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedImage.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-[#FBEFF2] text-[#0F4C45] rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Details */}
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div>
                      <h4 className="font-semibold text-[#0A1F1D] mb-2">Service Type</h4>
                      <p className="text-gray-600">{selectedImage.serviceType}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0A1F1D] mb-2">Date Created</h4>
                      <p className="text-gray-600">{selectedImage.date}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0A1F1D] mb-2">Likes</h4>
                      <div className="flex items-center space-x-2">
                        <Heart className="w-5 h-5 text-[#1A5C52]" />
                        <span className="text-gray-600">{selectedImage.likes}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0A1F1D] mb-2">Artisan</h4>
                      <p className="text-gray-600">Priya (nailsworld2025)</p>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => toggleFavorite(selectedImage.id)}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                        favorites.includes(selectedImage.id)
                          ? 'bg-red-50 text-red-600 border border-red-200'
                          : 'bg-[#F7DDE2] text-[#0F4C45] hover:bg-[#F7DDE2]/80'
                      }`}
                    >
                      <Heart 
                        className={`w-5 h-5 ${
                          favorites.includes(selectedImage.id) ? 'fill-red-600' : ''
                        }`}
                      />
                      <span className="font-semibold">
                        {favorites.includes(selectedImage.id) ? 'Favorited' : 'Add to Favorites'}
                      </span>
                    </button>
                    <button
                      onClick={() => shareImage(selectedImage)}
                      className="flex items-center space-x-2 px-6 py-3 bg-[#0F4C45] text-white rounded-full hover:bg-[#1A5C52] transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                      <span className="font-semibold">Share Design</span>
                    </button>
                    <a
                      href="https://instagram.com/nailsworld2025"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-6 py-3 border-2 border-[#0F4C45] text-[#0F4C45] rounded-full hover:bg-[#0F4C45] hover:text-white transition-all"
                    >
                      <Instagram className="w-5 h-5" />
                      <span className="font-semibold">Book Similar</span>
                    </a>
                  </div>
                  
                  {/* Instagram CTA */}
                  <div className="mt-8 pt-6 border-t border-[#F7DDE2]">
                    <p className="text-sm text-gray-600 mb-4">
                      Want this design? Book an appointment or order custom press-ons!
                    </p>
                    <a
                      href="https://instagram.com/nailsworld2025"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-[#0F4C45] hover:text-[#1A5C52] font-semibold"
                    >
                      <span>DM on Instagram to book</span>
                      <ArrowUpRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;