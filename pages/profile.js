// import { useState, useEffect } from "react";
// import { User, Mail, MapPin, ShoppingBag, BarChart3, Calendar, Edit3, LogOut, Plus, Trash2, Settings } from "lucide-react";

// // Mock Navbar component
// const Navbar = () => (
//   <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
//       <div className="flex items-center gap-2">
//         <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
//           <span className="text-white font-bold text-sm">A</span>
//         </div>
//         <span className="text-xl font-bold text-gray-900">AgroCare</span>
//       </div>
//       <div className="hidden md:flex items-center gap-8 text-gray-600">
//         <a href="#" className="hover:text-emerald-600 transition-colors">Home</a>
//         <a href="#" className="hover:text-emerald-600 transition-colors">Dashboard</a>
//         <a href="#" className="hover:text-emerald-600 transition-colors">Marketplace</a>
//         <a href="#" className="hover:text-emerald-600 transition-colors">Contact</a>
//       </div>
//     </div>
//   </nav>
// );

// export default function Profile() {
//   // Mock user data - replace with your actual state management
//   const [user, setUser] = useState({
//     id: "user123",
//     email: "john.farmer@example.com",
//     first_name: "John",
//     last_name: "Farmer",
//     role: "Agricultural Specialist",
//     description: "Passionate about sustainable farming practices and modern agricultural technology. Helping farmers optimize their crop yields through data-driven insights.",
//     profile_image_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face",
//     location: "California, USA",
//     stats: {
//       total_scans: 247,
//       last_scan: "2024-01-15T10:30:00Z"
//     }
//   });

//   const [marketplaceListings, setMarketplaceListings] = useState([
//     {
//       _id: "listing1",
//       title: "Organic Tomato Seeds - Premium Quality",
//       price: 24.99,
//       category: "Seeds",
//       images: ["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200&h=200&fit=crop"]
//     },
//     {
//       _id: "listing2", 
//       title: "Natural Fertilizer - 50kg Bags",
//       price: 89.99,
//       category: "Fertilizer",
//       images: ["https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop"]
//     },
//     {
//       _id: "listing3",
//       title: "Professional Garden Tools Set",
//       price: 156.50,
//       category: "Tools",
//       images: ["https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop"]
//     }
//   ]);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleUpdateProfile = () => {
//     console.log("Navigate to edit profile");
//   };

//   const handleLogout = async () => {
//     console.log("Logout user");
//   };

//   const handleEditListing = (listingId) => {
//     console.log("Edit listing:", listingId);
//   };

//   const handleDeleteListing = async (listingId) => {
//     if (!confirm("Are you sure you want to delete this listing?")) return;
    
//     setMarketplaceListings(listings => 
//       listings.filter(listing => listing._id !== listingId)
//     );
//   };

//   const handleCreateListing = () => {
//     console.log("Navigate to create listing");
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "Never";
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffTime = Math.abs(now - date);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//     if (diffDays === 1) return "Yesterday";
//     if (diffDays < 7) return `${diffDays} days ago`;
//     return date.toLocaleDateString("en-US", { 
//       month: 'short', 
//       day: 'numeric',
//       year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
//     });
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="flex items-center justify-center min-h-screen pt-20">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-2 border-emerald-200 border-t-emerald-600 mx-auto mb-4"></div>
//             <p className="text-gray-600 text-lg">Loading your profile...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="flex items-center justify-center min-h-screen pt-20">
//           <div className="text-center max-w-md mx-auto px-6">
//             <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <span className="text-red-600 text-2xl">⚠</span>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
//             <p className="text-gray-600 mb-6">{error}</p>
//             <button
//               onClick={() => window.location.reload()}
//               className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors font-medium"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <div className="flex items-center justify-center min-h-screen pt-20">
//           <div className="text-center max-w-md mx-auto px-6">
//             <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <User className="w-8 h-8 text-blue-600" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Please log in</h2>
//             <p className="text-gray-600 mb-6">You need to be logged in to view your profile.</p>
//             <button
//               onClick={() => console.log("Navigate to login")}
//               className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors font-medium"
//             >
//               Go to Login
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
      
