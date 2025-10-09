// pages/identification.js - WITH SEARCH FUNCTIONALITY

import React, { useState, useEffect } from "react";
import {
  Upload,
  Camera,
  Loader2,
  Leaf,
  Info,
  CheckCircle,
  AlertCircle,
  Search,
  X,
} from "lucide-react";
import {
  Droplet,
  Sun,
  Heart,
  Lightbulb,
  Sparkles,
  Sprout,
  Bug,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ChatBot from "@/components/Chatbot";
import { motion, AnimatePresence } from "framer-motion";
import UnifiedUploadComponent from "@/components/UnifiedUploadComponent";

// --- ANIMATION VARIANTS ---
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.5 },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const detailVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 10, duration: 0.8 },
  },
};

// --- PlantCard Component ---
const PlantCard = ({ plant, isMainResult = false, index = 0, activeTab }) => {
  const [imageError, setImageError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  let images = [];
  if (plant.similar_images && plant.similar_images.length > 0) {
    images = plant.similar_images;
  }

  const hasValidImage = images.length > 0 && !imageError;
  const currentImage = hasValidImage ? images[currentImageIndex] : null;

  const handleImageError = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setImageError(true);
    }
  };

  const confidence = isMainResult ? plant.confidence : plant.probability;
  const confidenceColorClass = isMainResult ? "bg-green-700" : "bg-amber-600";
  const textClass = isMainResult ? "text-green-900" : "text-amber-800";

  return (
    <motion.div
      variants={cardVariants}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transform hover:translate-y-[-2px] transition-all duration-300 group flex h-auto items-stretch"
    >
      <div className="w-32 h-full bg-sand-100 relative flex-shrink-0">
        {hasValidImage && currentImage ? (
          <img
            src={currentImage.url}
            alt={plant.name || plant.identified_name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.10]"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-sand-100 to-sand-200 p-2">
            <div className="text-center">
              <Leaf className="w-7 h-7 text-sand-500 mx-auto mb-1" />
              <p className="text-[11px] text-sand-700 font-medium px-1 leading-tight">
                {plant.name || plant.identified_name || "Unknown"}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="p-3 bg-sand-50 flex flex-grow justify-between items-center min-h-[120px]">
        <div className="flex flex-col justify-center flex-grow pr-4">
          <h3 className="text-lg font-bold text-gray-800 leading-tight mb-2 truncate">
            {plant.name || plant.identified_name || "Alternative Match"}
          </h3>

          <div className="mb-2 flex items-center">
            <span className="text-xs font-semibold text-gray-500 mr-2">
              Category:
            </span>
            <span
              className={`bg-sand-200 ${textClass} px-3 py-0.5 rounded-full text-xs font-medium`}
            >
              {plant.category || activeTab}
            </span>
          </div>

          <div>
            <span className="text-xs text-gray-600 font-medium block mb-1">
              Match Confidence
            </span>
            <div className="w-full bg-sand-300 rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full transition-all duration-700 ${
                  isMainResult ? "bg-green-600" : "bg-amber-500"
                }`}
                style={{ width: `${confidence * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 self-center pl-4 border-l border-gray-100">
          <div
            className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl shadow-inner ${confidenceColorClass} transition-all duration-300 group-hover:scale-105`}
          >
            <span className="text-2xl font-extrabold text-white leading-none">
              {(confidence * 100).toFixed(0)}
            </span>
            <span className="text-xs font-semibold text-green-200 mt-0.5">
              MATCH %
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- PlantDetailsCard Component ---
const PlantDetailsCard = ({ details, loading, plantName }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-2xl p-12 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4 animate-pulse">
          <Loader2 className="w-8 h-8 animate-spin text-green-700" />
          <p className="text-xl font-semibold text-gray-600">
            Gathering Intelligence on{" "}
            <span className="font-bold text-green-700">
              {plantName || "this species"}
            </span>
            ...
          </p>
        </div>
      </div>
    );
  }

  if (!details) return null;

  return (
    <motion.div
      variants={detailVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto space-y-10"
    >
      <div className="bg-gradient-to-br from-green-800 to-green-950 rounded-3xl shadow-2xl p-12 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <h1 className="text-5xl font-extrabold">{plantName}</h1>
        </div>
        <p className="text-green-200 text-lg leading-relaxed mt-4 border-l-4 border-green-600 pl-4 transition-all duration-500">
          {details.description}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:items-stretch">
        <div className="lg:w-2/5 space-y-8 flex flex-col">
          <div className="bg-sand-50 rounded-3xl shadow-lg border border-sand-200 p-8 transform hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3 mb-4 border-b pb-3 border-sand-200">
              <div className="w-10 h-10 bg-sand-200 rounded-lg flex items-center justify-center shadow-inner">
                <Sprout className="w-6 h-6 text-green-800" />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900">
                Physical Characteristics
              </h2>
            </div>
            <div className="space-y-4">
              <div className="bg-white p-3 rounded-xl border border-sand-200 transition-all duration-300 hover:border-green-600">
                <span className="font-bold text-green-800 block mb-1 text-sm uppercase tracking-wider">
                  Leaves:
                </span>
                <p className="text-gray-700 leading-snug">
                  {details.appearance.leaves}
                </p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-sand-200 transition-all duration-300 hover:border-green-600">
                <span className="font-bold text-red-700 block mb-1 text-sm uppercase tracking-wider">
                  Flowers:
                </span>
                <p className="text-gray-700 leading-snug">
                  {details.appearance.flowers}
                </p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-sand-200 transition-all duration-300 hover:border-green-600">
                <span className="font-bold text-amber-700 block mb-1 text-sm uppercase tracking-wider">
                  Growth:
                </span>
                <p className="text-gray-700 leading-snug">
                  {details.appearance.growth}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-3xl shadow-lg border border-green-200 p-8 transform hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3 mb-4 border-b pb-3 border-green-200">
              <div className="w-10 h-10 bg-green-200 rounded-lg flex items-center justify-center shadow-inner">
                <Sun className="w-6 h-6 text-amber-700" />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900">
                Optimal Environment
              </h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              {details.ideal_conditions}
            </p>
          </div>
          <div className="bg-yellow-50 rounded-3xl shadow-lg border-2 border-yellow-300 p-8 transform hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3 mb-4 border-b pb-3 border-yellow-300">
              <div className="w-10 h-10 bg-yellow-200 rounded-lg flex items-center justify-center shadow-md">
                <Sparkles className="w-6 h-6 text-yellow-800 animate-bounce-slow" />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900">
                Fun Fact
              </h2>
            </div>
            <p className="text-gray-800 text-lg leading-relaxed italic">
              &ldquo;{details.fun_fact}&rdquo;
            </p>
          </div>
        </div>

        <div className="lg:w-3/5 space-y-8 flex flex-col">
          <div className="bg-rose-50 rounded-3xl shadow-lg border border-rose-200 p-8 transform hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3 mb-4 border-b pb-3 border-rose-200">
              <div className="w-10 h-10 bg-rose-200 rounded-lg flex items-center justify-center shadow-inner">
                <Heart className="w-6 h-6 text-rose-700" />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900">
                Why It is Loved
              </h2>
            </div>
            <ul className="space-y-3">
              {details.why_people_love_it.map((reason, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-3 bg-white p-4 rounded-xl border border-rose-100 transition-all duration-300 hover:bg-rose-100 transform hover:scale-[1.01] hover:shadow-sm"
                >
                  <span className="text-rose-500 text-2xl leading-none font-bold mt-1">
                    •
                  </span>
                  <span className="text-gray-700 text-base flex-1">
                    {reason}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 transform hover:shadow-2xl transition-shadow duration-300 flex-grow">
            <div className="flex items-center space-x-3 mb-4 border-b pb-3 border-gray-200">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shadow-inner">
                <Droplet className="w-6 h-6 text-blue-700" />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900">
                Essential Care Tips
              </h2>
            </div>
            <div className="space-y-4">
              {details.care_tips.map((tip, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-gray-50 rounded-2xl transition-all duration-300 border border-gray-100 hover:bg-blue-50 transform hover:scale-[1.01]"
                >
                  <div className="w-2 h-full bg-blue-500 rounded-full flex-shrink-0 mt-1 animate-fade-in"></div>
                  <div className="flex-1">
                    <h3 className="font-extrabold text-gray-900 mb-1 text-lg">
                      {tip.title}
                    </h3>
                    <p className="text-gray-700 text-base leading-snug">
                      {tip.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const IdentificationPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [identifying, setIdentifying] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Plants");
  const [searchQuery, setSearchQuery] = useState("");
  const [plantDetails, setPlantDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    const savedResult = sessionStorage.getItem('identificationResult');
    const savedImagePreview = sessionStorage.getItem('imagePreview');
    const savedPlantDetails = sessionStorage.getItem('plantDetails');
    
    if (savedResult) {
      setResult(JSON.parse(savedResult));
    }
    if (savedImagePreview) {
      setImagePreview(savedImagePreview);
    }
    if (savedPlantDetails) {
      setPlantDetails(JSON.parse(savedPlantDetails));
    }
  }, []);

  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.user) {
          setUser({
            id: data.user.id,
            email: data.user.email,
            first_name: data.user.first_name || data.user.name?.split(" ")[0],
            last_name:
              data.user.last_name ||
              data.user.name?.split(" ").slice(1).join(" "),
            profile_image_url: data.user.profile_image_url || data.user.image,
            location: data.user.location,
          });
        }
      })
      .catch((error) => {
        console.error("Auth error:", error);
      });
  }, []);

  const handleImageSelect = (file, previewUrl) => {
    setSelectedImage(file);
    setImagePreview(previewUrl);
    setResult(null);
    setError(null);
    setPlantDetails(null);
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "plant");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        return data.secure_url;
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      throw new Error("Image upload failed: " + error.message);
    }
  };

  const fetchPlantDetails = async (plantName) => {
    setLoadingDetails(true);
    try {
      const response = await fetch("/api/get-plant-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plantName }),
      });
      const data = await response.json();
      setPlantDetails(data.details);
      sessionStorage.setItem('plantDetails', JSON.stringify(data.details));
    } catch (error) {
      console.error("Error fetching plant details:", error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleSearchPlant = async (e) => {
    e?.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    if (!user) {
      setError("Please log in to search plants");
      return;
    }

    setIsSearching(true);
    setError(null);
    setShowSearchResults(true);

    try {
      const response = await fetch(
        `/api/search-plant?q=${encodeURIComponent(searchQuery.trim())}&limit=10&language=en`
      );

      if (!response.ok) {
        throw new Error("Plant search failed");
      }

      const searchData = await response.json();
      console.log("Search Results:", searchData);
      console.log("Results array:", searchData.results);
      console.log("Results length:", searchData.results?.length);
      console.log("Show search results state:", true);
      
      setSearchResults(searchData);
      setShowSearchResults(true); // Ensure it's set again after data arrives
      
    } catch (error) {
      console.error("Search error:", error);
      setError(error.message);
      setSearchResults(null);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectSearchResult = async (result) => {
    console.log("Selected search result:", result);
    setLoadingDetails(true);
    setShowSearchResults(false);
    setSearchQuery(""); // Clear the search
    
    try {
      // Use your existing OpenAI-based plant details endpoint
      console.log("Fetching plant details for:", result.name);
      
      const response = await fetch("/api/get-plant-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plantName: result.name }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch plant details");
      }

      const data = await response.json();
      console.log("Plant details received:", data);
      
      // Create a result object similar to identification result
      const searchResult = {
        identified: true,
        identified_name: result.name,
        species: result.name,
        category: activeTab,
        confidence: 1.0, // Search results are exact matches
        similar_images: result.thumbnail 
          ? [{ url: `data:image/jpeg;base64,${result.thumbnail}` }] 
          : [],
        alternative_suggestions: [],
        plant_details: {}
      };

      console.log("Setting result state:", searchResult);
      setResult(searchResult);
      sessionStorage.setItem('identificationResult', JSON.stringify(searchResult));
      
      // Set the detailed plant information from OpenAI
      console.log("Setting plant details:", data.details);
      setPlantDetails(data.details);
      sessionStorage.setItem('plantDetails', JSON.stringify(data.details));
      
    } catch (error) {
      console.error("Error loading plant details:", error);
      setError("Failed to load plant details: " + error.message);
    } finally {
      setLoadingDetails(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults(null);
    setShowSearchResults(false);
  };

  const handleIdentifyPlant = async () => {
    if (!selectedImage) return;

    if (!user) {
      setError("Please log in to identify plants");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const imageUrl = await uploadImage(selectedImage);

      setUploading(false);
      setIdentifying(true);

      const response = await fetch("/api/identify-plant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          image_url: imageUrl,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Plant identification failed");
      }

      const identificationResult = await response.json();
      setResult(identificationResult);
      sessionStorage.setItem('identificationResult', JSON.stringify(identificationResult));
      sessionStorage.setItem('imagePreview', imagePreview);

      if (
        identificationResult.identified &&
        identificationResult.identified_name
      ) {
        await fetchPlantDetails(identificationResult.identified_name);
      }

      console.log("Identification Result:", identificationResult);
    } catch (error) {
      setError(error.message);
    } finally {
      setUploading(false);
      setIdentifying(false);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setResult(null);
    setError(null);
    setPlantDetails(null);
  };

  const tabs = ["Plants", "Insects"];

  const getTabIcon = (tab) => {
    switch (tab) {
      case "Plants":
        return <Leaf className="w-5 h-5 mr-2" />;
      case "Insects":
        return <Bug className="w-5 h-5 mr-2" />;
      default:
        return null;
    }
  };

  const matchContainerStyle = { maxHeight: '540px' };

  return (
    <div className="min-h-screen bg-sand-50">
      <Navbar />

      <div className="px-4 py-12 md:px-6">
        <div className={`mx-auto ${result ? "lg:max-w-7xl" : "max-w-4xl"}`}>
          <header className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4 animate-fade-in-down">
              AI Species Identifier
            </h1>
            
          </header>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-8 bg-red-100 border-2 border-red-400 rounded-2xl p-5"
              >
                <div className="flex items-center space-x-4">
                  <AlertCircle className="w-6 h-6 text-red-700" />
                  <p className="text-red-800 font-semibold">{error}</p>
                </div>
              </motion.div>
            )}
            
            {loadingDetails && !result && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-8 bg-blue-100 border-2 border-blue-400 rounded-2xl p-5"
              >
                <div className="flex items-center space-x-4">
                  <Loader2 className="w-6 h-6 text-blue-700 animate-spin" />
                  <p className="text-blue-800 font-semibold">Loading plant details...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col lg:flex-row gap-8 mb-8">
            <motion.div
              initial={result ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 50,
                damping: 15,
                duration: 0.7,
              }}
              className={`w-full ${
                result ? "lg:w-1/2" : "lg:max-w-3xl lg:mx-auto"
              }`}
            >
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden h-auto">
                <div className="border-b border-gray-200 bg-sand-100">
                  <div className="flex">
                    {tabs.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-3 px-4 text-center font-semibold text-base transition-all duration-300 flex items-center justify-center ${
                          activeTab === tab
                            ? "text-green-800 border-b-4 border-green-700 bg-white shadow-inner"
                            : "text-gray-600 hover:text-green-700"
                        }`}
                      >
                        {getTabIcon(tab)}
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 lg:p-5">
                  <h2 className="text-xl font-bold text-gray-800 text-center mb-5">
                    {imagePreview
                      ? "Review & Identify"
                      : "Upload or Capture Photo"}
                  </h2>

                  {!user && (
                    <div className="bg-yellow-100 border border-yellow-300 rounded-2xl p-3 mb-4 animate-fade-in">
                      <div className="flex items-center space-x-2">
                        <Info className="w-5 h-5 text-yellow-700" />
                        <p className="text-yellow-800 text-sm font-medium">
                          Please <strong>log in</strong> to identify species and
                          save results to your history.
                        </p>
                      </div>
                    </div>
                  )}

                  <UnifiedUploadComponent
                    onImageSelect={handleImageSelect}
                    onClear={clearImage}
                    imagePreview={imagePreview}
                  />

                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <form onSubmit={handleSearchPlant} className="space-y-3">
                      <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-3 max-w-md mx-auto">
                        <div className="relative flex-1 w-full">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            placeholder={`Search ${activeTab.toLowerCase()} database by name...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => searchResults && setShowSearchResults(true)}
                            className="w-full pl-9 pr-9 py-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none transition-colors duration-300 text-sm"
                          />
                          {searchQuery && (
                            <button
                              type="button"
                              onClick={clearSearch}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <div className="flex space-x-2 w-full md:w-auto">
                          <button
                            type="submit"
                            disabled={isSearching || !user || !searchQuery.trim()}
                            className="flex-1 md:flex-none px-4 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg text-sm"
                          >
                            {isSearching ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Searching...</span>
                              </>
                            ) : (
                              <>
                                <Search className="w-4 h-4" />
                                <span>Search</span>
                              </>
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={handleIdentifyPlant}
                            disabled={
                              uploading || identifying || !user || !selectedImage
                            }
                            className="flex-1 md:flex-none px-4 py-2.5 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg text-sm"
                          >
                            {uploading || identifying ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span className="text-sm">
                                  {uploading ? "Uploading..." : "Analyzing..."}
                                </span>
                              </>
                            ) : (
                              <>
                                <Lightbulb className="w-4 h-4" />
                                <span>Identify</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Debug info - remove after testing */}
                      {searchResults && (
                        <div className="text-xs text-gray-500 text-center">
                          Debug: {searchResults.results?.length || 0} results, showSearchResults: {showSearchResults.toString()}
                        </div>
                      )}

                      <AnimatePresence>
                        {showSearchResults && searchResults && searchResults.results.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="max-w-md mx-auto"
                          >
                            <div className="w-full bg-white rounded-xl shadow-2xl border-2 border-green-200 max-h-96 overflow-y-auto">
                              <div className="sticky top-0 p-3 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50 z-10">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-bold text-gray-800 flex items-center">
                                    <Search className="w-4 h-4 mr-2 text-green-600" />
                                    Found {searchResults.total_results} result{searchResults.total_results !== 1 ? 's' : ''}
                                  </p>
                                  <button
                                    onClick={() => setShowSearchResults(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                              <div className="divide-y divide-gray-100">
                                {searchResults.results.map((result, index) => (
                                  <button
                                    key={index}
                                    onClick={() => handleSelectSearchResult(result)}
                                    disabled={loadingDetails}
                                    className="w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-200 flex items-center space-x-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    {result.thumbnail ? (
                                      <img
                                        src={`data:image/jpeg;base64,${result.thumbnail}`}
                                        alt={result.name}
                                        className="w-14 h-14 rounded-xl object-cover flex-shrink-0 border-2 border-gray-200 group-hover:border-green-400 transition-colors shadow-sm"
                                      />
                                    ) : (
                                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center flex-shrink-0 border-2 border-gray-200 group-hover:border-green-400 transition-colors">
                                        <Leaf className="w-7 h-7 text-green-600" />
                                      </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                      <p className="font-bold text-gray-900 truncate text-base group-hover:text-green-700 transition-colors">
                                        {result.name}
                                      </p>
                                      <p className="text-xs text-gray-500 truncate mt-0.5">
                                        <span className="font-medium">Match:</span> {result.matched_in}
                                        {result.matched_type !== 'entity_name' && (
                                          <span className="ml-1 px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded text-[10px] font-semibold uppercase">
                                            {result.matched_type === 'synonym' ? 'Synonym' : result.matched_type}
                                          </span>
                                        )}
                                      </p>
                                    </div>
                                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <div className="bg-green-600 rounded-full p-1.5">
                                        <CheckCircle className="w-4 h-4 text-white" />
                                      </div>
                                    </div>
                                  </button>
                                ))}
                              </div>
                              {searchResults.results_trimmed && (
                                <div className="p-3 bg-gray-50 border-t border-gray-200 text-center">
                                  <p className="text-xs text-gray-600">
                                    Showing top {searchResults.limit} results. Refine your search for more specific results.
                                  </p>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                        
                        {showSearchResults && searchResults && searchResults.results.length === 0 && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="max-w-md mx-auto"
                          >
                            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-5 text-center shadow-lg">
                              <AlertCircle className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
                              <h3 className="font-bold text-gray-800 mb-1">No Results Found</h3>
                              <p className="text-sm text-gray-700">
                                No plants found matching {searchQuery}
                              </p>
                              <p className="text-xs text-gray-600 mt-2">
                                Try searching by scientific name, common name, or synonyms.
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </form>
                  </div>
                </div>
              </div>

              {!result && (
                <div className="mt-6 bg-sand-100 border-2 border-sand-300 rounded-2xl p-5 animate-fade-in-up">
                  <h3 className="text-xl font-bold text-green-800 mb-3">
                    Tips for Optimal Identification
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-700">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-700 flex-shrink-0 mt-0.5" />
                      <span>
                        Ensure your subject{" "}
                        <strong>fills most of the frame</strong>.
                      </span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-700 flex-shrink-0 mt-0.5" />
                      <span>
                        Use <strong>soft, natural lighting</strong> — avoid
                        harsh shadows.
                      </span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-700 flex-shrink-0 mt-0.5" />
                      <span>
                        Capture <strong>distinctive features</strong> like
                        patterns or flowers.
                      </span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-700 flex-shrink-0 mt-0.5" />
                      <span>
                        Avoid blurry, distant, or heavily edited images.
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 50,
                  damping: 15,
                  duration: 0.7,
                }}
                className="w-full lg:w-1/2"
              >
                <div
                  className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col p-6 transition-all duration-300"
                  style={matchContainerStyle}
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-green-700 pb-2 flex-shrink-0">
                    Best Species Matches
                  </h2>

                  {result.identified && result.identified_name ? (
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex flex-col space-y-3 flex-grow"
                    >
                      <div>
                        <PlantCard
                          plant={result}
                          isMainResult={true}
                          activeTab={activeTab}
                        />
                      </div>

                      {result?.alternative_suggestions?.slice(0, 2).map((suggestion, index) => (
                        <div key={index}>
                          <PlantCard
                            plant={suggestion}
                            isMainResult={false}
                            index={index}
                            activeTab={activeTab}
                          />
                        </div>
                      ))}
                    </motion.div>
                  ) : (
                    <div className="bg-sand-50 rounded-2xl shadow-inner border border-gray-200 p-6 text-center animate-fade-in flex-grow flex flex-col justify-center items-center">
                      <div className="w-16 h-16 bg-sand-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-8 h-8 text-sand-700" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-1">
                        Species Not Identified
                      </h3>
                      <p className="text-gray-600 text-sm max-w-xs mx-auto">
                        The AI could not confidently match this image. Try a
                        clearer, closer photo or use the search bar.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 50,
                damping: 15,
                duration: 0.7,
                delay: 0.1,
              }}
              className="w-full mt-10"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-green-700 pb-2">
                Full Species Details
              </h2>
              <PlantDetailsCard
                details={plantDetails}
                loading={loadingDetails}
                plantName={result.identified_name}
              />
            </motion.div>
          )}

          <ChatBot />
        </div>
      </div>
    </div>
  );
};

export default IdentificationPage;