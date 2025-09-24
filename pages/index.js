import React, { useEffect, useState } from "react";
import { Leaf, Bug, BarChart3, Store, ArrowRight, LeafIcon } from "lucide-react";
import Navbar from "@/components/Navbar";

const HomePage = () => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Reverse scroll animation for photo columns
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
    <div className="min-h-screen bg-white">
      <Navbar />
      <style jsx>{`
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
        @keyframes leafBounce {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-5px) rotate(-5deg);
          }
          75% {
            transform: translateY(-3px) rotate(5deg);
          }
        }
        @keyframes textGlow {
          0%,
          100% {
            text-shadow: 0 0 5px rgba(34, 197, 94, 0.3);
          }
          50% {
            text-shadow: 0 0 20px rgba(34, 197, 94, 0.6),
              0 0 30px rgba(34, 197, 94, 0.4);
          }
        }
        /* Animations from provided CSS */
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
        /* Updated Plant ID Card Styles */
        .plant-id-wrap {
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-between;
          width: 100%; 
          max-width: 800px;
          height: 500px;
          margin: 0 auto;
          border: 1px solid white; 
          border-radius: 20px;
          transition: 0.3s ease-in-out;
          position: relative;
          overflow: hidden;
        }
        .plant-id-overlay {
          position: relative;
          display: flex;
          width: 100%;
          height: 100%;
          padding: 1rem 0.75rem;
          background: #186218;
          transition: 0.4s ease-in-out;
          z-index: 1;
        }
        .plant-id-overlay-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;
          height: 500%;
          padding: 0.5rem 0 0 0.5rem;
          border: 3px solid;
          border-image: linear-gradient(
            to bottom,
            #aea724 5%,
            forestgreen 35% 65%,
            #aea724 95%
          ) 0 0 0 100%;
          transition: 0.3s ease-in-out 0.2s;
          z-index: 1;
        }
        .plant-id-image-content {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          transition: 0.3s ease-in-out;
        }
        .plant-id-dots {
          position: absolute;
          bottom: 50%;
          right: 1rem;
          transform: translateY(50%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 20px;
          height: 60px;
          transition: 0.3s ease-in-out 0.3s;
        }
        .plant-id-dot {
          width: 10px;
          height: 10px;
          background: yellow;
          border: 1px solid indigo;
          border-radius: 50%;
          margin: 5px 0;
          transition: 0.3s ease-in-out 0.3s;
        }
        .plant-id-text {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
          margin: 1rem;
          padding: 1.5rem;
          background: #fff;
          font-size: max(10pt, 2vmin);
          line-height: 1.5;
          color: #0e390e;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .plant-id-inset {
          max-width: 50%;
          margin: 0.25em 1em 1em 0;
          border-radius: 0.25em;
          float: left;
        }
        .plant-id-tree {
          place-self: center;
          width: calc(50px + 2vw);
        }
        .plant-id-wrap:hover .plant-id-overlay {
          transform: translateX(-500px);
        }
        .plant-id-wrap:hover .plant-id-image-content {
          width: 300px;
        }
        .plant-id-wrap:hover .plant-id-overlay-content {
          border: none;
          transition-delay: 0.2s;
          transform: translateX(500px);
        }
        .plant-id-wrap:hover .plant-id-dots {
          transform: translateY(50%) translateX(1rem);
        }
        .plant-id-wrap:hover .plant-id-dot {
          background: white;
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
            <h1 className="text-5xl lg:text-6xl font-bold text-black leading-tight mb-6">
              Smart Solutions
              <br />
              For Modern Farming
            </h1>
            <p className="text-xl text-white leading-relaxed mb-8 max-w-lg">
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

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h2
                  className="mission-title text-left mb-6"
                  style={{
                    fontFamily: '"Arial Black", Gadget, sans-serif',
                    fontSize: "40px",
                    letterSpacing: "-1.6px",
                    wordSpacing: "-2.6px",
                    color: "#000000",
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
                    color: "#4B5563",
                    lineHeight: "1.8",
                  }}
                >
                  At <span className="font-bold text-green-800">AgroCare</span>,
                  we are dedicated to supporting the agriculture industry
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

      {/* Services Section (Grid Layout) */}
      <section className="py-20 bg-white-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Plant Identification */}
            <div id="plant-identification-card" className="plant-id-wrap animate pop">
              <div id="plant-identification-overlay" className="plant-id-overlay">
                <div id="plant-identification-content" className="plant-id-overlay-content animate slide-left delay-2">
                  <h3 className="animate slide-left pop delay-4 text-xl font-bold text-white text-center">
                    Plant Identification
                  </h3>
                  <p
                    className="animate slide-left pop delay-5 text-xs md:text-sm text-white text-center"
                    style={{ marginBottom: "1.5rem" }}
                  >
                  </p>
                </div>
                <div className="plant-id-image-content animate slide delay-5">
                 <img
                    src="/plant-identify.JPG"
                    alt="Disease Diagnoses"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                    />
                </div>
                <div id="plant-identification-dots" className="plant-id-dots animate">
                  <div className="plant-id-dot animate slide-up delay-6"></div>
                  <div className="plant-id-dot animate slide-up delay-7"></div>
                  <div className="plant-id-dot animate slide-up delay-8"></div>
                </div>
              </div>
              <div id="plant-identification-text" className="plant-id-text text-justify">
                <p className="text-xs md:text-sm leading-relaxed mb-2">
                  Detect diseases before they spread. With just a photo, our AI
                  can identify common crop diseases and alert you to early signs
                  of trouble.
                </p>
                <p className="text-xs md:text-sm leading-relaxed mb-2">
                  Prevent loss, protect your harvest, and act fast with
                  science-backed solutions. Our platform empowers farmers with
                  precise plant identification.
                </p>
                <p className="text-xs md:text-sm leading-relaxed">
                  Built for ease, our tool ensures you can monitor crop health
                  effectively and sustainably.
                </p>
              </div>
            </div>

            {/* Disease Diagnosis */}
            <div id="disease-diagnosis-card" className="plant-id-wrap animate pop">
              <div id="disease-diagnosis-overlay" className="plant-id-overlay">
                <div id="disease-diagnosis-content" className="plant-id-overlay-content animate slide-left delay-2">
                  <h3 className="animate slide-left pop delay-4 text-xl font-bold text-white text-center">
                    Disease Diagnosis
                  </h3>
                  <p
                    className="animate slide-left pop delay-5 text-xs md:text-sm text-white text-center"
                    style={{ marginBottom: "1.5rem" }}
                  >
                  </p>
                </div>
                <div className="plant-id-image-content animate slide delay-5">
                <img
                    src="/disease-diagnoses.JPG"
                    alt="Disease Diagnoses"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                    />
                </div>
                <div id="disease-diagnosis-dots" className="plant-id-dots animate">
                  <div className="plant-id-dot animate slide-up delay-6"></div>
                  <div className="plant-id-dot animate slide-up delay-7"></div>
                  <div className="plant-id-dot animate slide-up delay-8"></div>
                </div>
              </div>
              <div id="disease-diagnosis-text" className="plant-id-text text-justify">
                <p className="text-xs md:text-sm leading-relaxed mb-2">
                  Detect diseases before they spread. Our AI analyzes photos to
                  identify crop diseases and provides early warnings.
                </p>
                <p className="text-xs md:text-sm leading-relaxed mb-2">
                  Take action quickly with expert recommendations to protect
                  your harvest and reduce losses.
                </p>
                <p className="text-xs md:text-sm leading-relaxed">
                  Designed for efficiency, ensuring timely and accurate
                  diagnostics for sustainable farming.
                </p>
              </div>
            </div>

            {/* Dashboard */}
            <div id="dashboard-card" className="plant-id-wrap animate pop">
              <div id="dashboard-overlay" className="plant-id-overlay">
                <div id="dashboard-content" className="plant-id-overlay-content animate slide-left delay-2">
                  <h3 className="animate slide-left pop delay-4 text-xl font-bold text-white text-center">
                    Dashboard
                  </h3>
                  <p
                    className="animate slide-left pop delay-5 text-xs md:text-sm text-white text-center"
                    style={{ marginBottom: "1.5rem" }}
                  >
                  </p>
                </div>
                <div className="plant-id-image-content animate slide delay-5">
                  <img
                    src="/dashboard.JPG"
                    alt="Disease Diagnoses"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                    />
                </div>
                <div id="dashboard-dots" className="plant-id-dots animate">
                  <div className="plant-id-dot animate slide-up delay-6"></div>
                  <div className="plant-id-dot animate slide-up delay-7"></div>
                  <div className="plant-id-dot animate slide-up delay-8"></div>
                </div>
              </div>
              <div id="dashboard-text" className="plant-id-text text-justify">
                <p className="text-xs md:text-sm leading-relaxed mb-2">
                  Track plant health daily with real-time updates and AI
                  insights.
                </p>
                <p className="text-xs md:text-sm leading-relaxed mb-2">
                  Receive weather forecasts and care suggestions to optimize
                  your farming practices.
                </p>
                <p className="text-xs md:text-sm leading-relaxed">
                  Stay informed with alerts to keep your plants thriving
                  sustainably.
                </p>
              </div>
            </div>

            {/* Marketplace */}
            <div id="marketplace-card" className="plant-id-wrap animate pop">
              <div id="marketplace-overlay" className="plant-id-overlay">
                <div id="marketplace-content" className="plant-id-overlay-content animate slide-left delay-2">
                  <h3 className="animate slide-left pop delay-4 text-xl font-bold text-white text-center">
                    Marketplace
                  </h3>
                  <p
                    className="animate slide-left pop delay-5 text-xs md:text-sm text-white text-center"
                    style={{ marginBottom: "1.5rem" }}
                  >
                  </p>
                </div>
                <div className="plant-id-image-content animate slide delay-5">
                  <img
                    src="/marketplace.JPG"
                    alt="Disease Diagnoses"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                    />
                </div>
                <div id="marketplace-dots" className="plant-id-dots animate">
                  <div className="plant-id-dot animate slide-up delay-6"></div>
                  <div className="plant-id-dot animate slide-up delay-7"></div>
                  <div className="plant-id-dot animate slide-up delay-8"></div>
                </div>
              </div>
              <div id="marketplace-text" className="plant-id-text text-justify">
                <p className="text-xs md:text-sm leading-relaxed mb-2">
                  Discover trusted tools, seeds, and fertilizers in one place.
                </p>
                <p className="text-xs md:text-sm leading-relaxed mb-2">
                  Curated by experts and tested by farmers for quality and
                  affordability.
                </p>
                <p className="text-xs md:text-sm leading-relaxed">
                  Support sustainable farming with community-driven products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
    </div>
  );
};

export default HomePage;