//       {/* Hero Section - Enhanced for mobile */}
//       <div className="pt-16 sm:pt-20">
//         <div className="relative">
//           {/* Cover Image */}
//           <div className="h-32 sm:h-48 lg:h-56 relative overflow-hidden">
//             <div 
//               className="w-full h-full bg-cover bg-center"
//               style={{
//                 backgroundImage: "linear-gradient(135deg, rgba(16, 185, 129, 0.9), rgba(5, 150, 105, 0.8)), url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&h=400&fit=crop')"
//               }}
//             >
//               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
//             </div>
//           </div>
          
//           {/* Profile Section */}
//           <div className="relative px-4 sm:px-6 lg:px-8">
//             <div className="max-w-6xl mx-auto">
//               <div className="relative -mt-16 sm:-mt-20 pb-6 sm:pb-8">
//                 <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
//                   {/* Profile Image */}
//                   <div className="relative mx-auto sm:mx-0 mb-4 sm:mb-0">
//                     <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-2xl sm:rounded-3xl border-4 border-white shadow-xl overflow-hidden bg-white">
//                       <img
//                         src={user.profile_image_url}
//                         alt="Profile"
//                         className="w-full h-full object-cover"
//                         onError={(e) => {
//                           e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face";
//                         }}
//                       />
//                     </div>
//                     <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center">
//                       <div className="w-2 h-2 bg-white rounded-full"></div>
//                     </div>
//                   </div>
                  
//                   {/* Profile Info */}
//                   <div className="flex-1 text-center sm:text-left">
//                     <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
//                       {user.first_name} {user.last_name}
//                     </h1>
//                     <p className="text-emerald-600 text-base sm:text-lg font-semibold mb-2">
//                       {user.role}
//                     </p>
//                     <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl">
//                       {user.description}
//                     </p>
//                   </div>
                  
//                   {/* Action Button - Desktop */}
//                   <div className="hidden sm:flex gap-3">
//                     <button
//                       onClick={handleUpdateProfile}
//                       className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors font-medium"
//                     >
//                       <Edit3 className="w-4 h-4" />
//                       Edit Profile
//                     </button>
//                     <button
//                       onClick={() => console.log("Settings")}
//                       className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors font-medium"
//                     >
//                       <Settings className="w-4 h-4" />
//                       Settings
//                     </button>
//                   </div>
//                 </div>
                
//                 {/* Mobile Action Buttons */}
//                 <div className="flex sm:hidden gap-2 mt-6 justify-center">
//                   <button
//                     onClick={handleUpdateProfile}
//                     className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors font-medium text-sm"
//                   >
//                     <Edit3 className="w-4 h-4" />
//                     Edit Profile
//                   </button>
//                   <button
//                     onClick={() => console.log("Settings")}
//                     className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors font-medium text-sm"
//                   >
//                     <Settings className="w-4 h-4" />
//                     Settings
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Main Content */}
//         <div className="px-4 sm:px-6 lg:px-8 pb-8">
//           <div className="max-w-6xl mx-auto">
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
//               {/* Left Sidebar - Account Info & Stats */}
//               <div className="lg:col-span-1">
//                 <div className="space-y-6">
                  
