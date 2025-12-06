'use client';
import { useEffect, useMemo, useState } from 'react';

const initialFormState = {
  patientName: '',
  patientEmail: '',
  patientPhone: '',
  patientGender: '',
  date: '',
  time: '',
  problem: '',
  address: ''
};

const defaultProblems = [];

export default function BookingForm() {
  const [formData, setFormData] = useState(initialFormState);
  const [problems, setProblems] = useState(defaultProblems);
  const [loading, setLoading] = useState(false);
  const [servicesError, setServicesError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  const isSubmitDisabled = useMemo(() => {
    return (
      loading ||
      !formData.patientName ||
      !formData.patientEmail ||
      !formData.patientPhone ||
      !formData.patientGender ||
      !formData.date ||
      !formData.time ||
      !formData.problem
    );
  }, [formData, loading]);

  useEffect(() => {
    let ignore = false;

    const fetchProblems = async () => {
      try {
        const response = await fetch('/api/services');
        if (!response.ok) {
          throw new Error('Failed to fetch problems');
        }
        const data = await response.json();
        if (!ignore) {
          const problemsList = (data.treatments ?? []).concat(['Other Problems']);
          setProblems(problemsList);
          setServicesError('');
        }
      } catch (error) {
        console.error('Unable to load problems', error);
        if (!ignore) {
          setServicesError('Unable to load problems list. Please refresh.');
        }
      }
    };

    fetchProblems();
    setIsVisible(true);
    return () => {
      ignore = true;
    };
  }, []);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setFormData(initialFormState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitDisabled) return;

    setLoading(true);
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setAppointmentDetails({
          appointmentId: result.appointment.appointmentId,
          patientName: formData.patientName,
          date: formData.date,
          time: formData.time,
          problem: formData.problem
        });
        setShowConfirmation(true);
        resetForm();
      } else {
        alert(result.error || 'Failed to book appointment');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while booking the appointment');
    } finally {
      setLoading(false);
    }
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
    setAppointmentDetails(null);
  };

  return (
    <>
      <section className={`max-w-4xl mx-auto p-6 space-y-8 pt-22 transition-all duration-500 ${showConfirmation ? 'blur-sm scale-95' : 'blur-0 scale-100'} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Header Section */}
        <header className="text-center space-y-4">
          <div className="inline-flex items-center justify-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-[#7FC8A9] rounded-full animate-pulse"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] bg-gradient-to-r from-[#2C7A7B] to-[#3BB273] bg-clip-text text-transparent">
              Book Your Appointment
            </h2>
            <div className="w-2 h-2 bg-[#7FC8A9] rounded-full animate-pulse"></div>
          </div>
          <p className="text-[#6B7280] text-lg max-w-2xl mx-auto leading-relaxed">
            Complete the form below and we will confirm your appointment via email within seconds.
          </p>
          {servicesError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl animate-shake">
              <p className="text-red-600 text-sm font-medium">{servicesError}</p>
            </div>
          )}
        </header>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#F4F7F8] overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-8 p-6 md:p-8">
            {/* Personal Information Section */}
            <section className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-8 bg-gradient-to-b from-[#2C7A7B] to-[#3BB273] rounded-full"></div>
                <h3 className="text-xl font-semibold text-[#1F2937]">Personal Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#6B7280]">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.patientName}
                    onChange={(e) => handleFieldChange('patientName', e.target.value)}
                    required
                    className="w-full p-4 border border-[#F4F7F8] rounded-xl bg-[#F4F7F8] focus:bg-white focus:border-[#2C7A7B] focus:ring-2 focus:ring-[#7FC8A9] transition-all duration-300 outline-none"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#6B7280]">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.patientEmail}
                    onChange={(e) => handleFieldChange('patientEmail', e.target.value)}
                    required
                    className="w-full p-4 border border-[#F4F7F8] rounded-xl bg-[#F4F7F8] focus:bg-white focus:border-[#2C7A7B] focus:ring-2 focus:ring-[#7FC8A9] transition-all duration-300 outline-none"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#6B7280]">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.patientPhone}
                    onChange={(e) => handleFieldChange('patientPhone', e.target.value)}
                    required
                    className="w-full p-4 border border-[#F4F7F8] rounded-xl bg-[#F4F7F8] focus:bg-white focus:border-[#2C7A7B] focus:ring-2 focus:ring-[#7FC8A9] transition-all duration-300 outline-none"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#6B7280]">Gender</label>
                  <select
                    value={formData.patientGender}
                    onChange={(e) => handleFieldChange('patientGender', e.target.value)}
                    required
                    className="w-full p-4 border border-[#F4F7F8] rounded-xl bg-[#F4F7F8] focus:bg-white focus:border-[#2C7A7B] focus:ring-2 focus:ring-[#7FC8A9] transition-all duration-300 outline-none appearance-none cursor-pointer"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Divider */}
            <div className="border-t border-[#F4F7F8]"></div>

            {/* Appointment Details Section */}
            <section className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-8 bg-gradient-to-b from-[#2C7A7B] to-[#3BB273] rounded-full"></div>
                <h3 className="text-xl font-semibold text-[#1F2937]">Appointment Details</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#6B7280]">Preferred Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleFieldChange('date', e.target.value)}
                    required
                    className="w-full p-4 border border-[#F4F7F8] rounded-xl bg-[#F4F7F8] focus:bg-white focus:border-[#2C7A7B] focus:ring-2 focus:ring-[#7FC8A9] transition-all duration-300 outline-none"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#6B7280]">Preferred Time</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleFieldChange('time', e.target.value)}
                    required
                    className="w-full p-4 border border-[#F4F7F8] rounded-xl bg-[#F4F7F8] focus:bg-white focus:border-[#2C7A7B] focus:ring-2 focus:ring-[#7FC8A9] transition-all duration-300 outline-none"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-[#6B7280]">Treatment/Problem</label>
                  <select
                    value={formData.problem}
                    onChange={(e) => handleFieldChange('problem', e.target.value)}
                    required
                    className="w-full p-4 border border-[#F4F7F8] rounded-xl bg-[#F4F7F8] focus:bg-white focus:border-[#2C7A7B] focus:ring-2 focus:ring-[#7FC8A9] transition-all duration-300 outline-none appearance-none cursor-pointer"
                  >
                    <option value="">Select Treatment or Problem</option>
                    {problems.map((problem) => (
                      <option key={problem} value={problem}>
                        {problem}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            {/* Divider */}
            <div className="border-t border-[#F4F7F8]"></div>

            {/* Address Section */}
            <section className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-8 bg-gradient-to-b from-[#2C7A7B] to-[#3BB273] rounded-full"></div>
                <h3 className="text-xl font-semibold text-[#1F2937]">Additional Information</h3>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#6B7280]">
                  Address <span className="text-[#7FC8A9]">(Optional)</span>
                </label>
                <textarea
                  placeholder="Enter your full address for home visit appointments..."
                  value={formData.address}
                  onChange={(e) => handleFieldChange('address', e.target.value)}
                  className="w-full p-4 border border-[#F4F7F8] rounded-xl bg-[#F4F7F8] focus:bg-white focus:border-[#2C7A7B] focus:ring-2 focus:ring-[#7FC8A9] transition-all duration-300 outline-none min-h-[120px] resize-vertical"
                />
              </div>
            </section>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitDisabled}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                  isSubmitDisabled 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-[#2C7A7B] to-[#3BB273] text-white hover:shadow-lg hover:shadow-[#2C7A7B]/25'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Booking Your Appointment...</span>
                  </div>
                ) : (
                  'Book Appointment Now'
                )}
              </button>
              
              {/* Form Note */}
              <p className="text-center text-sm text-[#6B7280] mt-4">
                We respect your privacy and will never share your information with third parties.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Confirmation Popup */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto transform animate-scale-in">
            {/* Popup Header */}
            <div className="relative p-6 text-center border-b border-[#F4F7F8]">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#3BB273] to-[#2C7A7B] rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#1F2937] mb-2">
                Appointment Confirmed!
              </h3>
              <p className="text-[#6B7280]">
                Your appointment has been successfully booked
              </p>
            </div>

            {/* Appointment Details */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-[#6B7280] font-medium">Appointment ID</p>
                  <p className="text-[#1F2937] font-semibold">{appointmentDetails?.appointmentId}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[#6B7280] font-medium">Patient Name</p>
                  <p className="text-[#1F2937] font-semibold">{appointmentDetails?.patientName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[#6B7280] font-medium">Date</p>
                  <p className="text-[#1F2937] font-semibold">
                    {appointmentDetails?.date ? new Date(appointmentDetails.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : ''}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[#6B7280] font-medium">Time</p>
                  <p className="text-[#1F2937] font-semibold">
                    {appointmentDetails?.time ? new Date(`2000-01-01T${appointmentDetails.time}`).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    }) : ''}
                  </p>
                </div>
                <div className="col-span-2 space-y-1">
                  <p className="text-[#6B7280] font-medium">Treatment</p>
                  <p className="text-[#1F2937] font-semibold">{appointmentDetails?.problem}</p>
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-[#F4F7F8] rounded-xl p-4 mt-4">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 text-[#2C7A7B] mt-0.5 flex-shrink-0">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-sm text-[#6B7280]">
                    <p className="font-medium text-[#2C7A7B]">What's Next?</p>
                    <p className="mt-1">You will receive a confirmation email with all the details. Please arrive 15 minutes before your scheduled time.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Popup Actions */}
            <div className="p-6 border-t border-[#F4F7F8]">
              <button
                onClick={closeConfirmation}
                className="w-full bg-gradient-to-r from-[#2C7A7B] to-[#3BB273] text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#2C7A7B]/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Got It, Thank You!
              </button>
              <p className="text-center text-xs text-[#6B7280] mt-3">
                Need to make changes? Call us at +91 94174-03743
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}