// index.js (Your Main Page File)

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap"; // Keep gsap for the parallax effect
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
// 1. Import the new component
import ScrollServices from "@/components/ScrollServices"; // Adjust path as needed

// Define service data with Icon component references
const servicesData = [
  {
    id: "plant-identification",
    title: "Plant Identification",
    icon: Search, // Include the component reference
    bgColor: "#f0ead2",
    textColor: "#283618",
    image: "/plant-identify.JPG",
    content: [
      "Instantly identify any plant with a photo using our AI-powered recognition engine. Get comprehensive details, care tips, and potential issues for thousands of species. Expand your botanical knowledge and ensure every plant thrives.",
    ],
  },
  {
    id: "disease-diagnosis",
    title: "Disease Diagnosis",
    icon: Stethoscope, // Include the component reference
    bgColor: "#283618",
    textColor: "#f0ead2",
    image: "/disease-diagnoses.JPG",
    content: [
      "Detect diseases early by analyzing photo submissions of affected plants. Receive an accurate diagnosis and recommended organic treatment plans. Minimize crop loss and act fast with science-backed solutions.",
    ],
  },
  {
    id: "dashboard",
    title: "Smart Dashboard",
    icon: Monitor, // Include the component reference
    bgColor: "#dda15e",
    textColor: "#283618",
    image: "/dashboard.JPG",
    content: [
      "Track plant health daily with real-time updates and personalized AI insights. Monitor environmental conditions, track your activity, and manage your tasks. Optimize your farming practices for peak efficiency and better yields."
    ],
  },
  {
    id: "marketplace",
    title: "Curated Marketplace",
    icon: ShoppingCart, // Include the component reference
    bgColor: "#bc6c25",
    textColor: "#fefae0",
    image: "/marketplace.JPG",
    content: [
      "Find trusted tools, organic seeds, and sustainable fertilizers in one place. Products are curated by experts and tested by farmers for quality and reliability. Support ethical farming and make responsible purchases easily."
    ],
  },
];

const HomePage = () => {
  // Parallax animation logic remains here
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

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#283618" }}>
      <Navbar />

      {/* Existing CSS styles for mission/parallax section */}
      <style jsx>{`
        /* --- Animation Keyframes (Parallax/Mission) --- */
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
        @keyframes pop {
          0% {
            opacity: 0;
            transform: scale(0.5, 0.5);
          }
          100% {
            opacity: 1;
            transform: scale(1, 1);
          }
        }
        @keyframes slide-left {
          0% {
            opacity: 0;
            transform: translate(-40px, 0);
          }
          100% {
            opacity: 1;
            transform: translate(0, 0);
          }
        }
        @keyframes slide-up {
          0% {
            opacity: 0;
            transform: translateY(3em);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* --- Animation Utility Classes --- */
        .animate {
          animation-duration: 0.7s;
          animation-timing-function: cubic-bezier(0.26, 0.53, 0.74, 1.48);
          animation-fill-mode: backwards;
        }
        .pop {
          animation-name: pop;
        }
        .slide-left {
          animation-name: slide-left;
        }
        .slide-up {
          animation-name: slide-up;
        }
        .delay-2 {
          animation-delay: 0.6s;
        }
        .delay-4 {
          animation-delay: 1.2s;
        }
        .delay-5 {
          animation-delay: 1.5s;
        }
        .delay-6 {
          animation-delay: 1.8s;
        }
        .delay-7 {
          animation-delay: 2.1s;
        }
        .delay-8 {
          animation-delay: 2.4s;
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
        .mission-p2 {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out 1s forwards;
        }
        .mission-p3 {
          opacity: 0;
          animation: slideInLeft 0.8s ease-out 1.4s forwards;
        }
        .mission-tagline {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out 1.8s forwards;
        }

        /* --- Photo Columns Parallax Styles --- */
        .photo-columns {
          overflow: hidden;
          height: 600px;
          position: relative;
        }
        .photo-column {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: transform 0.1s ease-out;
          flex: 1;
        }
        .photo-column-reverse {
          flex-direction: column-reverse;
        }
        .photo-item {
          flex-shrink: 0;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }
        .photo-item:hover {
          transform: scale(1.05);
        }
        .photo-item img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          display: block;
        }
      `}</style>

      {/* Hero Section */}
      <section
        className="relative h-screen bg-cover bg-center bg-no-repeat pt-16"
        style={{ backgroundImage: "url(/hero-part1.png)" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-0"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32 h-full flex items-center">
          <div className="max-w-2xl">
            <h1
              className="text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ color: "#582f0e" }}
            >
              Smart Solutions
              <br />
              For Modern Farming
            </h1>
            <p className="text-xl text-black leading-relaxed mb-8 max-w-lg">
              Empowering farmers with AI-driven tools for crop management and
              disease identification
            </p>
            <button className="group bg-white text-green-800 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Mission Section and Parallax Photos */}
      <section className="py-20" style={{ backgroundColor: "#283618" }}>
        {/* ... (Mission and Photo Column markup remains the same) ... */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Title and paragraph content */}
              <div>
                <h2
                  className="mission-title text-left mb-6"
                  style={{
                    fontFamily: '"Arial Black", Gadget, sans-serif',
                    fontSize: "40px",
                    letterSpacing: "-1.6px",
                    wordSpacing: "-2.6px",
                    color: "#f0ead2",
                    fontWeight: 400,
                    textDecoration: "rgb(68, 68, 68)",
                    fontStyle: "normal",
                    fontVariant: "small-caps",
                    textTransform: "capitalize",
                  }}
                >
                  Every leaf tells a story <br />
                  Agrocare helps you read it and act in time.
                </h2>
              </div>
              <div className="space-y-2 text-lg text-gray-700 leading-relaxed">
                <p
                  className="mission-p1 transition-colors duration-300 cursor-default text-left"
                  style={{
                    fontFamily: '"Arial", Gadget, sans-serif',
                    fontSize: "18px",
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
                  <Leaf className="w-6 h-6 hover:rotate-12 hover:scale-110 transition-transform duration-300 ease-in-out" />
                  <span className="text-xl hover:scale-105 transition-transform duration-200 ease-in-out cursor-default">
                    Growing smarter. Farming better. Together.
                  </span>
                </div>
              </div>
            </div>

            {/* Right Photo Columns */}
            <div className="photo-columns">
              <div className="flex gap-6 h-full">
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

      {/* --- SCROLL-SNAPPING SERVICES SECTION (Component) --- */}
      <ScrollServices servicesData={servicesData} />
      {/* --- END SCROLL-SNAPPING SERVICES SECTION --- */}

      {/* CTA Section */}
      <section
        className="relative py-24 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/hero-part2.png)" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Enhancing Crop Health
            <br />
            and Productivity
          </h2>
          <p className="text-xl text-white mb-10 leading-relaxed max-w-2xl mx-auto">
            Discover how AgroCare can help you optimize your practice and
            achieve better yields
          </p>
          <button className="group bg-white text-orange-600 px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto">
            Learn More
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Plant Gallery Carousel */}
      <section style={{ backgroundColor: "#283618" }}>
        <Carousel />
      </section>
    </div>
  );
};

export default HomePage;
