// pages/identification.js - UPDATED WITH CAMERA FEATURE

import React, { useState, useEffect } from 'react';
import { Upload, Camera, Loader2, Leaf, Info, CheckCircle, AlertCircle, Search, X } from 'lucide-react';
import Navbar from '@/components/Navbar';

// Unified Upload Component with Half-Width Options
const UnifiedUploadComponent = ({ onImageSelect, onClear, imagePreview }) => {
  const [showCamera, setShowCamera] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  // Start camera
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      setStream(mediaStream);
      setShowCamera(true);
      setShowOptions(false);
      
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      }, 100);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions or upload a file instead.');
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  // Capture photo
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `camera-capture-${Date.now()}.jpg`, {
          type: 'image/jpeg'
        });
        
        const previewUrl = URL.createObjectURL(blob);
        onImageSelect(file, previewUrl);
        stopCamera();
      }
    }, 'image/jpeg', 0.9);
  };

  // Handle file input
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      onImageSelect(file, previewUrl);
      setShowOptions(false);
    }
  };

  // Cleanup camera on unmount
  React.useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  // Camera Modal
  if (showCamera) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
        <div className="relative w-full h-full max-w-4xl max-h-4xl">
          <button
            onClick={stopCamera}
            className="absolute top-4 right-4 z-10 w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="w-full h-full flex flex-col items-center justify-center">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover rounded-lg"
              style={{ maxHeight: 'calc(100vh - 120px)' }}
            />
            
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <button
                onClick={capturePhoto}
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
              >
                <Camera className="w-8 h-8 text-gray-700" />
              </button>
            </div>

            <div className="absolute top-4 left-4 bg-black bg-opacity-50 rounded-lg p-3">
              <p className="text-white text-sm">Position the plant in center and tap camera button</p>
            </div>
          </div>

          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    );
  }

  // Upload interface
  return (
    <div className="relative">
      {!imagePreview ? (
        <div className="relative">
          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="image-upload"
          />
          
          {/* Direct Options - Half width layout */}
          <div className="border border-gray-200 rounded-xl shadow-sm overflow-hidden bg-white">
            <div className="grid grid-cols-2">
              {/* Upload Option - Left Half */}
              <label 
                htmlFor="image-upload" 
                className="flex flex-col items-center px-6 py-8 hover:bg-green-100 cursor-pointer transition-colors border-r border-gray-200"
              >
                <div className="w-12 h-12 bg-gray-0 rounded-full flex items-center justify-center mb-4">
                  <Upload className="w-6 h-6 text-gray-500" />
                </div>
                <div className="text-center">
                  <p className="text-gray-700 font-medium mb-1">Upload from Device</p>
                  <p className="text-gray-400 text-sm">Choose from gallery or files</p>
                </div>
              </label>
              
              {/* Camera Option - Right Half */}
              <button 
                onClick={startCamera}
                className="flex flex-col items-center px-6 py-8 hover:bg-green-100 transition-colors"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Camera className="w-6 h-6 text-gray-500" />
                </div>
                <div className="text-center">
                  <p className="text-gray-700 font-medium mb-1">Take Photo</p>
                  <p className="text-gray-400 text-sm">Use camera to capture instantly</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <img
            src={imagePreview}
            alt="Selected plant"
            className="w-full max-w-md mx-auto rounded-xl shadow-md border-2 border-gray-200"
          />
          <button
            onClick={onClear}
            className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      )}
      
      {/* Click outside to close options - Remove this since we no longer have dropdown */}
    </div>
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
  const [activeTab, setActiveTab] = useState('Plants');
  const [searchQuery, setSearchQuery] = useState('');

  // Get user info on component mount
// Just replace your useEffect block with:
useEffect(() => {
  fetch("/api/auth/session")
    .then((res) => res.json())
    .then((data) => {
      console.log("Session response:", data); // Debug log
      
      if (data && data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email,
          first_name: data.user.first_name || data.user.name?.split(' ')[0],
          last_name: data.user.last_name || data.user.name?.split(' ').slice(1).join(' '),
          profile_image_url: data.user.profile_image_url || data.user.image,
          location: data.user.location
        });
      }
    })
    .catch((error) => {
      console.error("Auth error:", error);
    });
}, []);

  // Updated handleImageSelect to work with camera
  const handleImageSelect = (file, previewUrl) => {
    setSelectedImage(file);
    setImagePreview(previewUrl);
    setResult(null);
    setError(null);
  };

  // Updated handleFileSelect for file input
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleImageSelect(file, URL.createObjectURL(file));
    }
  };

  // Upload image using your existing upload API
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

  // Handle the complete identification process
  const handleIdentifyPlant = async () => {
    if (!selectedImage) return;

    // Check if user is logged in
    if (!user) {
      setError("Please log in to identify plants");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // Upload image using your existing system
      const imageUrl = await uploadImage(selectedImage);
      
      setUploading(false);
      setIdentifying(true);

      // Create identification record and get results
      const response = await fetch('/api/identify-plant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          image_url: imageUrl
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Plant identification failed');
      }

      const identificationResult = await response.json();
      setResult(identificationResult);
      console.log('Identification Result:', identificationResult);
    } catch (error) {
      setError(error.message);
    } finally {
      setUploading(false);
      setIdentifying(false);
    }
  };

  // Clear current image and results
  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setResult(null);
    setError(null);
  };

  // Component to handle individual plant cards
  const PlantCard = ({ plant, isMainResult = false, index = 0 }) => {
    const [imageError, setImageError] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    // Get images array - try multiple sources
    let images = [];
    if (plant.similar_images && plant.similar_images.length > 0) {
      images = plant.similar_images;
    }
    
    const hasValidImage = images.length > 0 && !imageError;
    const currentImage = hasValidImage ? images[currentImageIndex] : null;
    
    const handleImageError = () => {
      console.log('Image failed to load:', currentImage?.url);
      if (currentImageIndex < images.length - 1) {
        setCurrentImageIndex(currentImageIndex + 1);
      } else {
        setImageError(true);
      }
    };

    const confidence = isMainResult ? plant.confidence : plant.probability;
    const confidenceColor = isMainResult ? 'green' : 'blue';

    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
        <div className="aspect-square bg-gray-100 relative">
          {hasValidImage && currentImage ? (
            <img
              src={currentImage.url}
              alt={plant.name || plant.identified_name}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
              <div className="text-center">
                <Leaf className="w-12 h-12 text-green-400 mx-auto mb-2" />
                <p className="text-xs text-green-600 font-medium px-2">
                  {plant.name || plant.identified_name}
                </p>
              </div>
            </div>
          )}
          <div className={`absolute top-2 left-2 bg-${confidenceColor}-500 text-white px-2 py-1 rounded text-xs font-bold`}>
            {(confidence * 100).toFixed(0)}%
          </div>
          
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {images.map((_, imgIndex) => (
                <button
                  key={imgIndex}
                  onClick={() => setCurrentImageIndex(imgIndex)}
                  className={`w-2 h-2 rounded-full ${
                    imgIndex === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="mb-2">
            <span className="text-sm text-gray-500">Name:</span>
            <span className="text-orange-500 font-semibold ml-1">
              {plant.name || plant.identified_name}
            </span>
          </div>
          <div className="mb-2">
            <span className="text-sm text-gray-500">Category:</span>
            <span className={`bg-${confidenceColor}-100 text-${confidenceColor}-800 px-2 py-0.5 rounded text-xs font-medium ml-2`}>
              {plant.category || activeTab}
            </span>
          </div>
          <div>
            <span className="text-sm text-gray-500">Match Confidence:</span>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div 
                className={`bg-${confidenceColor}-400 h-2 rounded-full transition-all duration-500`}
                style={{ width: `${(confidence * 100)}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-500">{(confidence * 100).toFixed(0)}%</span>
          </div>
          
          {images.length > 0 && (
            <div className="mt-2 text-xs text-gray-500">
              {images.length} similar image{images.length !== 1 ? 's' : ''} available
            </div>
          )}
        </div>
      </div>
    );
  };

  const tabs = ['Plants', 'Crops', 'Insects'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Species Identification</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From garden beds to farm fields, quickly identify any plant, crop, or insect 
            with AI-powered accuracy and practical care tips.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    activeTab === tab
                      ? 'text-gray-800 border-b-2 border-gray-800 bg-white'
                      : 'text-gray-500 hover:text-gray-700 bg-gray-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Upload Photo Section */}
          <div className="p-8">
            <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">Upload Photo</h2>
            
            {/* Login Required Message */}
            {!user && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Info className="w-5 h-5 text-amber-600" />
                  <p className="text-amber-700 text-sm">Please log in to identify plants and access your history.</p>
                </div>
              </div>
            )}

            {/* Unified Upload Component */}
            <UnifiedUploadComponent 
              onImageSelect={handleImageSelect}
              onClear={clearImage}
              imagePreview={imagePreview}
            />

            {/* Search Bar */}
            <div className="mt-6">
              <div className="flex items-center space-x-3 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  />
                </div>
                <button
                  onClick={handleIdentifyPlant}
                  disabled={uploading || identifying || !user}
                  className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  {uploading || identifying ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{uploading ? 'Uploading...' : 'Analyzing...'}</span>
                    </>
                  ) : (
                    <span>Identify</span>
                  )}
                </button>
                <button
                  onClick={clearImage}
                  className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Results Section */}
        {result && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Best Matches</h2>
            
            {result.identified && result.identified_name ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Best Match */}
                <PlantCard plant={result} isMainResult={true} />

                {/* Alternative Suggestions */}
                {result.alternative_suggestions && result.alternative_suggestions.map((suggestion, index) => (
                  <PlantCard key={index} plant={suggestion} isMainResult={false} index={index} />
                ))}
              </div>
            ) : (
              /* No Results */
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Unable to Identify Species
                </h3>
                <p className="text-gray-500">
                  The image might not contain a clear {activeTab.toLowerCase().slice(0, -1)}, or the species is not in our database.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Plant Detection Status */}
        {result && (
          <div className="mt-6">
            <div className={`rounded-xl p-4 ${
              result.is_plant_detected 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-yellow-50 border border-yellow-200'
            }`}>
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  result.is_plant_detected ? 'bg-green-100' : 'bg-yellow-100'
                }`}>
                  <Leaf className={`w-5 h-5 ${
                    result.is_plant_detected ? 'text-green-600' : 'text-yellow-600'
                  }`} />
                </div>
                <div>
                  <p className={`font-medium ${
                    result.is_plant_detected ? 'text-green-800' : 'text-yellow-800'
                  }`}>
                    {result.is_plant_detected ? 'Plant Successfully Detected' : 'Plant Detection Uncertain'}
                  </p>
                  <p className={`text-sm ${
                    result.is_plant_detected ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    Detection Confidence: {(result.is_plant_probability * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tips Section */}
        {!result && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Tips for Better Results</h3>
            <div className="grid md:grid-cols-2 gap-3 text-sm text-blue-700">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span>Take photos in good natural lighting</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span>Include distinctive features clearly</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span>Avoid blurry or distant shots</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span>Fill the frame with the subject</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span>Use camera for instant capture</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span>Position plant in center of frame</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IdentificationPage;