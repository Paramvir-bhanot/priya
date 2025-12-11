// components/Gallery.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Filter, Grid3x3, ChevronLeft, ChevronRight, X, Heart, Share2, Instagram, Sparkles, ZoomIn, ArrowUpRight, Calendar, Image as ImageIcon, Loader2 } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const modalRef = useRef(null);

  // Fetch all images from Cloudinary API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/gallery/getAllPhoto');
        const data = await response.json();
        
        if (data.success && data.photos) {
          // Transform Cloudinary data to match our component structure
          const transformedImages = data.photos.map((photo, index) => ({
            id: index + 1,
            src: photo.url,
            publicId: photo.public_id,
            title: photo.context?.title || `Design ${index + 1}`,
            description: photo.context?.description || 'Beautiful nail art design',
            date: photo.context?.date || new Date(photo.created_at).toISOString().split('T')[0],
            width: photo.width,
            height: photo.height,
            context: photo.context || null
          }));
          
          setGalleryImages(transformedImages);
        } else {
          setError(data.error || 'No images found');
        }
      } catch (err) {
        console.error('Error fetching images:', err);
        setError('Failed to load gallery images');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Handle modal navigation
  const navigateImage = (direction) => {
    if (!selectedImage) return;
    
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % galleryImages.length;
    } else {
      newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    }
    
    setSelectedImage(galleryImages[newIndex]);
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

  // Share image
  const shareImage = (image) => {
    if (navigator.share) {
      navigator.share({
        title: `Check out this nail art: ${image.title}`,
        text: image.description,
        url: image.src,
      });
    } else {
      navigator.clipboard.writeText(`${image.title} - ${image.src}`);
      alert('Image link copied to clipboard!');
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

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-12 h-12 text-[#1A5C52] animate-spin mb-4" />
            <p className="text-lg text-gray-600">Loading gallery images...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-red-100 to-red-50 rounded-full flex items-center justify-center">
              <X className="w-12 h-12 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-[#0A1F1D] mb-3">Error Loading Gallery</h3>
            <p className="text-gray-600 mb-8">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] text-white rounded-full hover:shadow-lg transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && !error && galleryImages.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {galleryImages.map((image) => (
              <div
                key={image.publicId}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg border border-[#F7DDE2] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  
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
                </div>
                
                {/* Card Content */}
                <div className="p-5">
                  <div className="mb-3">
                    <h3 className="font-bold text-lg text-[#0A1F1D] mb-1">{image.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{image.description}</p>
                  </div>
                  
                  {/* Date */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {image.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && galleryImages.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-[#F7DDE2] to-[#FBEFF2] rounded-full flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-[#1A5C52]" />
            </div>
            <h3 className="text-2xl font-bold text-[#0A1F1D] mb-3">No images found</h3>
            <p className="text-gray-600 mb-8">No photos have been uploaded yet.</p>
          </div>
        )}

        {/* Stats */}
        {!loading && !error && galleryImages.length > 0 && (
          <div className="mt-12 pt-8 border-t border-[#F7DDE2]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center p-6 bg-white rounded-2xl border border-[#F7DDE2] hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-[#0F4C45]">{galleryImages.length}</div>
                <div className="text-gray-600">Total Designs</div>
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
        )}

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
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    className="w-full h-full object-contain"
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
                    {galleryImages.findIndex(img => img.id === selectedImage.id) + 1} / {galleryImages.length}
                  </div>
                </div>
                
                {/* Info Side */}
                <div className="p-8 lg:p-12">
                  <div className="flex justify-between items-start mb-6">
                    <div>
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
                  
                  {/* Details */}
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div>
                      <h4 className="font-semibold text-[#0A1F1D] mb-2">Date</h4>
                      <p className="text-gray-600">{selectedImage.date}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0A1F1D] mb-2">Artisan</h4>
                      <p className="text-gray-600">Priya (nailsworld2025)</p>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-wrap gap-4">
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