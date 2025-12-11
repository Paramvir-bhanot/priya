// app/contact/page.js
'use client';

import { useState, useEffect } from 'react';
import { 
  Instagram, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Phone, 
  Clock, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  Sparkles,
  Shield,
  Heart,
  ArrowRight,
  ChevronRight,
  X,
  Loader2
} from 'lucide-react';
import Navbar from '@/app/components/UI/navbar';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [activeForm, setActiveForm] = useState('instagram'); // 'instagram', 'whatsapp', 'email'
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const services = [
    'Press-on Nails',
    'Gel Extensions',
    'Acrylic Nails',
    'Gel-X Nails',
    'Custom Nail Art',
    'Consultation',
    'Other'
  ];

  const contactMethods = [
    {
      id: 'instagram',
      title: 'Instagram DM',
      description: 'Fastest response for bookings & inquiries',
      icon: <Instagram className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-600',
      action: 'DM @nailsworld2025',
      link: 'https://instagram.com/nailsworld2025',
      details: [
        { icon: <Clock className="w-4 h-4" />, text: 'Response: Within 2 hours' },
        { icon: <Shield className="w-4 h-4" />, text: 'Preferred for bookings' },
        { icon: <Sparkles className="w-4 h-4" />, text: 'View portfolio & stories' }
      ]
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp',
      description: 'Direct messaging for urgent inquiries',
      icon: <MessageCircle className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-600',
      action: 'Message +91 XXXXXXXXXX',
      link: 'https://wa.me/91XXXXXXXXXX',
      details: [
        { icon: <Clock className="w-4 h-4" />, text: 'Response: Within 1 hour' },
        { icon: <Shield className="w-4 h-4" />, text: 'Secure communication' },
        { icon: <Calendar className="w-4 h-4" />, text: 'Quick scheduling' }
      ]
    },
    {
      id: 'email',
      title: 'Email',
      description: 'Formal inquiries & detailed discussions',
      icon: <Mail className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-600',
      action: 'Send to hello@nailsworld2025.com',
      link: 'mailto:hello@nailsworld2025.com',
      details: [
        { icon: <Clock className="w-4 h-4" />, text: 'Response: Within 24 hours' },
        { icon: <Shield className="w-4 h-4" />, text: 'Professional communication' },
        { icon: <Heart className="w-4 h-4" />, text: 'Detailed project discussions' }
      ]
    }
  ];

  const faqs = [
    {
      question: 'How do I book an appointment?',
      answer: 'Direct message on Instagram is the fastest way! Send your preferred date, service type, and any reference images.'
    },
    {
      question: 'What information should I provide when booking?',
      answer: 'Please share: 1) Service needed, 2) Preferred date & time, 3) Nail shape preference, 4) Reference images (if any), 5) Any allergies or special requirements.'
    },
    {
      question: 'How far in advance should I book?',
      answer: 'We recommend booking at least 3-5 days in advance. For weekends and special occasions, book 1-2 weeks ahead.'
    },
    {
      question: 'Do you offer custom press-on nail sets?',
      answer: 'Yes! We specialize in custom press-on sets. Share your design ideas, and we\'ll create a unique set just for you.'
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'Please notify us at least 24 hours in advance for cancellations. Late cancellations may require a small fee.'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In real implementation, you would send to your backend
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      setSubmitStatus('success');
      setShowSuccessModal(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const businessHours = [
    { day: 'Monday - Friday', hours: '10:00 AM - 8:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 9:00 PM' },
    { day: 'Sunday', hours: '11:00 AM - 6:00 PM' }
  ];

  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        setShowSuccessModal(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessModal]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FBEFF2]/20 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F7DDE2]/10 to-transparent"></div>
        
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] text-white px-6 py-2 rounded-full mb-6">
              <MessageCircle className="w-5 h-5" />
              <span className="font-semibold">Get In Touch</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-[#0A1F1D] mb-6 leading-tight">
              Let's Create
              <span className="text-[#1A5C52]"> Together</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to transform your nails? Reach out through any channel below. 
              We're here to bring your nail art dreams to life!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method) => (
              <div
                key={method.id}
                className={`relative cursor-pointer transition-all duration-500 ${
                  activeForm === method.id 
                    ? 'transform scale-105' 
                    : 'hover:scale-102'
                }`}
                onClick={() => setActiveForm(method.id)}
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${method.color} rounded-2xl blur opacity-0 ${
                  activeForm === method.id ? 'opacity-100' : 'group-hover:opacity-50'
                } transition-opacity duration-500`}></div>
                <div className={`relative bg-white rounded-2xl p-8 border-2 transition-all duration-500 ${
                  activeForm === method.id 
                    ? 'border-transparent' 
                    : 'border-[#F7DDE2] hover:border-[#1A5C52]'
                }`}>
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${method.color} w-fit mb-6`}>
                    {method.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#0A1F1D] mb-3">{method.title}</h3>
                  <p className="text-gray-600 mb-6">{method.description}</p>
                  
                  <div className="space-y-3 mb-8">
                    {method.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className="p-1.5 bg-[#FBEFF2] rounded-lg">
                          {detail.icon}
                        </div>
                        <span className="text-sm text-gray-600">{detail.text}</span>
                      </div>
                    ))}
                  </div>
                  
                  <a
                    href={method.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-between w-full px-6 py-3 rounded-xl transition-all duration-300 ${
                      activeForm === method.id
                        ? 'bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] text-white hover:shadow-xl'
                        : 'bg-[#F7DDE2] text-[#0F4C45] hover:bg-[#F7DDE2]/80'
                    }`}
                  >
                    <span className="font-semibold">{method.action}</span>
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-xl border border-[#F7DDE2] overflow-hidden mb-20">
            <div className="grid lg:grid-cols-2">
              {/* Form Side */}
              <div className="p-8 lg:p-12">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-[#0A1F1D] mb-3">
                    Send a Message
                  </h2>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#0A1F1D] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[#FBEFF2] border border-[#F7DDE2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A5C52] focus:border-transparent transition-all"
                        placeholder="Priya Sharma"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#0A1F1D] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[#FBEFF2] border border-[#F7DDE2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A5C52] focus:border-transparent transition-all"
                        placeholder="hello@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#0A1F1D] mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[#FBEFF2] border border-[#F7DDE2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A5C52] focus:border-transparent transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#0A1F1D] mb-2">
                        Service Interested In *
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[#FBEFF2] border border-[#F7DDE2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A5C52] focus:border-transparent transition-all appearance-none"
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0A1F1D] mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#FBEFF2] border border-[#F7DDE2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A5C52] focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0A1F1D] mb-2">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      className="w-full px-4 py-3 bg-[#FBEFF2] border border-[#F7DDE2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A5C52] focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about your nail art ideas, preferred designs, colors, or any special requirements..."
                    ></textarea>
                  </div>

                  {submitStatus === 'error' && (
                    <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-xl">
                      <AlertCircle className="w-5 h-5" />
                      <span>Something went wrong. Please try again or contact us directly.</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center space-x-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] text-white hover:shadow-xl hover:scale-105'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Info Side */}
              <div className="bg-gradient-to-br from-[#0F4C45] to-[#1A5C52] text-white p-8 lg:p-12">
                <div className="mb-10">
                  <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <Instagram className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Instagram (Fastest)</h4>
                        <a
                          href="https://instagram.com/nailsworld2025"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/80 hover:text-white transition-colors"
                        >
                          @nailsworld2025
                        </a>
                        <p className="text-sm text-white/60 mt-1">For bookings & quick questions</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <Instagram className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Owner's Instagram</h4>
                        <a
                          href="https://instagram.com/priya_mahey610"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/80 hover:text-white transition-colors"
                        >
                          @priya_mahey610
                        </a>
                        <p className="text-sm text-white/60 mt-1">Connect directly with Priya</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Location</h4>
                        <p className="text-white/80">Punjab, India</p>
                        <p className="text-sm text-white/60 mt-1">Serving clients across Punjab</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Business Hours</h4>
                        <div className="space-y-2">
                          {businessHours.map((schedule, idx) => (
                            <div key={idx} className="text-sm">
                              <span className="text-white/80">{schedule.day}:</span>
                              <span className="ml-2 text-white/60">{schedule.hours}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-white/20 pt-8">
                  <h4 className="font-semibold mb-4">Why Choose Us?</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-300" />
                      <span className="text-white/90">Professional Certification</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-300" />
                      <span className="text-white/90">Premium Quality Products</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-300" />
                      <span className="text-white/90">Custom Designs</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-300" />
                      <span className="text-white/90">61+ Happy Clients</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-white to-[#FBEFF2]">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#0A1F1D] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#F7DDE2] p-6 hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => {
                  // Toggle answer visibility
                  const answer = document.getElementById(`faq-answer-${index}`);
                  if (answer) {
                    answer.classList.toggle('hidden');
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#0A1F1D] group-hover:text-[#1A5C52] transition-colors">
                    {faq.question}
                  </h3>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#1A5C52] transform group-hover:rotate-90 transition-all" />
                </div>
                <div id={`faq-answer-${index}`} className="hidden mt-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] rounded-3xl p-12 text-center text-white">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">Ready to Start?</span>
            </div>
            
            <h2 className="text-4xl font-bold mb-6">
              Book Your Nail Appointment Today
            </h2>
            
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Join 61+ satisfied clients who've experienced premium nail artistry. 
              Your dream nails are just a message away!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="https://instagram.com/nailsworld2025"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-3 bg-white text-[#0F4C45] px-8 py-4 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
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
                className="inline-flex items-center justify-center space-x-3 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
              >
                <Instagram className="w-6 h-6" />
                <div className="text-left">
                  <div className="font-bold text-lg">Follow Owner</div>
                  <div className="text-sm">@priya_mahey610</div>
                </div>
              </a>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/20">
              <div className="flex flex-wrap justify-center gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold">2 hours</div>
                  <div className="text-sm text-white/80">Avg. Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm text-white/80">Satisfaction Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm text-white/80">DMs Open</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">Custom</div>
                  <div className="text-sm text-white/80">Designs Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-[#F7DDE2] rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-[#0A1F1D] mb-3">
                Message Sent Successfully!
              </h3>
              
              <p className="text-gray-600 mb-6">
                Thank you for reaching out! We've received your message and will get back to you within 24 hours.
              </p>
              
              <div className="bg-[#FBEFF2] rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-[#0F4C45]">Pro Tip:</span> For faster response, you can also DM us directly on Instagram!
                </p>
              </div>
              
              <a
                href="https://instagram.com/nailsworld2025"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-[#0F4C45] to-[#1A5C52] text-white px-6 py-3 rounded-full hover:shadow-lg transition-all"
              >
                <Instagram className="w-5 h-5" />
                <span className="font-semibold">Message on Instagram</span>
              </a>
            </div>
          </div>
        </div>
      )}

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
              <p className="text-white/70">Contact us anytime • Professional Nail Artistry</p>
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
            <p>© 2025 nailsworld2025 • Punjab, India • All rights reserved</p>
            <p className="mt-2 text-sm">Professional nail services: Press-on Nails • Gel Extensions • Acrylic Nails • Gel-X Nails</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;