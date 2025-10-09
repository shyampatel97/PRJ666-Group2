// pages/identification.js - REVISED FOR SMALLER, EQUAL-HEIGHT MATCH CARDS AND DYNAMIC RIGHT COLUMN HEIGHT

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

// --- ANIMATION VARIANTS (Keeping existing for consistency) ---
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

// ... (UnifiedUploadComponent remains the same - code omitted for brevity)
const UnifiedUploadComponent = ({ onImageSelect, onClear, imagePreview }) => {
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      setStream(mediaStream);
      setShowCamera(true);

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      }, 100);
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert(
        "Unable to access camera. Please check permissions or upload a file instead."
      );
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], `camera-capture-${Date.now()}.jpg`, {
            type: "image/jpeg",
          });

          const previewUrl = URL.createObjectURL(blob);
          onImageSelect(file, previewUrl);
          stopCamera();
        }
      },
      "image/jpeg",
      0.9
    );
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      onImageSelect(file, previewUrl);
    }
  };

  React.useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  if (showCamera) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
        <div className="relative w-full h-full max-w-4xl max-h-4xl">
          <button
            onClick={stopCamera}
            className="absolute top-4 right-4 z-10 w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white backdrop-blur-sm hover:bg-opacity-30 transition-all"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="w-full h-full flex flex-col items-center justify-center">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-contain rounded-xl shadow-2xl"
              style={{ maxHeight: "calc(100vh - 120px)" }}
            />

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <button
                onClick={capturePhoto}
                className="w-20 h-20 border-4 border-white bg-green-800 rounded-full flex items-center justify-center shadow-xl hover:bg-green-700 transition-colors duration-300"
              >
                <Camera className="w-8 h-8 text-white" />
              </button>
            </div>

            <div className="absolute top-4 left-4 bg-green-950 bg-opacity-70 rounded-full px-4 py-2 backdrop-blur-sm">
              <p className="text-white text-sm font-medium">
                Center the species and tap the capture button
              </p>
            </div>
          </div>

          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {!imagePreview ? (
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="image-upload"
          />

          <div className="border border-gray-200 rounded-2xl shadow-xl overflow-hidden bg-white hover:shadow-2xl transition-all duration-300">
            <div className="grid grid-cols-2 divide-x divide-gray-200">
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center px-6 py-10 bg-sand-50 hover:bg-sand-100 cursor-pointer transition-colors"
              >
                <div className="w-14 h-14 bg-sand-200 rounded-full flex items-center justify-center mb-4 border border-sand-300 transform hover:scale-110 transition-transform duration-300">
                  <Upload className="w-7 h-7 text-green-800" />
                </div>
                <div className="text-center">
                  <p className="text-gray-800 font-bold mb-1">
                    Upload from Device
                  </p>
                  <p className="text-gray-500 text-sm">
                    Choose from gallery or files
                  </p>
                </div>
              </label>

              <button
                onClick={startCamera}
                className="flex flex-col items-center px-6 py-10 bg-sand-50 hover:bg-sand-100 transition-colors"
              >
                <div className="w-14 h-14 bg-sand-200 rounded-full flex items-center justify-center mb-4 border border-sand-300 transform hover:scale-110 transition-transform duration-300">
                  <Camera className="w-7 h-7 text-green-800" />
                </div>
                <div className="text-center">
                  <p className="text-gray-800 font-bold mb-1">Take Photo</p>
                  <p className="text-gray-500 text-sm">
                    Use camera to capture instantly
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            src={imagePreview}
            alt="Selected plant"
            className="w-full max-w-sm h-64 mx-auto rounded-3xl shadow-xl border-4 border-green-700 object-cover transform scale-100 hover:scale-[1.01] transition-transform duration-300"
          />
          <button
            onClick={onClear}
            className="absolute -top-3 -right-3 w-10 h-10 bg-white border-2 border-green-600 text-green-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

// --- REVISED PlantCard Component for Horizontal Layout ---
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
      // REVISED: Using items-stretch and flex-auto for consistent height based on content
      className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transform hover:translate-y-[-2px] transition-all duration-300 group flex h-auto items-stretch"
    >
      {/* REVISED: SQUARE IMAGE CONTAINER - Fixed width (w-32) and h-full to match card height */}
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

      {/* REVISED: Text Content Area - Use flex-grow and justify-between to push percentage to the right */}
      <div className="p-3 bg-sand-50 flex flex-grow justify-between items-center min-h-[120px]">
        {/* Left-side Content (Name, Category, Confidence Bar) */}
        <div className="flex flex-col justify-center flex-grow pr-4">
          {/* Main Name */}
          <h3 className="text-lg font-bold text-gray-800 leading-tight mb-2 truncate">
            {plant.name || plant.identified_name || "Alternative Match"}
          </h3>

          {/* Category Badge */}
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

          {/* Confidence Bar (remains compact) */}
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

        {/* NEW: Percentage Match on the far right of the card */}
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

// ... (PlantDetailsCard remains the same - code omitted for brevity)
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
      {/* Header with Plant Name - Deep Green */}
      <div className="bg-gradient-to-br from-green-800 to-green-950 rounded-3xl shadow-2xl p-12 text-white">
        <div className="flex items-center space-x-4 mb-4">
         
          <h1 className="text-5xl font-extrabold">{plantName}</h1>
        </div>
        <p className="text-green-200 text-lg leading-relaxed mt-4 border-l-4 border-green-600 pl-4 transition-all duration-500">
          {details.description}
        </p>
      </div>

      {/* Aesthetic Two Column Layout - REVISED TO FLEX FOR EQUAL HEIGHTS ON LG+ */}
      {/* Changed from grid to flex and added lg:items-stretch */}
      <div className="flex flex-col lg:flex-row gap-8 lg:items-stretch">
        
        {/* Left Column - 40% width on desktop */}
        <div className="lg:w-2/5 space-y-8 flex flex-col">
          {/* What Does It Look Like Section - Beige/Sand Theme */}
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

        {/* Right Column - 60% width on desktop */}
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
          {/* Added flex-grow to the last item in the right column to ensure it fills any remaining vertical space */}
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
    } catch (error) {
      console.error("Error fetching plant details:", error);
    } finally {
      setLoadingDetails(false);
    }
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

  // --- REVISED LOGIC: Remove dynamic height calculation and rely on Flexbox with max-height ---
  // The dynamic height calculation was locking the container height and causing the empty space.
  // We will now rely on the 'flex-col' container with 'max-h-[540px]' and 'overflow-hidden'
  // to clip the content if it exceeds the max height (i.e., when > 3 cards appear).

  const matchContainerStyle = { maxHeight: '540px' };
  // --- END REVISED LOGIC ---


  return (
    <div className="min-h-screen bg-sand-50">
      <Navbar />

      <div className="px-4 py-12 md:px-6">
        <div className={`mx-auto ${result ? "lg:max-w-7xl" : "max-w-4xl"}`}>
          <header className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4 animate-fade-in-down">
              AI Species Identifier
            </h1>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto animate-fade-in-up">
              Quickly identify any Plant or Insect using our advanced AI, and
              receive tailored care recommendations.
            </p>
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
          </AnimatePresence>

          {/* -------------------------------------------------------------------------- */}
          {/* TOP ROW: Two Columns (Upload Box on Left, Best Matches on Right) */}
          {/* -------------------------------------------------------------------------- */}
          <div className="flex flex-col lg:flex-row gap-8 mb-8">
            {/* LEFT COLUMN: Upload Box (Takes up 1/2 of space) */}
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
                    <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-3 max-w-md mx-auto">
                      <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder={`Search ${activeTab.toLowerCase()} database by name...`}
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-700 focus:border-green-700 outline-none transition-colors duration-300 text-sm"
                        />
                      </div>
                      <button
                        onClick={handleIdentifyPlant}
                        disabled={
                          uploading || identifying || !user || !selectedImage
                        }
                        className="w-full md:w-auto px-6 py-2.5 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-[1.01]"
                      >
                        {uploading || identifying ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-sm">
                              {uploading ? "Uploading..." : "Analyzing..."}
                            </span>
                          </>
                        ) : (
                          <span className="flex items-center text-sm">
                            <Lightbulb className="w-4 h-4 mr-1" /> Identify Now
                          </span>
                        )}
                      </button>
                    </div>
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

            {/* RIGHT COLUMN: Best Species Matches (Takes up 1/2 of space) */}
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
                  // Use max-height to impose the limit and rely on flex-grow for space distribution
                  style={matchContainerStyle}
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-green-700 pb-2 flex-shrink-0">
                    Best Species Matches
                  </h2>

                  {/* Flex container for match cards */}
                  {result.identified && result.identified_name ? (
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      // Use space-y-3 to separate cards, flex-col for stacking. flex-grow will distribute space
                      className="flex flex-col space-y-3 flex-grow"
                    >
                      {/* Primary Match */}
                      <div>
                        <PlantCard
                          plant={result}
                          isMainResult={true}
                          activeTab={activeTab}
                        />
                      </div>

                      {/* Alternative Matches */}
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
                        The AI couldn’t confidently match this image. Try a
                        clearer, closer photo or use the search bar.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
          {/* -------------------------------------------------------------------------- */}
          {/* BOTTOM ROW: Full Species Details (Full Width) */}
          {/* -------------------------------------------------------------------------- */}
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