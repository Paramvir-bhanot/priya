"use client";
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('WhyChooseUs error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-red-50 text-red-800 rounded-lg mx-4 my-8">
          <h3 className="text-xl md:text-2xl font-bold mb-2">Something went wrong</h3>
          <p className="text-base md:text-lg">We're having trouble loading this section. Please refresh the page or try again later.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const WhyChooseUs = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [activeSection, setActiveSection] = useState(0);

  const addVisibleSection = useCallback((index) => {
    setVisibleSections(prev => new Set([...prev, index]));
  }, []);

  // ============================================
  // EASILY ADJUST IMAGE DIMENSIONS HERE
  // ============================================
  // Change these values to adjust image sizes:
  // - mobileHeight: Height for mobile devices (default: 'h-64' = 16rem)
  // - tabletHeight: Height for tablets (default: 'md:h-80' = 20rem) 
  // - desktopHeight: Height for desktop (default: 'lg:h-[28rem]' = 28rem)
  // You can use Tailwind classes like: h-48, h-64, h-80, h-96, or custom: h-[20rem], h-[400px]
  const imageDimensions = useMemo(() => ({
    mobileHeight: 'h-84',        // Mobile: 16rem (256px)
    tabletHeight: 'md:h-80',    // Tablet: 20rem (320px)
    desktopHeight: 'lg:h-[28rem]' // Desktop: 28rem (448px)
  }), []);

  const sections = useMemo(() => [
    {
      id: 1,
      title: "Expert Medical Care",
      description: "Under the expert guidance of Dr. Manjit Singh with multiple qualifications including B.E.M.S., Diploma in Acupressure, and advanced physiotherapy training.",
      image: "https://res.cloudinary.com/dqnue6guc/image/upload/v1764508009/WhatsApp_Image_2025-11-27_at_15.06.20_9a64e6e1_ewoc42_992db5.jpg", // Add your image path here
      placeholder: "👨‍⚕️",
      bgColor: "bg-gradient-to-br from-teal-50 via-white to-cyan-50",
      textColor: "text-teal-900",
      accentColor: "from-teal-500 to-cyan-500",
      borderColor: "border-teal-200",
      features: ["B.E.M.S. Qualified", "Diploma in Acupressure", "Reiki Grandmaster", "Advanced Physiotherapy"]
    },
    {
      id: 7,
      title: "Ayurveda",
      description: "Harness the ancient wisdom of Ayurveda for holistic healing. Our Ayurvedic treatments balance your body's doshas and promote natural wellness.",
      image: "https://res.cloudinary.com/dqnue6guc/image/upload/v1764508928/1e3143a9-e50d-4165-a02c-661672e0d5a0.png", // Add your image path here
      placeholder: "🌿",
      bgColor: "bg-gradient-to-br from-yellow-50 via-white to-amber-50",
      textColor: "text-yellow-900",
      accentColor: "from-yellow-500 to-amber-500",
      borderColor: "border-yellow-200",
      features: ["Dosha Balancing", "Herbal Treatments", "Natural Wellness", "Holistic Healing"],
      link: "/services/ayurveda"
    },
    {
      id: 2,
      title: "Advanced Laser Technology",
      description: "Experience cutting-edge laser therapy treatments for faster recovery and effective pain management using modern medical technology.",
      image: "https://res.cloudinary.com/dqnue6guc/image/upload/v1764006502/shutterstock_2515146951-1_isengg.jpg", // Add your image path here
      placeholder: "⚡",
      bgColor: "bg-gradient-to-br from-purple-50 via-white to-violet-50",
      textColor: "text-purple-900",
      accentColor: "from-purple-500 to-violet-500",
      borderColor: "border-purple-200",
      features: ["Modern Laser Treatment", "Faster Recovery", "Pain Management", "Advanced Technology"]
    },
    {
      id: 3,
      title: "Comprehensive Treatment Plans",
      description: "Personalized treatment plans addressing various conditions from arthritis and joint pain to nerve weakness and spinal issues.",
      image: "https://res.cloudinary.com/dqnue6guc/image/upload/v1763923602/conditions-treated-28_yefvrs.png", // Add your image path here
      placeholder: "📋",
      bgColor: "bg-gradient-to-br from-blue-50 via-white to-indigo-50",
      textColor: "text-blue-900",
      accentColor: "from-blue-500 to-indigo-500",
      borderColor: "border-blue-200",
      features: ["Personalized Care", "Multiple Conditions", "Holistic Approach", "Regular Monitoring"]
    },
    {
      id: 4,
      title: "Traditional Acupressure Therapy",
      description: "Ancient healing techniques combined with modern understanding to provide effective acupressure treatments for various ailments.",
      image: "https://res.cloudinary.com/dqnue6guc/image/upload/v1764007544/acupressure-technique_lhrror.jpg", // Add your image path here
      placeholder: "✋",
      bgColor: "bg-gradient-to-br from-green-50 via-white to-emerald-50",
      textColor: "text-green-900",
      accentColor: "from-green-500 to-emerald-500",
      borderColor: "border-green-200",
      features: ["Ancient Techniques", "Modern Application", "Natural Healing", "Proven Results"]
    },
    {
      id: 5,
      title: "Specialized Pain Management",
      description: "Effective treatments for back pain, knee pain, cervical issues, and joint problems using combined therapies.",
      image: "https://res.cloudinary.com/dqnue6guc/image/upload/v1763923780/choosing-a-pain-management-clinic-1024x683_c7wld3.webp", // Add your image path here
      placeholder: "🎯",
      bgColor: "bg-gradient-to-br from-orange-50 via-white to-amber-50",
      textColor: "text-orange-900",
      accentColor: "from-orange-500 to-amber-500",
      borderColor: "border-orange-200",
      features: ["Back & Knee Pain", "Cervical Treatment", "Joint Pain Relief", "Sports Injuries"]
    },
    {
      id: 6,
      title: "Reiki Healing & Energy Therapy",
      description: "Experience the healing power of Reiki energy therapy for stress relief, nerve weakness, and overall wellness.",
      image: "https://res.cloudinary.com/dqnue6guc/image/upload/v1763923869/6ca5c57c-6527-4f6c-978c-e60201098b27.png", // Add your image path here
      placeholder: "🌟",
      bgColor: "bg-gradient-to-br from-pink-50 via-white to-rose-50",
      textColor: "text-pink-900",
      accentColor: "from-pink-500 to-rose-500",
      borderColor: "border-pink-200",
      features: ["Reiki Grandmaster", "Energy Healing", "Stress Relief", "Nerve Strengthening"]
    },
    
  ], []);

  // Auto-rotate active section on mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection(prev => (prev + 1) % sections.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [sections.length]);

  useEffect(() => {
    const timer = setTimeout(() => {
      addVisibleSection(0);
    }, 300);
    return () => clearTimeout(timer);
  }, [addVisibleSection]);

  return (
    <ErrorBoundary>
      <div className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50/30">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow delay-2000"></div>

        {/* Section Header */}
        <div className="relative text-center py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block mb-4">
              <span className="relative inline-block px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-semibold animate-bounce-subtle">
                🌟 Trusted by Thousands
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-fade-in-up">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent relative">
                Manjit Health Care
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-blue-500 transform scale-x-0 animate-scale-in"></span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed animate-fade-in-up delay-200">
              Experience the perfect blend of traditional healing and modern technology
            </p>
            <div className="flex justify-center items-center space-x-2 animate-fade-in-up delay-400">
              <div className="w-8 h-1 bg-teal-500 rounded-full"></div>
              <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full"></div>
              <div className="w-8 h-1 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Mobile Quick Navigation */}
        <div className="lg:hidden sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="flex overflow-x-auto py-3 px-4 space-x-3 scrollbar-hide">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => {
                  document.getElementById(`section-${section.id}`)?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeSection === index 
                    ? `bg-gradient-to-r ${section.accentColor} text-white shadow-lg transform scale-105`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {section.placeholder} {section.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Main Sections */}
        <div className="relative">
          {sections.map((section, index) => (
            <FullWidthSection
              key={section.id}
              section={section}
              index={index}
              isVisible={visibleSections.has(index)}
              onVisible={() => addVisibleSection(index)}
              isActive={activeSection === index}
              imageDimensions={imageDimensions}
            />
          ))}
        </div>

        {/* Floating Action Button for Mobile */}
        <div className="lg:hidden fixed bottom-6 right-6 z-30">
          <button className="w-14 h-14 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full shadow-2xl flex items-center justify-center transform hover:scale-110 transition-all duration-300 animate-pulse-gentle">
            <span className="text-xl">📞</span>
          </button>
        </div>
      </div>
    </ErrorBoundary>
  );
};

