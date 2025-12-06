"use client"
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ManjitHealthCare = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const sectionRef = useRef(null);

  // Data from knowledge.json
  const clinicData = {
    clinicName: "Manjit Health Care",
    tagline: "Acupressure & Advanced Physiotherapy Centre with Laser Technology",
    contact: {
      phone: ["94174-03743", "70098-60754"],
      address: "VPO Jangliana, Near Bham (Hoshiarpur)",
    },
    doctor: {
      name: "Dr. Manjit Singh",
      qualifications: [
        "B.E.M.S.",
        "Diploma in Acupressure",
        "D. Pharma (Ayur)",
        "Diploma in CMS & ED",
        "Reiki Grandmaster",
        "Diploma in Physiotherapy"
      ]
    },
    services: {
      treatments: [
        "Arthritis", "Cervical", "Allergy", "Disc Slip", "Joint Pain", 
        "Back Pain", "Gas", "Teeth Issues", "Spondylitis", "Sciatica",
        "Metapain", "Knee Pain", "Shoulder Pain", "Liver Issues", 
        "Breathing Issues", "Headache", "Nerves Weakness", "Paralysis", 
        "Piles", "Sexual Weakness"
      ],
      therapies: [
        "Acupressure Therapy", "Physiotherapy", "Laser Therapy", 
        "Reiki Healing", "Sports Injury Treatment", "Children Physiotherapy",
        "Joint Pain Therapy", "Cervical & Back Pain Therapy", 
        "Stress & Nerve Weakness Therapy"
      ],
      specialCare: [
        "Men Sexual Weakness Treatment",
        "Nerve Weakness / Kamzori Ilaaj",
        "Back & Knee Pain Relief",
        "Shoulder & Joints Pain",
        "Sports Injury Care"
      ]
    },
    highlights: [
      "Advanced Physiotherapy",
      "Laser Technology Treatment",
      "Acupressure with Modern Techniques",
      "Reiki Healing Support",
      "Effective for Joint, Back & Nerve Issues",
      "Affordable Treatment Plans"
    ]
  };

  const features = [
    {
      id: 1,
      title: "Advanced Laser Therapy",
      description: "State-of-the-art laser technology for accelerated healing and pain relief",
      icon: "⚡",
      color: "from-violet-500 to-purple-600",
      benefits: ["Non-invasive treatment", "Faster recovery", "Precision targeting", "No side effects"],
      gradient: "bg-gradient-to-br from-violet-50 to-purple-100"
    },
    {
      id: 2,
      title: "Modern Physiotherapy",
      description: "Advanced physiotherapy techniques with cutting-edge equipment",
      icon: "💪",
      color: "from-blue-500 to-cyan-600",
      benefits: ["Sports injury recovery", "Joint mobility", "Muscle strengthening", "Post-surgery rehab"],
      gradient: "bg-gradient-to-br from-blue-50 to-cyan-100"
    },
    {
      id: 3,
      title: "Acupressure Science",
      description: "Traditional healing combined with modern scientific approach",
      icon: "👐",
      color: "from-emerald-500 to-green-600",
      benefits: ["Energy balancing", "Stress relief", "Natural healing", "Holistic approach"],
      gradient: "bg-gradient-to-br from-emerald-50 to-green-100"
    },
    {
      id: 4,
      title: "Reiki Healing",
      description: "Energy healing therapy for mental and physical wellness",
      icon: "✨",
      color: "from-amber-500 to-orange-600",
      benefits: ["Energy channeling", "Mental peace", "Spiritual balance", "Emotional healing"],
      gradient: "bg-gradient-to-br from-amber-50 to-orange-100"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      age: 45,
      condition: "Chronic Back Pain",
      text: "After 10 years of back pain, Dr. Manjit's laser therapy gave me relief in just 2 weeks. Highly recommended!",
      rating: 5
    },
    {
      id: 2,
      name: "Priya Sharma",
      age: 32,
      condition: "Arthritis",
      text: "The combination of acupressure and physiotherapy worked wonders for my arthritis. Thank you!",
      rating: 5
    },
    {
      id: 3,
      name: "Amit Singh",
      age: 28,
      condition: "Sports Injury",
      text: "Professional treatment for my cricket injury. Back on field in 3 weeks with their advanced care.",
      rating: 5
    },
    {
      id: 4,
      name: "Sunita Devi",
      age: 60,
      condition: "Knee Pain",
      text: "Affordable and effective treatment. No more knee pain after 1 month of therapy.",
      rating: 5
    }
  ];

  // Touch handlers for mobile swipe
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setActiveFeature((prev) => (prev + 1) % features.length);
    } else if (isRightSwipe) {
      setActiveFeature((prev) => (prev - 1 + features.length) % features.length);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-advance features and testimonials
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isVisible]);

  const nextFeature = () => setActiveFeature((prev) => (prev + 1) % features.length);
  const prevFeature = () => setActiveFeature((prev) => (prev - 1 + features.length) % features.length);

  return (
    <div className=" bg-white">
      {/* Navigation Header */}
 

      {/* Hero Section */}
      <section className="relative  py-12 overflow-hidden">
        
        
      </section>

      {/* Technical Features Section */}
      <section ref={sectionRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-700">Healing</span> Technologies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Combining traditional wisdom with cutting-edge technology for comprehensive healthcare solutions
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* Features Visualization */}
            <div className="w-full lg:w-1/2">
              <div 
                className="relative h-80 sm:h-96 md:h-[500px] rounded-3xl overflow-hidden touch-pan-y"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    className={`w-full h-full ${features[activeFeature].gradient} rounded-3xl shadow-2xl border border-white/50 relative overflow-hidden`}
                  >
                    {/* Central Feature Icon */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <motion.div 
                        className={`w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-r ${features[activeFeature].color} flex items-center justify-center text-4xl sm:text-5xl shadow-2xl backdrop-blur-sm`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {features[activeFeature].icon}
                      </motion.div>
                    </div>

                    {/* Feature Info */}
                    <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md rounded-t-3xl p-6">
                      <motion.h3 
                        className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {features[activeFeature].title}
                      </motion.h3>
                      <motion.p 
                        className="text-gray-600 text-center text-sm sm:text-base mb-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {features[activeFeature].description}
                      </motion.p>

                      {/* Benefits Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        {features[activeFeature].benefits.map((benefit, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + idx * 0.1 }}
                            className="flex items-center space-x-2 text-xs sm:text-sm text-gray-700 bg-white/50 rounded-lg p-2"
                          >
                            <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0"></div>
                            <span className="truncate">{benefit}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Mobile Navigation Arrows */}
                <button 
                  onClick={prevFeature}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-white transition-all duration-200 active:scale-95 lg:hidden"
                >
                  ←
                </button>
                <button 
                  onClick={nextFeature}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-white transition-all duration-200 active:scale-95 lg:hidden"
                >
                  →
                </button>
              </div>

              {/* Progress Indicators */}
              <div className="flex justify-center space-x-4 mt-6">
                {features.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeFeature === index
                        ? 'bg-cyan-500 scale-125 shadow-md'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    onClick={() => setActiveFeature(index)}
                  />
                ))}
              </div>
            </div>

            {/* Features List for Desktop */}
            <div className="w-full lg:w-1/2 hidden lg:block">
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 rounded-2xl cursor-pointer transition-all duration-500 ${
                      activeFeature === index
                        ? 'bg-white shadow-2xl border-l-4 border-cyan-500'
                        : 'bg-white/80 shadow-lg hover:shadow-xl'
                    }`}
                    onClick={() => setActiveFeature(index)}
                    onMouseEnter={() => setActiveFeature(index)}
                  >
                    <div className="flex items-center space-x-4">
                      <motion.div 
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-2xl transition-transform duration-300 ${
                          activeFeature === index ? 'scale-110 rotate-12' : ''
                        }`}
                        whileHover={{ scale: 1.1 }}
                      >
                        {feature.icon}
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatments & Services Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-700">Treatments</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized care for various health conditions using integrated healing approaches
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Treatments */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-xl p-6"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Conditions We Treat</h3>
              <div className="grid grid-cols-2 gap-3">
                {clinicData.services.treatments.map((treatment, index) => (
                  <motion.div
                    key={treatment}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center space-x-2 text-sm text-gray-700 bg-blue-50 rounded-lg p-3 hover:bg-blue-100 transition-colors"
                  >
                    <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0"></div>
                    <span>{treatment}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Therapies */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl shadow-xl p-6"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Therapies</h3>
              <div className="space-y-3">
                {clinicData.services.therapies.map((therapy, index) => (
                  <motion.div
                    key={therapy}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                      {index + 1}
                    </div>
                    <span className="text-gray-700 font-medium">{therapy}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Special Care */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-3xl shadow-xl p-6"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Specialized Care</h3>
              <div className="space-y-4">
                {clinicData.services.specialCare.map((care, index) => (
                  <motion.div
                    key={care}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-orange-50 rounded-xl border-l-4 border-orange-500 hover:bg-orange-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs">
                        ⭐
                      </div>
                      <span className="text-gray-700 font-medium">{care}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>




      {/* Contact & Location Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Visit <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-700">Our Clinic</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-cyan-50 to-blue-100 rounded-3xl p-8 shadow-xl"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Get In Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center text-white">
                      📍
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Address</h4>
                      <p className="text-gray-600">{clinicData.contact.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white">
                      📞
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Phone Numbers</h4>
                      {clinicData.contact.phone.map((phone, index) => (
                        <p key={index} className="text-gray-600">{phone}</p>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
                      ⏰
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Working Hours</h4>
                      <p className="text-gray-600">Monday - Saturday: 9:00 AM - 7:00 PM</p>
                      <p className="text-gray-600">Sunday: Emergency Only</p>
                    </div>
                  </div>
                </div>

                
              </motion.div>


            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">{clinicData.clinicName}</h3>
              <p className="text-gray-300 leading-relaxed">{clinicData.tagline}</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {['Home', 'Services', 'Treatments', 'About', 'Contact'].map((item) => (
                  <a key={item} href={`#${item.toLowerCase()}`} className="block text-gray-300 hover:text-white transition-colors">
                    {item}
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-300">
                <p>📍 {clinicData.contact.address}</p>
                {clinicData.contact.phone.map((phone, index) => (
                  <p key={index}>📞 {phone}</p>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 {clinicData.clinicName}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      
    </div>
  );
};

export default ManjitHealthCare;