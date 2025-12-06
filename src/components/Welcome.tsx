import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row min-h-screen overflow-hidden">
      {/* Left Half - Image with Overlay Text */}
      <div className="relative w-full md:w-1/2 h-[50vh] md:h-screen">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=2070&auto=format&fit=crop')`,
          }}
        >
          {/* Dark overlay for better text visibility */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          
        </div>
        
        {/* Single Curved Divider */}
        <div className="hidden md:block absolute top-0 right-0 bottom-0 w-16 overflow-visible z-20" style={{ transform: 'translateX(1px)' }}>
          <svg 
            className="absolute top-0 left-0 h-full w-full" 
            viewBox="0 0 100 1000" 
            preserveAspectRatio="none"
          >
            <path 
              d="M 0 0 C 60 250, 60 750, 0 1000 L 100 1000 L 100 0 Z" 
              fill="rgba(236, 253, 245, 1)"
            />
          </svg>
        </div>
        
        {/* Overlay Text with Cloud-like Gradient */}
        <div className="relative z-10 h-full flex items-center justify-center p-4 sm:p-6 md:p-12">
          <div className="relative inline-block">
            {/* Cloud-like spreading gradient background */}
            <div 
              className="absolute -left-8 -top-6 -right-10 -bottom-8 sm:-left-12 sm:-top-10 sm:-right-16 sm:-bottom-12 md:-left-20 md:-top-16 md:-right-24 md:-bottom-16"
              style={{
                background: 'radial-gradient(ellipse 120% 100% at 30% 50%, rgba(22, 101, 52, 0.9) 0%, rgba(34, 197, 94, 0.6) 35%, rgba(134, 239, 172, 0.3) 70%, transparent 100%)',
                filter: 'blur(20px)',
                borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%',
              }}
            ></div>
            <div 
              className="absolute -left-6 -top-4 -right-8 -bottom-6 sm:-left-8 sm:-top-6 sm:-right-12 sm:-bottom-8 md:-left-16 md:-top-12 md:-right-20 md:-bottom-14"
              style={{
                background: 'radial-gradient(ellipse 110% 90% at 40% 50%, rgba(22, 101, 52, 0.7) 0%, rgba(34, 197, 94, 0.4) 40%, rgba(134, 239, 172, 0.2) 75%, transparent 100%)',
                filter: 'blur(15px)',
                borderRadius: '50% 60% 45% 55% / 60% 45% 55% 40%',
              }}
            >            </div>
            <div className="relative flex flex-col items-center">
              <img 
                src="/Market logo.png" 
                alt="Wynnum Mini Supermarket Logo" 
                className="h-16 sm:h-20 md:h-28 lg:h-36 w-auto object-contain mb-4 sm:mb-6 md:mb-8 drop-shadow-2xl animate-zoomIn"
              />
              <h1 
                className="relative text-white leading-tight drop-shadow-2xl text-center"
                style={{ 
                  fontFamily: "'Ubuntu', sans-serif", 
                  fontWeight: 500, 
                  fontStyle: 'italic',
                  textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7), 0 0 15px rgba(22, 101, 52, 0.5)'
                }}
              >
                <span className="block text-3xl sm:text-4xl md:text-6xl lg:text-8xl mb-1 sm:mb-2">Welcome !</span>
                <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-6xl">Wynnum Mini</span>
                <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-6xl">Supermarket</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Right Half - Navigation Options */}
      <div className="relative w-full md:w-1/2 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 p-6 sm:p-8 md:p-16 md:pl-24 min-h-[50vh] md:min-h-screen">
        
        {/* Decorative circles for visual interest */}
        <div className="absolute top-10 right-10 w-40 h-40 bg-emerald-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-teal-200/20 rounded-full blur-3xl"></div>
        
        <div className="relative w-full max-w-md z-10">
          {/* Header Text */}
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-800 mb-2 sm:mb-3 px-2">
              Your Neighborhood Favorite
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 px-2">
              Fresh products, friendly service, everyday!
            </p>
          </div>
          
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
          {/* Home Option */}
          <div className="group cursor-pointer animate-slideInLeft animate-delay-100" onClick={() => navigate('/home')}>
            <div 
              className="relative overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-5 sm:p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              style={{
                clipPath: 'polygon(0 0, 95% 0, 100% 100%, 5% 100%)',
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">Home</h2>
                  <p className="text-emerald-100 text-xs sm:text-sm">Explore our store</p>
                </div>
                <svg 
                  className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 transform group-hover:translate-x-2 transition-transform duration-300 flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* About Option */}
          <div className="group cursor-pointer animate-slideInRight animate-delay-300" onClick={() => navigate('/about')}>
            <div 
              className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 text-white p-5 sm:p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              style={{
                clipPath: 'polygon(0 0, 95% 0, 100% 100%, 5% 100%)',
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">About</h2>
                  <p className="text-blue-100 text-xs sm:text-sm">Learn about us</p>
                </div>
                <svg 
                  className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 transform group-hover:translate-x-2 transition-transform duration-300 flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Services Option */}
          <div className="group cursor-pointer animate-slideInLeft animate-delay-500" onClick={() => navigate('/services')}>
            <div 
              className="relative overflow-hidden bg-gradient-to-r from-purple-500 to-purple-600 text-white p-5 sm:p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              style={{
                clipPath: 'polygon(0 0, 95% 0, 100% 100%, 5% 100%)',
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">Services</h2>
                  <p className="text-purple-100 text-xs sm:text-sm">What we offer</p>
                </div>
                <svg 
                  className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 transform group-hover:translate-x-2 transition-transform duration-300 flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

