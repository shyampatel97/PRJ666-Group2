// import React from "react";
// // Lucide icons are passed via props, so they don't need to be imported here.

// /**
//  * @typedef {object} ServiceItem
//  * @property {string} id - Unique identifier
//  * @property {string} title - Service title
//  * @property {React.ComponentType} icon - Lucide-react icon component (e.g., Search, Stethoscope)
//  * @property {string} bgColor - Background color (CSS value)
//  * @property {string} textColor - Text color (CSS value)
//  * @property {string} image - Image URL
//  * @property {string[]} content - List of features/content points
//  */

// /**
//  * Individual section representing one service. It snaps to occupy the full viewport height.
//  * @param {{ service: ServiceItem }} props
//  */
// const ServiceSection = ({ service }) => {
//   // Use a calculated padding top to account for the sticky Navbar.
//   // We use pt-20 to ensure content is below the main page's navigation bar.
//   const paddingTop = "pt-20";

//   return (
//     // The snap-start class is crucial for vertical scroll snapping on the main page.
//     // Added py-3 for 12px vertical padding (top and bottom spacing between sections)
//     <section
//       id={service.id}
//       className={`relative w-full snap-start transition-colors duration-500`}
//       style={{
//         height: "100vh",
//         padding: "5px 0",
//       }}
//     >
//       <div
//         className={`w-full h-full flex items-center ${paddingTop} p-4 sm:p-6 lg:p-8 rounded-3xl sm:rounded-[40px] lg:rounded-[50px] shadow-2xl`}
//         style={{ 
//           backgroundColor: service.bgColor,
//           color: service.textColor,
//           fontFamily: '"Open Sans", sans-serif',
//           fontOpticalSizing: "auto",
//           fontWeight: 500,
//           fontStyle: "normal",
//           fontVariationSettings: '"wdth" 100',
//         }}
//       >
//         {/* Left Content (Text and Features) - Left-aligned with proper spacing */}
//         <div className="flex flex-col items-start text-left space-y-4 sm:space-y-6 md:space-y-8 max-w-4xl w-full pl-8 sm:pl-12 md:pl-16 lg:pl-20 xl:pl-24 pr-8">
//           <div className="flex flex-col items-start w-full">
//             {/* Title with each word on a new line */}
//             <h2
//               className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight"
//               style={{
//                 lineHeight: "1.1",
//                 display: "flex",
//                 flexDirection: "column",
//               }}
//             >
//               {service.title.split(' ').map((word, index) => (
//                 <span key={index}>{word}</span>
//               ))}
//             </h2>
//           </div>

//           {/* Content List - Adjusted base size and spacing for better mobile readability */}
//           <ul className="space-y-2 sm:space-y-3 text-base sm:text-lg lg:text-xl max-w-2xl">
//             {service.content.map((item, index) => (
//               <li key={index} className="flex items-start space-x-2 sm:space-x-3">
//                 <span className="leading-relaxed text-left">{item}</span>
//               </li>
//             ))}
//           </ul>

//           {/* Call to Action Button - Centered on mobile, left-aligned on desktop */}
//           <button
//             className="mt-6 px-8 py-4 rounded-full font-bold text-lg shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] self-center lg:self-start"
//             style={{
//               backgroundColor: service.textColor,
//               color: service.bgColor,
//             }}
//           >
//             Discover Now
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// /**
//  * Main component to host the vertically snapping full-screen service sections.
//  * @param {{ servicesData: ServiceItem[] }} props
//  */
// const ScrollServices = ({ servicesData }) => {
//   return (
//     // The main container applies the snap-y property to enable vertical scrolling and snapping
//     // for all child sections within the main page scroll.
//     <div
//       className="snap-y snap-mandatory" // Apply snapping to the parent element for the page scroll to use
//       style={{
//         backgroundColor: "#ffffff", // White background color
//         scrollBehavior: "smooth",
//       }}
//     >
//       {/* Section Title - Renders once before the snapping sections start */}
//       <h1
//         className="text-4xl lg:text-5xl font-bold text-center py-16"
//         style={{
//           color: "#283618",
//           backgroundColor: "#ffffff",
//         }}
//       >
//         Explore Our AI-Driven Solutions
//       </h1>

//       {/* Render the separate full-height, snapping sections */}
//       {servicesData.map((service) => (
//         <ServiceSection key={service.id} service={service} />
//       ))}
//     </div>
//   );
// };

// export default ScrollServices;


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
 * @property {string} [buttonText] - Optional custom button text (defaults to "Discover Now")
 */

/**
 * Individual section representing one service. It snaps to occupy the full viewport height.
 * @param {{ service: ServiceItem }} props
 */
const ServiceSection = ({ service }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Use a calculated padding top to account for the sticky Navbar.
  // We use pt-20 to ensure content is below the main page's navigation bar.
  const paddingTop = "pt-20";

  return (
    // The snap-start class is crucial for vertical scroll snapping on the main page.
    // Added py-3 for 12px vertical padding (top and bottom spacing between sections)
    <section
      ref={sectionRef}
      id={service.id}
      className={`relative w-full snap-start transition-colors duration-500`}
      style={{
        height: "100vh",
        padding: "12px 0",
      }}
    >
      <div
        className={`w-full h-full flex items-center ${paddingTop} p-4 sm:p-6 lg:p-8 rounded-3xl sm:rounded-[40px] lg:rounded-[50px]`}
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
        {/* Left Content (Text and Features) - Left-aligned with proper spacing */}
        <div className="flex flex-col items-start text-left space-y-4 sm:space-y-6 md:space-y-8 max-w-4xl w-full pl-8 sm:pl-12 md:pl-16 lg:pl-20 xl:pl-24 pr-8">
          <div className="flex flex-col items-start w-full">
            {/* Title with each word on a new line */}
            <h2
              className="text-6xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight"
              style={{
                lineHeight: "1.1",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {service.title.split(' ').map((word, index) => (
                <span key={index}>{word}</span>
              ))}
            </h2>
          </div>

          {/* Content List - Animated on scroll */}
          <ul 
            className="space-y-2 sm:space-y-3 text-base sm:text-lg lg:text-xl max-w-2xl"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease-out 0.4s',
            }}
          >
            {service.content.map((item, index) => (
              <li key={index} className="flex items-start space-x-2 sm:space-x-3">
                <span className="leading-relaxed text-left opacity-60">{item}</span>
              </li>
            ))}
          </ul>

          {/* Call to Action Button - Animated on scroll */}
          <button
            className="mt-6 px-8 py-4 rounded-full font-bold text-lg shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] self-center lg:self-start"
            style={{
              backgroundColor: service.textColor,
              color: service.bgColor,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
              transition: 'all 0.6s ease-out 0.6s',
            }}
          >
            {service.buttonText || "Discover Now"}
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