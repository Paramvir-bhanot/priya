'use client';  
// pages/appointments/book.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/UI/Button';

// Service types data
const SERVICE_TYPES = [
  'Nail Extensions',
  'Nail Art(simple/advanced)',
  'Gel Polish',
  'press-on nails',
  'gel extensions',
  'acrylic nail',
  'gel-x nails',
  'custom nail art',
  'manicure',
  'pedicure',
  'refill'
];

// Available time slots
const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
  '05:00 PM', '06:00 PM'
];

const BookAppointment = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    anotherNumber: '',
    serviceType: '',
    appointmentDate: '',
    appointmentTime: '',
    notes: ''
  });

  // Form errors
  const [errors, setErrors] = useState({});

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Get next available dates (next 30 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip Sundays (day 0) if you want
      if (date.getDay() !== 0) {
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    
    return dates;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10,11}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    
    if (formData.anotherNumber && !/^\d{10,11}$/.test(formData.anotherNumber.replace(/\D/g, ''))) {
      newErrors.anotherNumber = 'Please enter a valid phone number';
    }
    
    if (!formData.serviceType) {
      newErrors.serviceType = 'Please select a service';
    }
    
    if (!formData.appointmentDate) {
      newErrors.appointmentDate = 'Please select a date';
    }
    
    if (!formData.appointmentTime) {
      newErrors.appointmentTime = 'Please select a time';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/Appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsSuccess(true);
        // Reset form
        setFormData({
          customerName: '',
          phoneNumber: '',
          anotherNumber: '',
          serviceType: '',
          appointmentDate: '',
          appointmentTime: '',
          notes: ''
        });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      } else {
        setErrors(prev => ({
          ...prev,
          submit: data.message || 'Failed to book appointment'
        }));
      }
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: 'Network error. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation effect for form
  useEffect(() => {
    const form = document.getElementById('booking-form');
    if (form) {
      form.classList.add('animate-fade-in');
    }
  }, []);

  return (
    <div className="min-h-screen pt-25 bg-gradient-to-b from-[#FBEFF2] to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-slide-down">
          <div className="inline-block p-3 bg-[#F7DDE2] rounded-full mb-4">
            <svg 
              className="w-12 h-12 text-[#0F4C45]" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-[#0A1F1D] mb-3">
            Book Your Appointment
          </h1>
          <p className="text-lg text-[#1A5C52]">
            Schedule your nail care session with our experts
          </p>
        </div>

        {/* Success Message */}
        {isSuccess && (
          <div className="animate-fade-in mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-semibold text-green-800">Appointment Booked Successfully!</h3>
                <p className="text-green-700">We'll contact you soon to confirm your booking.</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errors.submit && (
          <div className="animate-shake mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-red-800">{errors.submit}</span>
            </div>
          </div>
        )}

        {/* Booking Form */}
        <div 
          id="booking-form"
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#F7DDE2]"
        >
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Customer Name */}
                  <div className="animate-slide-right" style={{ animationDelay: '100ms' }}>
                    <label className="block text-sm font-medium text-[#0A1F1D] mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.customerName ? 'border-red-300' : 'border-[#F7DDE2]'
                        } focus:border-[#0F4C45] focus:ring-2 focus:ring-[#0F4C45] focus:ring-opacity-20 transition-all duration-300`}
                        placeholder="Enter your full name"
                      />
                      {errors.customerName && (
                        <p className="mt-1 text-sm text-red-600 animate-fade-in">{errors.customerName}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="animate-slide-right" style={{ animationDelay: '200ms' }}>
                    <label className="block text-sm font-medium text-[#0A1F1D] mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.phoneNumber ? 'border-red-300' : 'border-[#F7DDE2]'
                        } focus:border-[#0F4C45] focus:ring-2 focus:ring-[#0F4C45] focus:ring-opacity-20 transition-all duration-300`}
                        placeholder="e.g., 555-123-4567"
                      />
                      {errors.phoneNumber && (
                        <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
                      )}
                    </div>
                  </div>

                  {/* Another Number (Optional) */}
                  <div className="animate-slide-right" style={{ animationDelay: '300ms' }}>
                    <label className="block text-sm font-medium text-[#0A1F1D] mb-2">
                      Alternate Phone Number (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="anotherNumber"
                        value={formData.anotherNumber}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.anotherNumber ? 'border-red-300' : 'border-[#F7DDE2]'
                        } focus:border-[#0F4C45] focus:ring-2 focus:ring-[#0F4C45] focus:ring-opacity-20 transition-all duration-300`}
                        placeholder="e.g., 555-987-6543"
                      />
                      {errors.anotherNumber && (
                        <p className="mt-1 text-sm text-red-600">{errors.anotherNumber}</p>
                      )}
                    </div>
                  </div>

                  {/* Service Type */}
                  <div className="animate-slide-right" style={{ animationDelay: '400ms' }}>
                    <label className="block text-sm font-medium text-[#0A1F1D] mb-2">
                      Service Type *
                    </label>
                    <div className="relative">
                      <select
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.serviceType ? 'border-red-300' : 'border-[#F7DDE2]'
                        } focus:border-[#0F4C45] focus:ring-2 focus:ring-[#0F4C45] focus:ring-opacity-20 transition-all duration-300 appearance-none bg-white`}
                      >
                        <option value="">Select a service</option>
                        {SERVICE_TYPES.map((service, index) => (
                          <option key={index} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-[#0F4C45]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      {errors.serviceType && (
                        <p className="mt-1 text-sm text-red-600">{errors.serviceType}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Appointment Date */}
                  <div className="animate-slide-left" style={{ animationDelay: '100ms' }}>
                    <label className="block text-sm font-medium text-[#0A1F1D] mb-2">
                      Appointment Date *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="appointmentDate"
                        value={formData.appointmentDate}
                        onChange={handleChange}
                        min={getTodayDate()}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.appointmentDate ? 'border-red-300' : 'border-[#F7DDE2]'
                        } focus:border-[#0F4C45] focus:ring-2 focus:ring-[#0F4C45] focus:ring-opacity-20 transition-all duration-300`}
                      />
                      {errors.appointmentDate && (
                        <p className="mt-1 text-sm text-red-600">{errors.appointmentDate}</p>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-[#1A5C52]">
                      Available for next 30 days
                    </p>
                  </div>

                  {/* Appointment Time */}
                  <div className="animate-slide-left" style={{ animationDelay: '200ms' }}>
                    <label className="block text-sm font-medium text-[#0A1F1D] mb-2">
                      Appointment Time *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {TIME_SLOTS.map((time, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, appointmentTime: time }))}
                          className={`py-2 px-3 rounded-lg border transition-all duration-300 ${
                            formData.appointmentTime === time
                              ? 'bg-[#0F4C45] text-white border-[#0F4C45]'
                              : 'border-[#F7DDE2] text-[#0A1F1D] hover:border-[#0F4C45] hover:bg-[#F7DDE2]'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    {errors.appointmentTime && (
                      <p className="mt-1 text-sm text-red-600">{errors.appointmentTime}</p>
                    )}
                  </div>

                  {/* Notes */}
                  <div className="animate-slide-left" style={{ animationDelay: '300ms' }}>
                    <label className="block text-sm font-medium text-[#0A1F1D] mb-2">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 rounded-lg border border-[#F7DDE2] focus:border-[#0F4C45] focus:ring-2 focus:ring-[#0F4C45] focus:ring-opacity-20 transition-all duration-300 resize-none"
                      placeholder="Any special requests or additional information..."
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-10 pt-6 border-t border-[#F7DDE2] animate-slide-up">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <p className="text-sm text-[#1A5C52]">
                    * Required fields
                  </p>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="min-w-[150px]"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Booking...
                        </span>
                      ) : (
                        'Book Appointment'
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FBEFF2] p-6 rounded-xl animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center mb-3">
              <div className="p-2 bg-white rounded-lg mr-3">
                <svg className="w-6 h-6 text-[#0F4C45]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#0A1F1D]">Duration</h3>
            </div>
            <p className="text-[#1A5C52]">
              Each session typically takes 60-90 minutes depending on the service.
            </p>
          </div>

          <div className="bg-[#FBEFF2] p-6 rounded-xl animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center mb-3">
              <div className="p-2 bg-white rounded-lg mr-3">
                <svg className="w-6 h-6 text-[#0F4C45]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#0A1F1D]">Confirmation</h3>
            </div>
            <p className="text-[#1A5C52]">
              You'll receive a confirmation call within 24 hours of booking.
            </p>
          </div>

          <div className="bg-[#FBEFF2] p-6 rounded-xl animate-slide-up" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center mb-3">
              <div className="p-2 bg-white rounded-lg mr-3">
                <svg className="w-6 h-6 text-[#0F4C45]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#0A1F1D]">Cancellation</h3>
            </div>
            <p className="text-[#1A5C52]">
              Please notify us at least 24 hours in advance for cancellations.
            </p>
          </div>
        </div>
      </div>

      {/* Add custom animations to global.css or Tailwind config */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideRight {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideLeft {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-slide-down {
          animation: slideDown 0.6s ease-out;
        }
        .animate-slide-right {
          animation: slideRight 0.6s ease-out;
        }
        .animate-slide-left {
          animation: slideLeft 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slideUp 0.6s ease-out;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default BookAppointment;