//                   {/* Quick Stats Cards */}
//                   <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
//                     <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//                       <div className="flex items-center gap-3 mb-3">
//                         <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
//                           <BarChart3 className="w-5 h-5 text-emerald-600" />
//                         </div>
//                         <div>
//                           <h3 className="font-semibold text-gray-900">Total Scans</h3>
//                           <p className="text-2xl font-bold text-emerald-600">{user.stats?.total_scans || 0}</p>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//                       <div className="flex items-center gap-3 mb-3">
//                         <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
//                           <ShoppingBag className="w-5 h-5 text-blue-600" />
//                         </div>
//                         <div>
//                           <h3 className="font-semibold text-gray-900">Listings</h3>
//                           <p className="text-2xl font-bold text-blue-600">{marketplaceListings.length}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* Account Information */}
//                   <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
//                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
//                     <div className="space-y-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
//                           <Mail className="w-5 h-5 text-gray-600" />
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <p className="text-sm font-medium text-gray-900">Email</p>
//                           <p className="text-sm text-gray-600 truncate">{user.email}</p>
//                         </div>
//                       </div>
                      
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
//                           <MapPin className="w-5 h-5 text-gray-600" />
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <p className="text-sm font-medium text-gray-900">Location</p>
//                           <p className="text-sm text-gray-600">{user.location || "Not set"}</p>
//                         </div>
//                       </div>
                      
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
//                           <Calendar className="w-5 h-5 text-gray-600" />
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <p className="text-sm font-medium text-gray-900">Last Scan</p>
//                           <p className="text-sm text-gray-600">{formatDate(user.stats?.last_scan)}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Right Content - Marketplace Listings */}
//               <div className="lg:col-span-2">
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
//                   <div className="p-4 sm:p-6 border-b border-gray-100">
//                     <div className="flex items-center justify-between">
//                       <h2 className="text-xl font-semibold text-gray-900">My Marketplace Listings</h2>
//                       <button
//                         onClick={handleCreateListing}
//                         className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors font-medium text-sm"
//                       >
//                         <Plus className="w-4 h-4" />
//                         <span className="hidden sm:inline">New Listing</span>
//                         <span className="sm:hidden">Add</span>
//                       </button>
//                     </div>
//                   </div>
                  
//                   <div className="p-4 sm:p-6">
//                     {marketplaceListings.length === 0 ? (
//                       <div className="text-center py-12">
//                         <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                           <ShoppingBag className="w-8 h-8 text-gray-400" />
//                         </div>
//                         <h3 className="text-lg font-semibold text-gray-900 mb-2">No listings yet</h3>
//                         <p className="text-gray-600 mb-6 max-w-sm mx-auto">
//                           Start selling your agricultural products and reach more customers.
//                         </p>
//                         <button
//                           onClick={handleCreateListing}
//                           className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors font-medium"
//                         >
//                           Create Your First Listing
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="space-y-3">
//                         {marketplaceListings.map((listing) => (
//                           <div
//                             key={listing._id}
//                             className="flex items-center gap-4 p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors group"
//                           >
//                             {/* Product Image */}
//                             <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
//                               <img
//                                 src={listing.images?.[0] || "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=80&h=80&fit=crop"}
//                                 alt={listing.title}
//                                 className="w-full h-full object-cover"
//                                 onError={(e) => {
//                                   e.target.src = "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=80&h=80&fit=crop";
//                                 }}
//                               />
//                             </div>
                            
//                             {/* Product Info */}
//                             <div className="flex-1 min-w-0">
//                               <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate mb-1">
//                                 {listing.title}
//                               </h3>
//                               <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-600">
//                                 <span className="font-semibold text-emerald-600">${listing.price}</span>
//                                 <span className="text-gray-400">•</span>
//                                 <span className="bg-gray-100 px-2 py-1 rounded-lg text-xs">
//                                   {listing.category}
//                                 </span>
//                               </div>
//                             </div>
                            
//                             {/* Actions */}
//                             <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                               <button
//                                 onClick={() => handleEditListing(listing._id)}
//                                 className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center"
//                                 title="Edit listing"
//                               >
//                                 <Edit3 className="w-4 h-4" />
//                               </button>
//                               <button
//                                 onClick={() => handleDeleteListing(listing._id)}
//                                 className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center"
//                                 title="Delete listing"
//                               >
//                                 <Trash2 className="w-4 h-4" />
//                               </button>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Floating Action Button - Mobile */}
//       <div className="fixed bottom-6 right-6 sm:hidden z-40">
//         <button
//           onClick={handleLogout}
//           className="w-14 h-14 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors flex items-center justify-center"
//         >
//           <LogOut className="w-6 h-6" />
//         </button>
//       </div>
      