const FullWidthSection = React.memo(({ section, index, isVisible, onVisible, isActive, imageDimensions }) => {
  const sectionRef = useRef(null);
  const [imageError, setImageError] = useState(false);
  const isEven = index % 2 === 0;
  
  // Extract height classes from imageDimensions
  const {
    mobileHeight = 'h-64',
    tabletHeight = 'md:h-80',
    desktopHeight = 'lg:h-[28rem]'
  } = imageDimensions || {};
  
  // Combine all height classes
  const imageHeightClasses = `${mobileHeight} ${tabletHeight} ${desktopHeight}`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          onVisible();
        }
      },
      { 
        threshold: 0.2,
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isVisible, onVisible]);

  return (
    <section 
      ref={sectionRef}
      id={`section-${section.id}`}
      className={`${section.bgColor} transition-all duration-1000 overflow-hidden py-12 md:py-16 lg:py-20 border-b ${section.borderColor} relative`}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-current rounded-full animate-float"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-current rounded-full animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-current rounded-full animate-float-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center justify-between gap-8 md:gap-12 lg:gap-16`}>
          
          {/* Text Content */}
          <div className={`flex-1 w-full lg:w-1/2 transition-all duration-1000 ${
            isVisible 
              ? 'opacity-100 translate-x-0' 
              : isEven 
                ? 'opacity-0 -translate-x-12' 
                : 'opacity-0 translate-x-12'
          }`}>
            <div className="max-w-2xl mx-auto lg:mx-0">
              {/* Icon and Title */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 md:mb-8">
                <div className={`relative transform transition-all duration-700 ${
                  isVisible ? 'scale-100 rotate-0' : 'scale-50 rotate-45'
                }`}>
                  <div className="absolute -inset-4 bg-white/50 rounded-2xl blur-lg"></div>
                  <div className={`text-5xl sm:text-6xl md:text-7xl relative animate-bounce-subtle`}>
                    {section.placeholder}
                  </div>
                </div>
                <div className="relative">
                  <div className={`absolute -inset-2 sm:-inset-4 bg-gradient-to-r ${section.accentColor} rounded-2xl blur-lg opacity-20 animate-pulse-gentle`}></div>
                  <h2 className={`relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${section.textColor} leading-tight`}>
                    {section.title}
                  </h2>
                </div>
              </div>

              {/* Description */}
              <p className={`text-base sm:text-lg md:text-xl text-gray-700 mb-6 md:mb-8 leading-relaxed transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}>
                {section.description}
              </p>

              {/* Features List */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8 transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}>
                {section.features.map((feature, featureIndex) => (
                  <div 
                    key={featureIndex}
                    className="flex items-center space-x-2 md:space-x-3 group transform hover:translate-x-2 transition-transform duration-300"
                  >
                    <div className={`w-3 h-3 md:w-4 md:h-4 bg-gradient-to-r ${section.accentColor} rounded-full transform transition-all duration-300 group-hover:scale-150 flex-shrink-0 animate-pulse-gentle`}></div>
                    <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 transition-all duration-300 break-words">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>


              
            </div>
          </div>

          {/* Image Content */}
          <div className={`flex-1 w-full lg:w-1/2 transition-all duration-1000 delay-300 ${
            isVisible 
              ? 'opacity-100 translate-x-0 scale-100' 
              : isEven 
                ? 'opacity-0 translate-x-12 scale-95' 
                : 'opacity-0 -translate-x-12 scale-95'
          }`}>
            <div className="relative max-w-2xl mx-auto lg:mx-0">
              {/* Main Image Container */}
              <div className={`relative rounded-3xl md:rounded-4xl overflow-hidden shadow-2xl md:shadow-3xl transform transition-all duration-700 group hover:scale-105 ${
                isVisible ? 'rotate-0 scale-100' : 'rotate-3 scale-95'
              }`}>
                {/* Actual Image */}
                <div className={`w-full ${imageHeightClasses} bg-gradient-to-br ${section.accentColor} relative overflow-hidden rounded-3xl md:rounded-4xl`}>
                  {/* Image with fallback */}
                  {!imageError ? (
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-full object-cover"
                      onError={() => setImageError(true)}
                      loading="lazy"
                    />
                  ) : null}
                  
                  {/* Fallback placeholder (shown if image fails to load) */}
                  {imageError && (
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
                      <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full translate-x-16 translate-y-16"></div>
                    </div>
                    
                    {/* Main placeholder content */}
                    <div className="relative text-center">
                      <div className="text-6xl md:text-8xl mb-4 transform group-hover:scale-110 transition-transform duration-500">
                        {section.placeholder}
                      </div>
                      <p className="text-lg md:text-xl font-semibold opacity-90">
                        {section.title}
                      </p>
                    </div>
                  </div>
                  )}
                  
                  
                  {/* Clinic name overlay */}
                  <div className="absolute bottom-4 left-4 right-4 bg-black/60 text-white p-4 rounded-xl backdrop-blur-sm transform translate-y-0 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-sm font-semibold text-center">Manjit Health Care</p>
                    <p className="text-xs text-center opacity-80 mt-1">Advanced Healing Center</p>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30">
                        <span className="text-2xl">👆</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Border effect */}
                <div className="absolute inset-0 border-4 border-white border-opacity-30 rounded-3xl md:rounded-4xl pointer-events-none"></div>
              </div>

              {/* Floating Elements */}
              <div className="hidden sm:block absolute -top-6 -right-6 md:-top-8 md:-right-8 w-20 h-20 md:w-28 md:h-28 bg-white rounded-2xl md:rounded-3xl shadow-2xl flex items-center justify-center text-2xl md:text-4xl transform rotate-12 animate-float border-4 border-teal-200/50">
                🌿
              </div>
              <div className="hidden sm:block absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 w-16 h-16 md:w-24 md:h-24 bg-white rounded-2xl md:rounded-3xl shadow-2xl flex items-center justify-center text-xl md:text-3xl transform -rotate-12 animate-float-delayed border-4 border-blue-200/50">
                💫
              </div>

              {/* Mobile-only floating elements */}
              <div className="sm:hidden absolute -top-4 -right-4 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-lg transform rotate-12 animate-float border-2 border-teal-200">
                🌿
              </div>
              <div className="sm:hidden absolute -bottom-4 -left-4 w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-base transform -rotate-12 animate-float-delayed border-2 border-blue-200">
                💫
              </div>
            </div>
          </div>
           {/* Know More Button */}
              {section.link && (
                <div className={`transition-all duration-700 delay-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}>
                  <a
                    href={section.link}
                    className={`inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r ${section.accentColor} text-white font-bold rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
                  >
                    Know More
                    <svg className="w-5 h-5 md:w-6 md:h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              )}
        </div>
      </div>
    </section>
  );
});

// Enhanced CSS animations
const styles = `
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(12deg); }
  50% { transform: translateY(-12px) rotate(12deg); }
}
@keyframes float-delayed {
  0%, 100% { transform: translateY(0) rotate(-12deg); }
  50% { transform: translateY(-10px) rotate(-12deg); }
}
@keyframes float-slow {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(0deg); }
}
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes scale-in {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}
@keyframes bounce-subtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
@keyframes pulse-slow {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.3; }
}
@keyframes pulse-gentle {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
.animate-float {
  animation: float 4s ease-in-out infinite;
}
.animate-float-delayed {
  animation: float-delayed 4s ease-in-out 2s infinite;
}
.animate-float-slow {
  animation: float-slow 5s ease-in-out infinite;
}
.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}
.animate-scale-in {
  animation: scale-in 1s ease-out 0.5s forwards;
}
.animate-bounce-subtle {
  animation: bounce-subtle 2s ease-in-out infinite;
}
.animate-pulse-slow {
  animation: pulse-slow 6s ease-in-out infinite;
}
.animate-pulse-gentle {
  animation: pulse-gentle 3s ease-in-out infinite;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

export default WhyChooseUs;