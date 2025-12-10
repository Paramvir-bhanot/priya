"use client"; 
import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function ReviewComponent() {
  const [reviews, setReviews] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [displayedReviews, setDisplayedReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [confirmationType, setConfirmationType] = useState('success');
  const [formData, setFormData] = useState({
    name: '',
    category: 'Visitor',
    review: '',
    rating: 5
  });

  const reviewsPerPage = 6;

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length > 0) {
      const endIndex = currentPage * reviewsPerPage;
      setDisplayedReviews(reviews.slice(0, endIndex));
    }
  }, [reviews, currentPage]);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/review');
      const data = await response.json();
      const sortedReviews = data.reviews.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setReviews(sortedReviews || []);
      setStatistics(data.statistics || null);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      showConfirmationPopup('Failed to load reviews. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showConfirmationPopup = (message, type = 'success') => {
    setConfirmationMessage(message);
    setConfirmationType(type);
    setShowConfirmation(true);
    
    setTimeout(() => {
      setShowConfirmation(false);
    }, 3000);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/review/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetchReviews();
        setFormData({
          name: '',
          category: 'Visitor',
          review: '',
          rating: 5
        });
        setShowForm(false);
        showConfirmationPopup('Thank you for sharing your healing journey!');
      } else {
        showConfirmationPopup('Failed to submit review. Please try again.', 'error');
      }
    } catch (error) {
      showConfirmationPopup('Error submitting review. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const hasMoreReviews = displayedReviews.length < reviews.length;

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${star <= rating ? 'text-[#0F4C45]' : 'text-[#F7DDE2]'} 
              transition-all duration-300 ${star <= rating ? 'scale-110' : ''}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-2 text-sm font-medium text-[#000000]">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const RatingInput = ({ value, onChange }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="focus:outline-none"
          >
            <svg
              className={`w-8 h-8 cursor-pointer transition-all duration-300 ${star <= value ? 'text-[#0F4C45] transform scale-110' : 'text-[#F7DDE2]'} hover:scale-110`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
        <span className="ml-2 text-sm font-medium text-[#000000]">{value}.0</span>
      </div>
    );
  };

  // Statistics Component
  const StatisticsDisplay = () => {
    if (!statistics || statistics.totalReviews === 0) return null;

    return (
      <div className="bg-white rounded-xl shadow-sm border border-[#F7DDE2] p-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Overall Rating */}
          <div className="text-center pt-[15%]">
            <div className="text-4xl font-bold text-[#0F4C45] mb-2">{statistics.averageRating}</div>
            <div className="flex justify-center mb-2">
              <StarRating rating={statistics.averageRating} />
            </div>
            <p className="text-[#000000]">Based on {statistics.totalReviews} patient review{statistics.totalReviews !== 1 ? 's' : ''}</p>
          </div>

          {/* Rating Breakdown */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-[#0A1F1D] mb-4">Patient Satisfaction</h3>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center">
                  <div className="flex items-center w-16">
                    <span className="text-sm font-medium text-[#000000] mr-1">{rating}</span>
                    <svg className="w-4 h-4 text-[#0F4C45]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-[#FBEFF2] rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] h-2 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${statistics.ratingPercentages[rating]}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center w-20 justify-end">
                    <span className="text-sm font-medium text-[#000000] mr-2">
                      {statistics.ratingCounts[rating]}
                    </span>
                    <span className="text-sm text-[#0A1F1D]">
                      ({statistics.ratingPercentages[rating]}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Confirmation Popup Component
  const ConfirmationPopup = () => {
    if (!showConfirmation) return null;
    
    return (
      <div className="fixed top-4 right-4 z-50 animate-slide-in">
        <div className={`rounded-lg p-4 shadow-lg border-l-4 ${
          confirmationType === 'success' 
            ? 'bg-[#FBEFF2] border-[#0F4C45] text-[#0A1F1D]' 
            : 'bg-red-50 border-red-500 text-red-700'
        }`}>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {confirmationType === 'success' ? (
                <svg className="h-5 w-5 text-[#0F4C45]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{confirmationMessage}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FBEFF2] to-[#F7DDE2]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0F4C45]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FBEFF2] to-[#F7DDE2] py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Patient Reviews | Manjit Health Care</title>
        <meta name="description" content="Read what our patients say about their healing journey with our acupressure, physiotherapy, and laser treatments" />
      </Head>

      {/* Confirmation Popup */}
      <ConfirmationPopup />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#0A1F1D] mb-4">Patient Stories</h1>
          <p className="text-lg text-[#000000] mb-8">Real experiences from our healing community</p>
          
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] hover:from-[#0A1F1D] hover:to-[#0F4C45] text-white font-medium py-3 px-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 flex items-center mx-auto"
          >
            {showForm ? (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Share Your Story
              </>
            )}
          </button>
        </div>

        {/* Review Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-sm border border-[#F7DDE2] p-8 mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold text-[#0A1F1D] mb-2">Share Your Healing Journey</h2>
            <p className="text-[#000000] mb-6">Your experience can inspire others on their path to wellness</p>
            <form onSubmit={handleSubmitReview} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#000000] mb-2">Your Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-[#F7DDE2] rounded-lg focus:ring-2 focus:ring-[#0F4C45] focus:border-[#0F4C45] transition-colors duration-200"
                    required
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#000000] mb-2">You are a</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 border border-[#F7DDE2] rounded-lg focus:ring-2 focus:ring-[#0F4C45] focus:border-[#0F4C45] transition-colors duration-200"
                  >
                    <option value="patient">Patient</option>
                    <option value="acupressure">Acupressure Patient</option>
                    <option value="physiotherapy">Physiotherapy Patient</option>
                    <option value="laser">Laser Therapy Patient</option>
                    <option value="Visitor">Visitor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#000000] mb-2">Treatment Rating</label>
                <RatingInput 
                  value={formData.rating} 
                  onChange={(rating) => setFormData({...formData, rating})} 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#000000] mb-2">Your Experience</label>
                <textarea
                  value={formData.review}
                  onChange={(e) => setFormData({...formData, review: e.target.value})}
                  rows="4"
                  className="w-full px-4 py-3 border border-[#F7DDE2] rounded-lg focus:ring-2 focus:ring-[#0F4C45] focus:border-[#0F4C45] transition-colors duration-200"
                  required
                  placeholder="Tell us about your healing journey..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] hover:from-[#0A1F1D] hover:to-[#0F4C45] text-white font-medium py-3 px-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 disabled:opacity-50 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sharing Your Story...
                  </>
                ) : 'Share Your Experience'}
              </button>
            </form>
          </div>
        )}

        {/* Statistics Display */}
        <StatisticsDisplay />

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayedReviews.map((review, index) => (
            <div 
              key={review._id} 
              className="bg-white rounded-xl shadow-sm border border-[#F7DDE2] overflow-hidden hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 animate-fade-in flex flex-col"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-[#0A1F1D]">{review.name}</h3>
                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full mt-2 ${
                      review.category === 'acupressure' 
                        ? 'bg-[#FBEFF2] text-[#0F4C45]' 
                        : review.category === 'physiotherapy'
                          ? 'bg-[#F7DDE2] text-[#1A5C52]'
                          : review.category === 'laser'
                            ? 'bg-[#FBEFF2] text-[#0A1F1D]'
                            : 'bg-[#F7DDE2] text-[#000000]'
                    }`}>
                      {review.category.charAt(0).toUpperCase() + review.category.slice(1)}
                    </span>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                
                <p className="text-[#000000] mb-6 line-clamp-4 leading-relaxed">{review.review}</p>
              </div>
              
              <div className="px-6 py-4 bg-[#FBEFF2] border-t border-[#F7DDE2]">
                <div className="text-sm text-[#0A1F1D]">
                  {new Date(review.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMoreReviews && (
          <div className="text-center">
            <button
              onClick={handleLoadMore}
              className="bg-white text-[#0F4C45] border border-[#0F4C45] hover:bg-[#0F4C45] hover:text-white font-medium py-3 px-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 flex items-center mx-auto"
            >
              Read More Stories
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

        {!hasMoreReviews && reviews.length > 0 && (
          <div className="text-center py-6">
            <p className="text-[#000000]">Thank you for reading all our patient stories.</p>
          </div>
        )}

        {reviews.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-[#F7DDE2]">
            <div className="text-[#0F4C45] mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <p className="text-[#000000] text-lg mb-4">Be the first to share your healing journey!</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] hover:from-[#0A1F1D] hover:to-[#0F4C45] text-white font-medium py-2 px-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              Share Your Story
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fade-in {
          opacity: 0;
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
        
        /* Elegant glow effect */
        @keyframes premium-glow {
          0% { filter: drop-shadow(0 0 1px rgba(15, 76, 69, 0.2)); }
          50% { filter: drop-shadow(0 0 2px rgba(15, 76, 69, 0.4)); }
          100% { filter: drop-shadow(0 0 1px rgba(15, 76, 69, 0.2)); }
        }
        
        .text-\\[\\#0F4C45\\] {
          animation: premium-glow 3s infinite;
        }
        
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}