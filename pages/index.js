import React, { useEffect } from "react";
import { Leaf, Bug, BarChart3, Store, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

const HomePage = () => {
  useEffect(() => {
    // Horizontal scroll animation for services
    const $sectionPin = document.querySelector("#sectionPin");
    const $pinWrapSticky = document.querySelector(".pin-wrap-sticky");
    const $pinWrap = document.querySelector(".pin-wrap");

    if ($sectionPin && $pinWrapSticky && $pinWrap) {
      $sectionPin.style.height = "500vh";
      $sectionPin.style.overflow = "visible";

      $pinWrapSticky.style.height = "100vh";
      $pinWrapSticky.style.width = "100vw";
      $pinWrapSticky.style.position = "sticky";
      $pinWrapSticky.style.top = "0";
      $pinWrapSticky.style.overflowX = "hidden";

      $pinWrap.style.height = "100vh";
      $pinWrap.style.width = "500vw"; // 5 sections (title + 4 cards)

      if (typeof ViewTimeline !== "undefined") {
        $pinWrap.animate(
          {
            transform: ["", "translateX(calc(-100% + 100vw))"],
          },
          {
            timeline: new ViewTimeline({
              subject: $sectionPin,
              axis: "block",
            }),
            fill: "forwards",
            rangeStart: "contain 0%",
            rangeEnd: "contain 100%",
          }
        );
      } else {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const scrollProgress = entry.intersectionRatio;
                const translateX = -400 * scrollProgress;
                $pinWrap.style.transform = `translateX(${translateX}vw)`;
              }
            });
          },
          { threshold: Array.from({ length: 101 }, (_, i) => i / 100) }
        );

        observer.observe($sectionPin);
      }
    }

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
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }
        .animate-leaf-bounce {
          animation: leafBounce 2s ease-in-out infinite;
        }
        .animate-text-glow {
          animation: textGlow 3s ease-in-out infinite;
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

        /* Plant ID Card Full Image Cover */
        .plant-id-wrapper {
          position: relative;
          height: 400px;
          width: 600px;
          margin: 0 auto;
          overflow: hidden;
          border-radius: 1rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          cursor: pointer;
        }
        .plant-id-image {
          width: 100%;
          height: 100%;
          object-fit: contain; /* fits full image without cutting edges */
          transition: transform 0.5s ease-in-out;
        }
        .plant-id-wrapper:hover .plant-id-image {
          transform: scale(2);
        }
        .plant-id-overlay {
          position: absolute;
          top: 50%;
          right: 10%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.4);
          padding: 1.5rem;
          border-radius: 0.75rem;
          max-width: 250px;
        }
        .plant-id-title {
          color: #ffffff;
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 1rem;
          text-align: left;
        }
        .plant-id-description {
          color: #f3f4f6;
          font-size: 16px;
          line-height: 1.5;
          text-align: left;
        }
      `}</style>

      {/* Hero Section */}
      <section
        className="relative h-screen bg-cover bg-center bg-no-repeat"
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

      {/* Horizontal Scroll Services Section */}
      <section id="sectionPin" className="py-20 bg-white-50">
        <div className="pin-wrap-sticky">
          <div className="pin-wrap flex items-center">
            <div className="w-screen h-full flex items-center justify-center px-6">
              <h2 className="text-4xl font-bold text-green-800 text-center">
                Our Services
              </h2>
            </div>
            {/* Plant Identification Card with Hover Effect */}
            <div className="w-screen h-full flex items-center justify-center px-16">
              <div className="relative flex h-[300px] w-[600px] transition-all duration-200 ease-in-out group">
                {/* Image Wrapper */}
                <div className="h-[300px] w-[450px] overflow-hidden rounded-xl cursor-pointer transition-all duration-200 ease-in-out group-hover:w-[800px]">
                  <img
                    src="/plantidentification-card.png"
                    alt="Plant Identification"
                    className="h-[300px] w-[450px] object-contain transition-all duration-200 ease-in-out group-hover:scale-150"
                  />
                </div>

                {/* Text Overlay */}
                <div className="absolute left-[380px] h-[300px] w-[300px] flex flex-col overflow-hidden transition-all duration-200 ease-in-out">
                  <h1 className="relative bottom-0 h-[300px] text-green-800 text-[48px] font-bold uppercase leading-tight transition-all duration-200 ease-in-out group-hover:bottom-[300px] group-hover:scale-[0.5]">
                    Plant ID
                  </h1>
                  <h1 className="relative bottom-0 h-[300px] text-gray-700 text-[36px] font-semibold transition-all duration-200 ease-in-out group-hover:bottom-[300px] group-hover:scale-[0.5]">
                    See More
                  </h1>
                </div>
              </div>
            </div>

            {/* Disease Diagnosis */}
            <div className="w-screen h-full flex items-center justify-center px-16">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-md mx-auto">
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Bug className="w-8 h-8 text-amber-700" />
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-4 text-center">
                  Disease
                  <br />
                  Diagnosis
                </h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  Detect diseases before they spread. With just a photo, our AI
                  can identify common crop diseases and alert you to early signs
                  of trouble. Prevent loss, protect your harvest, and act fast
                  with science-backed solutions.
                </p>
              </div>
            </div>
            {/* Dashboard */}
            <div className="w-screen h-full flex items-center justify-center px-16">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-md mx-auto">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <BarChart3 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-4 text-center">
                  Dashboard
                </h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  Track daily plant health, view real-time weather updates, and
                  get AI-powered care suggestions. Monitor your personal plant
                  collection and receive timely alerts to keep every plant
                  thriving.
                </p>
              </div>
            </div>
            {/* Marketplace */}
            <div className="w-screen h-full flex items-center justify-center px-16">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-md mx-auto">
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Store className="w-8 h-8 text-amber-700" />
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-4 text-center">
                  Marketplace
                </h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  Find trusted tools, seeds, fertilizers, and plant care
                  products all in one place. Curated by experts and tried by
                  fellow farmers, our marketplace ensures you get quality,
                  affordable farming essentials.
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
