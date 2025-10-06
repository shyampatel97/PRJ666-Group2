// index.js (Your Main Page File)

import React, { useEffect, useRef, useState } from "react";
import {
  Leaf,
  ArrowRight,
  Search,
  Stethoscope,
  Monitor,
  ShoppingCart,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Carousel from "@/components/Carousel";
import ScrollServices from "@/components/ScrollServices";
import ChatBot from "@/components/Chatbot";
import StatsSection from "@/components/StatsSection";
import MobileChatPage from "@/components/MobileChatPage";

// Custom styles for hiding scrollbar
const customStyles = `
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  * {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  body {
    overflow-x: hidden;
  }
`;

// Define service data with Icon component references
const servicesData = [
  {
    id: "plant-identification",
    title: "Plant Identification",
    icon: Search,
    bgColor: "#f0ead2",
    textColor: "#283618",
    image: "/plant-identify.JPG",
    buttonText: "Identify Now",
    content: [
      "Instantly identify over 10,000 plant species with 98% accuracy using advanced computer vision technology trained on millions of botanical images. Simply snap a photo and get detailed information on care, growth habits, and ideal conditions. Perfect for gardeners, farmers, and plant enthusiasts of all levels.",
    ],
  },
  {
    id: "disease-diagnosis",
    title: "Disease Diagnosis",
    icon: Stethoscope,
    bgColor: "#283618",
    textColor: "#f0ead2",
    image: "/disease-diagnoses.JPG",
    buttonText: "Diagnose Now",
    content: [
      "Quickly detect and diagnose plant diseases with AI-powered image analysis trained on thousands of crop health cases. Upload a photo of affected leaves or stems to receive accurate results with tailored treatment recommendations. Prevent yield loss, reduce chemical dependency, and safeguard your crops with reliable, science-driven guidance.",
    ],
  },
  {
    id: "dashboard",
    title: "Smart Dashboard",
    icon: Monitor,
    bgColor: "#f0ead2",
    textColor: "#283618",
    image: "/dashboard.JPG",
    buttonText: "Try Dashboard",
    content: [
       "Track plant health daily with real-time updates and AI-powered insights. Monitor environmental conditions like soil, light, and weather while keeping a log of your activities and tasks. Gain personalized recommendations to optimize farming practices, improve efficiency, and maximize yields with data-driven decision making."
    ],
  },
  {
    id: "marketplace",
    title: "Curated Marketplace",
    icon: ShoppingCart,
    bgColor: "#283618",
    textColor: "#f0ead2",
    image: "/marketplace.JPG",
    buttonText: "Search Products",
    content: [
      "Discover a curated selection of farming essentials including organic seeds, eco-friendly fertilizers, and reliable tools all vetted by agricultural experts. Every product is tested and trusted by farmers to ensure quality and sustainability. Support ethical practices while making smart, responsible purchases that empower your farm's growth."
    ],
  },
];

const HomePage = () => {
  // Inject custom styles for scrollbar hiding
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = customStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Parallax animation logic
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const reverseColumns = document.querySelectorAll(".photo-column-reverse");
      const normalColumns = document.querySelectorAll(
        ".photo-column:not(.photo-column-reverse)"
      );

      reverseColumns.forEach((column) => {
        const speed = 0.4;
        column.style.transform = `translateY(${scrollY * speed}px)`;
      });

      normalColumns.forEach((column) => {
        const speed = -0.25;
        column.style.transform = `translateY(${scrollY * speed}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


useEffect(() => {
  // Force scroll to top on page load
  if (typeof window !== 'undefined') {
    window.history.scrollRestoration = 'manual';
    
    // Immediate scroll
    window.scrollTo(0, 0);
    
    // Also scroll after a brief delay to ensure everything is loaded
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }
}, []);

const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Prevent hydration mismatch by not rendering until client-side
  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />

      <style jsx>{`
        /* --- Animation Keyframes --- */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* --- Animation Utility Classes --- */
        .animate {
          animation-duration: 0.7s;
          animation-timing-function: cubic-bezier(0.26, 0.53, 0.74, 1.48);
          animation-fill-mode: backwards;
        }

        /* --- Mission Section Specific Animations --- */
        .mission-title {
          opacity: 0;
          animation: fadeInUp 1s ease-out 0.2s forwards;
        }
        .mission-p1 {
          opacity: 0;
          animation: slideInLeft 0.8s ease-out 0.6s forwards;
        }
        .mission-tagline {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out 1.8s forwards;
        }

        /* --- Photo Columns Parallax Styles --- */
        .photo-columns {
          overflow: hidden;
          height: 400px;
          position: relative;
        }
        
        @media (min-width: 768px) {
          .photo-columns {
            height: 500px;
          }
        }
        
        @media (min-width: 1024px) {
          .photo-columns {
            height: 600px;
          }
        }
        
        .photo-column {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          transition: transform 0.1s ease-out;
          flex: 1;
        }
        
        @media (min-width: 768px) {
          .photo-column {
            gap: 1rem;
          }
        }
        
        .photo-column-reverse {
          flex-direction: column-reverse;
        }
        .photo-item {
          flex-shrink: 0;
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }
        
        @media (min-width: 768px) {
          .photo-item {
            border-radius: 1rem;
          }
        }
        
        .photo-item:hover {
          transform: scale(1.05);
        }
        .photo-item img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          display: block;
        }
        
        @media (min-width: 768px) {
          .photo-item img {
            height: 180px;
          }
        }
        
        @media (min-width: 1024px) {
          .photo-item img {
            height: 220px;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section
  className="relative h-screen bg-cover bg-left sm:bg-center bg-no-repeat pt-16"
  style={{ backgroundImage: "url(/hero-part111.png)" }}
>
        <div className="absolute inset-0 bg-black bg-opacity-0"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 lg:py-32 h-full flex items-center">
          <div className="max-w-2xl">
            <h1
              className="text-4xl sm:text-5xl md:text-5xl lg:text-8xl font-bold leading-tight mb-4 sm:mb-6"
              style={{ color: "#ffffffff" }}
            >
              Agrocare
              </h1>
             
              <h1
  className="text-1xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4 sm:mb-6"
  style={{ color: "#ffffffff" }}
>
  Nurturing Growth with AI
</h1>
              
            
            <p className="text-base sm:text-lg md:text-xl text-black leading-relaxed mb-6 sm:mb-8 max-w-lg" style={{ color: "#e9e9e9ff" }}>
              Revolutionizing agriculture for a sustainable future. Empowering farmers with intelligent plant care.
            </p>
            <button className="group bg-white text-green-800 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
              Get Started
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Mission Section and Parallax Photos */}
      <section className="py-12 sm:py-16 md:py-20" style={{ backgroundColor: "#283618" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2
                  className="mission-title text-left mb-4 sm:mb-6"
                  style={{
                    fontFamily: '"Arial Black", Gadget, sans-serif',
                    fontSize: "clamp(24px, 5vw, 40px)",
                    letterSpacing: "-1.6px",
                    wordSpacing: "-2.6px",
                    color: "#f0ead2",
                    fontWeight: 400,
                    textDecoration: "rgb(68, 68, 68)",
                    fontStyle: "normal",
                    fontVariant: "small-caps",
                    textTransform: "capitalize",
                    lineHeight: "1.2",
                  }}
                >
                  Every leaf tells a story <br />
                  Agrocare helps you read it and act in time.
                </h2>
              </div>
              <div className="space-y-2 text-base sm:text-lg text-gray-700 leading-relaxed">
                <p
                  className="mission-p1 transition-colors duration-300 cursor-default text-left"
                  style={{
                    fontFamily: '"Arial", Gadget, sans-serif',
                    fontSize: "clamp(14px, 3vw, 18px)",
                    fontWeight: 400,
                    color: "#fefae0",
                    lineHeight: "1.8",
                  }}
                >
                  At{" "}
                  <span className="font-bold" style={{ color: "#b38a58" }}>
                    AgroCare
                  </span>
                  , we are dedicated to supporting the agriculture industry
                  through smart, user-friendly technology. Our AI-powered
                  platform delivers farmers and agricultural professionals
                  timely, practical insights for monitoring crop health. From
                  identifying diseases in early stages to providing targeted
                  treatment guidance, help increase harvests, minimize crop
                  losses, and promote sustainable farming practices for the
                  future.
                </p>
                <div className="flex items-center gap-2 text-green-600 font-semibold pt-4 mission-tagline justify-start">
                  <Leaf className="w-5 h-5 sm:w-6 sm:h-6 hover:rotate-12 hover:scale-110 transition-transform duration-300 ease-in-out" />
                  <span className="text-base sm:text-lg md:text-xl hover:scale-105 transition-transform duration-200 ease-in-out cursor-default">
                    Growing smarter. Farming better. Together.
                  </span>
                </div>
              </div>
            </div>

            {/* Right Photo Columns */}
            <div className="photo-columns">
              <div className="flex gap-2 sm:gap-4 md:gap-6 h-full">
                {/* Column 1 - Reverse */}
                <div className="photo-column photo-column-reverse">
                  <div className="photo-item">
                    <img
                      src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600"
                      alt="Farmer in field"
                    />
                  </div>
                  <div className="photo-item">
                    <img
                      src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600"
                      alt="Green crops"
                    />
                  </div>
                  <div className="photo-item">
                    <img
                      src="https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=600"
                      alt="Plant seedlings"
                    />
                  </div>
                  <div className="photo-item">
                    <img
                      src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600"
                      alt="Tomato plants"
                    />
                  </div>
                  <div className="photo-item">
                    <img
                      src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600"
                      alt="Farm landscape"
                    />
                  </div>
                </div>
                {/* Column 2 - Normal */}
                <div className="photo-column">
                  <div className="photo-item">
                    <img
                      src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600"
                      alt="Vegetable garden"
                    />
                  </div>
                  <div className="photo-item">
                    <img
                      src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=600"
                      alt="Fresh vegetables"
                    />
                  </div>
                  <div className="photo-item">
                    <img
                      src="https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=600"
                      alt="Greenhouse plants"
                    />
                  </div>
                  <div className="photo-item">
                    <img
                      src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=600"
                      alt="Plant care"
                    />
                  </div>
                  <div className="photo-item">
                    <img
                      src="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600"
                      alt="Herbs growing"
                    />
                  </div>
                </div>
                {/* Column 3 - Reverse */}
                <div className="photo-column photo-column-reverse">
                  <div className="photo-item">
                    <img
                      src="https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=600"
                      alt="Farmer working"
                    />
                  </div>
                  <div className="photo-item">
                    <img
                      src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600"
                      alt="Garden tools"
                    />
                  </div>
                  <div className="photo-item">
                    <img
                      src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600"
                      alt="Plant growth"
                    />
                  </div>
                  <div className="photo-item">
                    <img
                      src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600"
                      alt="Crop field"
                    />
                  </div>
                  <div className="photo-item">
                    <img
                      src="https://images.unsplash.com/photo-1500651230379-4fa0c37fbafd?w=600"
                      alt="Indoor plants"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll-Snapping Services Section */}
      <ScrollServices servicesData={servicesData} />

      <StatsSection servicesData={servicesData} />

      {/* CTA Section */}
      <section
        className="relative py-16 sm:py-20 md:py-24 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/hero-part2.png)" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Enhancing Crop Health
            <br />
            and Productivity
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto">
            Discover how AgroCare can help you optimize your practice and
            achieve better yields
          </p>
          <button className="group bg-white text-orange-600 px-8 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2 sm:gap-3 mx-auto">
            Learn More
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
      
      <>
      {isMobile ? <MobileChatPage /> : <ChatBot />}
    </>

      {/* Plant Gallery Carousel */}
      <section style={{ backgroundColor: "#283618" }}>
        <Carousel />
      </section>
    </div>
  );
};

export default HomePage;