//       {/* Desktop Logout Button */}
//       <div className="hidden sm:block fixed bottom-6 right-6 z-40">
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors font-medium shadow-lg"
//         >
//           <LogOut className="w-4 h-4" />
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import { getSession } from "next-auth/react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [marketplaceListings, setMarketplaceListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Fetch user session and marketplace listings
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        // Get user session
        const sessionResponse = await fetch("/api/auth/session");
        const sessionData = await sessionResponse.json();

        console.log("Session response:", sessionData);

        if (sessionData && sessionData.user) {
          const userData = {
            id: sessionData.user.id,
            email: sessionData.user.email,
            first_name:
              sessionData.user.first_name ||
              sessionData.user.name?.split(" ")[0],
            last_name:
              sessionData.user.last_name ||
              sessionData.user.name?.split(" ").slice(1).join(" "),
            role: 
              sessionData.user.role,
            description: 
              sessionData.user.description,
            profile_image_url:
              sessionData.user.profile_image_url || sessionData.user.image,
            location: sessionData.user.location,
            stats: sessionData.user.stats,
          };
          // console.log(sessionData.user);
          // console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
          setUser(userData);

          try {
            console.log("Fetching marketplace listings...");

            // Your API doesn't need userId in URL since it uses session
            const listingsResponse = await fetch(
              `/api/marketplace/user-listings`,
              {
                method: "GET",
                credentials: "include", // Important for session cookies
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            console.log("Listings response status:", listingsResponse.status);

            if (listingsResponse.ok) {
              const listingsData = await listingsResponse.json();
              console.log("Listings data:", listingsData);

              if (listingsData.success) {
                // Your API returns 'listings', not 'data'
                setMarketplaceListings(listingsData.listings || []);
              } else {
                console.error("API error:", listingsData.message);
                setMarketplaceListings([]);
              }
            } else {
              const errorData = await listingsResponse.json().catch(() => ({}));
              console.error(
                "Response not ok:",
                listingsResponse.status,
                errorData
              );
              setMarketplaceListings([]);
            }
          } catch (listingsError) {
            console.error(
              "Error fetching marketplace listings:",
              listingsError
            );
            setMarketplaceListings([]);
          }
        } else {
          // No valid session - redirect to login
          console.log("No valid session found, redirecting to login");
          router.push("/login");
          return;
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load profile data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleUpdateProfile = () => {
    router.push("/profile/edit");
  };

  const handleLogout = async () => {
    try {
      // Use NextAuth signOut if available, otherwise clear localStorage
      if (typeof window !== "undefined") {
        const { signOut } = await import("next-auth/react");
        await signOut({ redirect: false });
      }

      // Clear any localStorage tokens as fallback
      localStorage.removeItem("token");
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      // Fallback: clear localStorage and redirect
      localStorage.removeItem("token");
      router.push("/");
    }
  };

  const handleEditListing = (listingId) => {
    router.push(`/marketplace/edit/${listingId}`);
  };

  const handleDeleteListing = async (listingId) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;

    try {
      const response = await fetch(`/api/marketplace/${listingId}`, {
        method: "DELETE",
        credentials: "include", // Use cookies instead of Authorization header
      });

      const data = await response.json();

      if (data.success) {
        setMarketplaceListings((listings) =>
          listings.filter((listing) => listing._id !== listingId)
        );
        alert("Listing deleted successfully!");
      } else {
        throw new Error(data.error || "Failed to delete listing");
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
      alert(`Failed to delete listing: ${error.message}`);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No user state (shouldn't happen due to redirect, but just in case)
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Please log in to view your profile.
            </p>
            <button
              onClick={() => router.push("/login")}
              className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Hero Section with Background Image */}
      <div
        className="relative h-24 md:h-36 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&h=400&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

        {/* Profile Photo positioned over the hero image */}
        <div className="absolute bottom-0 left-4 md:left-8 transform translate-y-1/2">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-green-600 overflow-hidden bg-white">
            <img
              src={
                user.profile_image_url ||
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face"
              }
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face";
              }}
            />
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="bg-gray-50 min-h-screen pt-16 md:pt-20 px-4 md:px-8 pb-6">
        <div className="max-w-7xl mx-auto">
          {/* Name and Title */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {user.first_name} {user.last_name}
            </h1>
            <p className="text-gray-600 text-base md:text-lg mb-2">
              {user.role}
            </p>
            <p className="text-gray-700 text-sm md:text-base">
              {user.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Left Column - Account Info and Stats */}
            <div className="lg:col-span-1 space-y-4 md:space-y-6">
              {/* Account Info */}
              <div className="bg-white rounded-xl md:rounded-2xl shadow-sm p-4 md:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 md:mb-4">
                  Account Info
                </h3>
                <div className="space-y-2 md:space-y-3">
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 text-gray-500 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <span className="text-gray-700 text-sm md:text-base break-all">
                      {user.email}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 text-gray-500 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                    <span className="text-gray-700 text-sm md:text-base">
                      {user.location || "Location not set"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-white rounded-xl md:rounded-2xl shadow-sm p-4 md:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 md:mb-4">
                  Stats
                </h3>
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        ></path>
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm md:text-base">
                      Marketplace Listings:
                    </span>
                    <span className="font-semibold text-gray-900 ml-auto text-sm md:text-base">
                      {marketplaceListings.length}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        ></path>
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm md:text-base">
                      Total Scans:
                    </span>
                    <span className="font-semibold text-gray-900 ml-auto text-sm md:text-base">
                      {user.stats?.total_scans || 0}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm md:text-base">
                      Last Crop Scan:
                    </span>
                    <span className="font-semibold text-gray-900 ml-auto text-sm md:text-base">
                      {formatDate(user.stats?.last_scan)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Marketplace Listings */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl md:rounded-2xl shadow-sm p-4 md:p-6">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                    Marketplace Listings
                  </h2>
                </div>

                {marketplaceListings.length === 0 ? (
                  <div className="text-center py-8 md:py-12">
                    <svg
                      className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-3 md:mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      ></path>
                    </svg>
                    <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">
                      No listings yet
                    </h3>
                    <p className="text-gray-500 mb-3 md:mb-4 text-sm md:text-base">
                      Start selling your products on the marketplace
                    </p>
                    <button
                      onClick={() => router.push("/essentials")}
                      className="bg-green-800 text-white px-4 py-2 md:px-6 md:py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium text-sm md:text-base"
                    >
                      Create First Listing
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 md:space-y-4">
                    {marketplaceListings.map((listing) => (
                      <div
                        key={listing._id}
                        className="flex items-center justify-between p-3 md:p-4 border border-gray-200 rounded-lg md:rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-3 md:space-x-4 flex-grow min-w-0">
                          <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                            <img
                              src={
                                listing.images?.[0] ||
                                "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=64&h=64&fit=crop"
                              }
                              alt={listing.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src =
                                  "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=64&h=64&fit=crop";
                              }}
                            />
                          </div>
                          <div className="flex-grow min-w-0">
                            <h3 className="font-semibold text-gray-900 text-sm md:text-lg truncate">
                              {listing.title}
                            </h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs md:text-sm text-gray-500">
                                ${listing.price}
                              </span>
                              <span className="text-xs md:text-sm text-gray-400">
                                • {listing.category}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-end md:items-center space-y-1 md:space-y-0 md:space-x-2 flex-shrink-0">
                          <button
                            onClick={() => handleEditListing(listing._id)}
                            className="bg-green-100 text-green-800 px-2 py-1 md:px-4 md:py-2 rounded-md md:rounded-lg text-xs md:text-sm font-medium hover:bg-green-200 transition-colors min-w-0"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteListing(listing._id)}
                            className="bg-red-100 text-red-800 px-2 py-1 md:px-4 md:py-2 rounded-md md:rounded-lg text-xs md:text-sm font-medium hover:bg-red-200 transition-colors min-w-0"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons Section */}
          <div className="mt-6 md:mt-8">
            {/* Mobile: Horizontal scrollable buttons */}
            <div className="block md:hidden">
              <div className="flex space-x-3 overflow-x-auto pb-2">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="bg-green-800 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium text-sm whitespace-nowrap flex-shrink-0"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleUpdateProfile}
                  className="bg-green-800 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium text-sm whitespace-nowrap flex-shrink-0"
                >
                  Update Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium text-sm whitespace-nowrap flex-shrink-0"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Desktop: Fixed bottom-left buttons */}
            <div className="hidden md:block">
              <div className="fixed bottom-6 left-8 flex space-x-4">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="bg-green-800 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium shadow-lg"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleUpdateProfile}
                  className="bg-green-800 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium shadow-lg"
                >
                  Update Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium shadow-lg"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}