'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { toast, Toaster } from 'react-hot-toast';
import { 
  Trash2, 
  Upload, 
  X, 
  Edit2, 
  Check, 
  Loader2,
  Grid,
  List,
  Search
} from 'lucide-react';

export default function GalleryEditor() {
  // State management
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [editTitleId, setEditTitleId] = useState(null);
  const [photoTitles, setPhotoTitles] = useState({});
  const [editingTitle, setEditingTitle] = useState('');
  
  const fileInputRef = useRef(null);
  const editInputRef = useRef(null);

  // Fetch gallery photos on component mount
  useEffect(() => {
    fetchGalleryPhotos();
  }, []);

  // Focus edit input when editing starts
  useEffect(() => {
    if (editTitleId && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editTitleId]);

  // Fetch photos from your API route
  const fetchGalleryPhotos = async () => {
    try {
      setLoading(true);
      // In a real implementation, you would fetch from your API
      // const response = await fetch('/api/gallery');
      // const data = await response.json();
      
      // For demo purposes, we'll use mock data
      setTimeout(() => {
        const mockPhotos = [
          { id: '1', url: 'https://images.unsplash.com/photo-1682685797366-715d29e33f9d?w=800&auto=format&fit=crop', public_id: 'gallery1', title: 'Mountain Landscape' },
          { id: '2', url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w-800&auto=format&fit=crop', public_id: 'gallery2', title: 'Ocean Waves' },
          { id: '3', url: 'https://images.unsplash.com/photo-1682687982502-1529b3b33f85?w=800&auto=format&fit=crop', public_id: 'gallery3', title: 'Desert Sunset' },
          { id: '4', url: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=800&auto=format&fit=crop', public_id: 'gallery4', title: 'Forest Path' },
          { id: '5', url: 'https://images.unsplash.com/photo-1682687982502-1529b3b33f85?w=800&auto=format&fit=crop', public_id: 'gallery5', title: 'City Skyline' },
          { id: '6', url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&auto=format&fit=crop', public_id: 'gallery6', title: 'Beach Day' },
        ];
        setPhotos(mockPhotos);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error fetching photos:', error);
      toast.error('Failed to load photos');
      setLoading(false);
    }
  };

  // Handle photo upload
  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match('image.*')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      // In a real implementation, you would use your API route
      // const response = await fetch('/api/gallery', {
      //   method: 'POST',
      //   body: formData,
      // });
      // const data = await response.json();

      // For demo, simulate upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newPhoto = {
        id: Date.now().toString(),
        url: URL.createObjectURL(file),
        public_id: `gallery_${Date.now()}`,
        title: file.name.replace(/\.[^/.]+$/, ""),
      };

      setPhotos(prev => [newPhoto, ...prev]);
      toast.success('Photo uploaded successfully!');
      
      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload photo');
    } finally {
      setUploading(false);
    }
  };

  // Handle photo deletion
  const handleDelete = async (photoId, publicId) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;

    setDeletingId(photoId);
    
    try {
      // In a real implementation, you would call your API
      // await fetch('/api/gallery', {
      //   method: 'DELETE',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ public_id: publicId }),
      // });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setPhotos(prev => prev.filter(photo => photo.id !== photoId));
      toast.success('Photo deleted successfully!');
      
      // Close modal if the deleted photo was selected
      if (selectedPhoto?.id === photoId) {
        setSelectedPhoto(null);
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete photo');
    } finally {
      setDeletingId(null);
    }
  };

  // Start editing photo title
  const startEditTitle = (photoId, currentTitle) => {
    setEditTitleId(photoId);
    setEditingTitle(currentTitle);
  };

  // Save edited photo title
  const saveEditTitle = (photoId) => {
    if (editingTitle.trim() === '') {
      toast.error('Title cannot be empty');
      return;
    }

    setPhotos(prev => prev.map(photo => 
      photo.id === photoId 
        ? { ...photo, title: editingTitle }
        : photo
    ));
    
    setEditTitleId(null);
    setEditingTitle('');
    toast.success('Title updated!');
  };

  // Filter photos based on search query
  const filteredPhotos = photos.filter(photo =>
    photo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7DDE2] to-[#FBEFF2] p-4 md:p-8">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#0F4C45',
            color: '#FBEFF2',
          },
          success: {
            iconTheme: {
              primary: '#FBEFF2',
              secondary: '#0F4C45',
            },
          },
          error: {
            style: {
              background: '#dc2626',
              color: '#FBEFF2',
            },
          },
        }}
      />

      {/* Header */}
      <header className="mb-8 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0A1F1D] mb-2">
            Photo Gallery Editor
          </h1>
          <p className="text-lg text-[#1A5C52]">
            Upload, organize, and manage your photos
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        {/* Controls Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 animate-slide-down">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Upload Button */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-2 bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Upload Photo
                  </>
                )}
              </button>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleUpload}
                accept="image/*"
                className="hidden"
              />
              
              <div className="text-sm text-[#0A1F1D]">
                {uploading ? 'Upload in progress...' : 'Max 5MB per image'}
              </div>
            </div>

            {/* Search and View Controls */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              {/* Search Bar */}
              <div className="relative flex-1 md:flex-none">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1A5C52] w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search photos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full md:w-64 bg-white/90 border border-[#1A5C52]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F4C45] focus:border-transparent text-[#0A1F1D]"
                />
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2 bg-white/90 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'grid'
                      ? 'bg-[#0F4C45] text-white'
                      : 'text-[#1A5C52] hover:bg-[#F7DDE2]'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'list'
                      ? 'bg-[#0F4C45] text-white'
                      : 'text-[#1A5C52] hover:bg-[#F7DDE2]'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Content */}
        <div className="animate-fade-in-up">
          {loading ? (
            // Loading State
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-[#F7DDE2] border-t-[#0F4C45] rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] rounded-full animate-pulse"></div>
                </div>
              </div>
              <p className="mt-4 text-lg text-[#0A1F1D]">Loading your gallery...</p>
            </div>
          ) : filteredPhotos.length === 0 ? (
            // Empty State
            <div className="text-center py-20 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#F7DDE2] to-[#FBEFF2] rounded-full flex items-center justify-center">
                <Upload className="w-12 h-12 text-[#1A5C52]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0A1F1D] mb-2">
                {searchQuery ? 'No photos found' : 'No photos yet'}
              </h3>
              <p className="text-[#1A5C52] mb-6 max-w-md mx-auto">
                {searchQuery 
                  ? 'Try a different search term'
                  : 'Upload your first photo to start building your gallery'
                }
              </p>
              {!searchQuery && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] text-white px-8 py-3 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                >
                  Upload First Photo
                </button>
              )}
            </div>
          ) : (
            // Gallery Grid/List
            <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'flex flex-col'} gap-6`}>
              {filteredPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl animate-fade-in-up`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Photo Container */}
                  <div 
                    className="relative aspect-square cursor-pointer bg-gradient-to-br from-[#F7DDE2] to-[#FBEFF2] overflow-hidden group"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-8 h-8 bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Mock image - replace with Next/Image in production */}
                    <div 
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${photo.url})` }}
                    />
                    
                    {/* Delete Button Overlay */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(photo.id, photo.public_id);
                      }}
                      disabled={deletingId === photo.id}
                      className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg transform hover:scale-110 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
                    >
                      {deletingId === photo.id ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Trash2 className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {/* Photo Info */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      {editTitleId === photo.id ? (
                        <div className="flex items-center gap-2 flex-1">
                          <input
                            ref={editInputRef}
                            type="text"
                            value={editingTitle}
                            onChange={(e) => setEditingTitle(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') saveEditTitle(photo.id);
                              if (e.key === 'Escape') {
                                setEditTitleId(null);
                                setEditingTitle('');
                              }
                            }}
                            className="flex-1 px-3 py-1 border border-[#1A5C52] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F4C45]"
                          />
                          <button
                            onClick={() => saveEditTitle(photo.id)}
                            className="p-1 text-[#0F4C45] hover:text-[#1A5C52]"
                          >
                            <Check className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => {
                              setEditTitleId(null);
                              setEditingTitle('');
                            }}
                            className="p-1 text-gray-500 hover:text-gray-700"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <h3 className="font-semibold text-[#0A1F1D] truncate">
                            {photo.title}
                          </h3>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startEditTitle(photo.id, photo.title);
                            }}
                            className="p-1 text-[#1A5C52] hover:text-[#0F4C45] hover:bg-[#F7DDE2] rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                    <div className="flex justify-between items-center text-sm text-[#1A5C52]">
                      <span className="px-2 py-1 bg-[#FBEFF2] rounded">
                        {photo.public_id}
                      </span>
                      <button
                        onClick={() => setSelectedPhoto(photo)}
                        className="text-[#0F4C45] font-medium hover:text-[#1A5C52] hover:underline"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stats */}
          {!loading && photos.length > 0 && (
            <div className="mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg animate-fade-in">
              <div className="flex flex-wrap gap-6 justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-[#0A1F1D] mb-1">
                    Gallery Stats
                  </h3>
                  <p className="text-[#1A5C52]">
                    {filteredPhotos.length} of {photos.length} photos shown
                    {searchQuery && ` for "${searchQuery}"`}
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#0F4C45]">
                      {photos.length}
                    </div>
                    <div className="text-sm text-[#1A5C52]">Total Photos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#0F4C45]">
                      {viewMode === 'grid' ? 'Grid' : 'List'}
                    </div>
                    <div className="text-sm text-[#1A5C52]">View Mode</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Photo Detail Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedPhoto(null)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scale-up">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-[#F7DDE2]">
              <div>
                <h2 className="text-2xl font-bold text-[#0A1F1D]">
                  {selectedPhoto.title}
                </h2>
                <p className="text-[#1A5C52]">{selectedPhoto.public_id}</p>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-2 hover:bg-[#F7DDE2] rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-[#0A1F1D]" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-auto max-h-[calc(90vh-200px)]">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Image */}
                <div className="bg-gradient-to-br from-[#F7DDE2] to-[#FBEFF2] rounded-xl overflow-hidden aspect-square">
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${selectedPhoto.url})` }}
                  />
                </div>

                {/* Details */}
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#0A1F1D] mb-2">
                      Photo Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-[#F7DDE2]">
                        <span className="text-[#1A5C52]">Title:</span>
                        <span className="font-medium text-[#0A1F1D]">
                          {selectedPhoto.title}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-[#F7DDE2]">
                        <span className="text-[#1A5C52]">Public ID:</span>
                        <span className="font-medium text-[#0A1F1D]">
                          {selectedPhoto.public_id}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-[#F7DDE2]">
                        <span className="text-[#1A5C52]">Status:</span>
                        <span className="px-3 py-1 bg-[#FBEFF2] text-[#0F4C45] rounded-full text-sm font-medium">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-4">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(selectedPhoto.url);
                        toast.success('URL copied to clipboard!');
                      }}
                      className="w-full bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300"
                    >
                      Copy Image URL
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this photo?')) {
                          handleDelete(selectedPhoto.id, selectedPhoto.public_id);
                          setSelectedPhoto(null);
                        }
                      }}
                      className="w-full flex items-center justify-center gap-2 border border-red-300 text-red-600 py-3 rounded-xl hover:bg-red-50 transition-all duration-300"
                    >
                      <Trash2 className="w-5 h-5" />
                      Delete Photo
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-[#F7DDE2] bg-[#FBEFF2]/30">
              <div className="flex justify-between items-center">
                <p className="text-sm text-[#1A5C52]">
                  Click outside to close
                </p>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="px-6 py-2 bg-white border border-[#1A5C52] text-[#0F4C45] rounded-xl hover:bg-[#F7DDE2] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes slide-down {
          from { 
            opacity: 0; 
            transform: translateY(-20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes scale-up {
          from { 
            opacity: 0; 
            transform: scale(0.9); 
          }
          to { 
            opacity: 1; 
            transform: scale(1); 
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animate-slide-down {
          animation: slide-down 0.5s ease-out;
        }
        
        .animate-scale-up {
          animation: scale-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}