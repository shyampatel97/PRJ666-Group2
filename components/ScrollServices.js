import React from "react";
// Lucide icons are passed via props, so they don't need to be imported here.

/**
 * @typedef {object} ServiceItem
 * @property {string} id - Unique identifier
 * @property {string} title - Service title
 * @property {React.ComponentType} icon - Lucide-react icon component (e.g., Search, Stethoscope)
 * @property {string} bgColor - Background color (CSS value)
 * @property {string} textColor - Text color (CSS value)
 * @property {string} image - Image URL
 * @property {string[]} content - List of features/content points
 */

/**
 * Individual section representing one service. It snaps to occupy the full viewport height.
 * @param {{ service: ServiceItem }} props
 */
const ServiceSection = ({ service }) => {
  // Use a calculated padding top to account for the sticky Navbar.
  // We use pt-20 to ensure content is below the main page's navigation bar.
  const paddingTop = "pt-20";

  return (
    // The snap-start class is crucial for vertical scroll snapping on the main page.
    <section
      id={service.id}
      className={`relative w-full flex items-center justify-center snap-start transition-colors duration-500`}
      style={{
        minHeight: "100vh",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <div
        className={`w-full h-full ${paddingTop} p-6 rounded-[50px] shadow-2xl`}
        style={{ 
          backgroundColor: service.bgColor,
          color: service.textColor,
          fontFamily: '"Open Sans", sans-serif',
          fontOpticalSizing: "auto",
          fontWeight: 500,
          fontStyle: "normal",
          fontVariationSettings: '"wdth" 100',
        }}
      >
        {/* Left Content (Text and Features) - Centered on mobile, left-aligned on desktop */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:w-1/2 space-y-6 md:space-y-8 max-w-7xl mx-auto w-full">
          <div className="flex items-center space-x-4">
            {/* FIXED TITLE SIZE with responsive classes */}
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight"
              style={{
                fontSize: "9rem", // roughly 3x the current 4xl (~2.25rem)
                lineHeight: "1.1",
              }}
            >
              {service.title}
            </h2>
          </div>

          {/* Content List - Adjusted base size and spacing for better mobile readability */}
          <ul className="space-y-3 text-base sm:text-lg lg:text-xl max-w-xl">
            {service.content.map((item, index) => (
              <li key={index} className="flex items-start space-x-3">
                <span className="leading-relaxed text-left">{item}</span>
              </li>
            ))}
          </ul>

          {/* Call to Action Button - Centered on mobile, left-aligned on desktop */}
          <button
            className="mt-6 px-8 py-4 rounded-full font-bold text-lg shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] self-center lg:self-start"
            style={{
              backgroundColor: service.textColor,
              color: service.bgColor,
            }}
          >
            Discover Now
          </button>
        </div>
      </div>
    </section>
  );
};

/**
 * Main component to host the vertically snapping full-screen service sections.
 * @param {{ servicesData: ServiceItem[] }} props
 */
const ScrollServices = ({ servicesData }) => {
  return (
    // The main container applies the snap-y property to enable vertical scrolling and snapping
    // for all child sections within the main page scroll.
    <div
      className="snap-y snap-mandatory" // Apply snapping to the parent element for the page scroll to use
      style={{
        backgroundColor: "#ffffff", // White background color
        scrollBehavior: "smooth",
      }}
    >
      {/* Section Title - Renders once before the snapping sections start */}
      <h1
        className="text-4xl lg:text-5xl font-bold text-center py-16"
        style={{
          color: "#283618",
          backgroundColor: "#ffffff",
        }}
      >
        Explore Our AI-Driven Solutions
      </h1>

      {/* Render the separate full-height, snapping sections */}
      {servicesData.map((service) => (
        <ServiceSection key={service.id} service={service} />
      ))}
    </div>
  );
};

export default ScrollServices;