import React, { useState, useEffect } from 'react';
import { Upload, Camera, Loader2, Leaf, Info, CheckCircle, AlertCircle, Search, X } from 'lucide-react';
import Navbar from '@/components/Navbar';

// Color Palette
// Background: #F9F6F3
// Primary (Secondary): #1c352b (dark green)
// Accent (Third): #a6b28b (sage green)
// Text: #2d2d2d (charcoal)

const UnifiedUploadComponent = ({ onImageSelect, onClear, imagePreview }) => {
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      setStream(mediaStream);
      setShowCamera(true);
      
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

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

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
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

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
          
          <div className="border-2 border-dashed rounded-2xl overflow-hidden bg-white shadow-sm" style={{ borderColor: '#a6b28b' }}>
            <div className="grid grid-cols-2">
              <label 
                htmlFor="image-upload" 
                className="flex flex-col items-center px-8 py-12 cursor-pointer transition-all border-r-2 border-dashed hover:bg-opacity-50"
                style={{ borderColor: '#a6b28b', '--hover-bg': '#a6b28b' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#a6b28b20'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#a6b28b20' }}>
                  <Upload className="w-8 h-8" style={{ color: '#1c352b' }} />
                </div>
                <div className="text-center">
                  <p className="font-semibold mb-1" style={{ color: '#344e41' }}>Upload from Device</p>
                  <p className="text-sm" style={{ color: '#666' }}>Choose from gallery or files</p>
                </div>
              </label>
              
              <button 
                onClick={startCamera}
                className="flex flex-col items-center px-8 py-12 transition-all"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#a6b28b20'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#a6b28b20' }}>
                  <Camera className="w-8 h-8" style={{ color: '#1c352b' }} />
                </div>
                <div className="text-center">
                  <p className="font-semibold mb-1" style={{ color: '#2d2d2d' }}>Take Photo</p>
                  <p className="text-sm" style={{ color: '#666' }}>Use camera to capture instantly</p>
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
            className="w-full max-w-md mx-auto rounded-2xl shadow-lg border-4"
            style={{ borderColor: '#a6b28b' }}
          />
          <button
            onClick={onClear}
            className="absolute top-2 right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center transition-colors"
            style={{ color: '#1c352b' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

const PlantCard = ({ plant, isMainResult = false, index = 0 }) => {
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

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all border-2" style={{ borderColor: isMainResult ? '#1c352b' : '#a6b28b' }}>
      <div className="aspect-square relative" style={{ backgroundColor: '#ffffffff' }}>
        {hasValidImage && currentImage ? (
          <img
            src={currentImage.url}
            alt={plant.name || plant.identified_name}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #a6b28b20 0%, #1c352b20 100%)' }}>
            <div className="text-center">
              <Leaf className="w-16 h-16 mx-auto mb-3" style={{ color: '#1c352b' }} />
              <p className="text-sm font-semibold px-4" style={{ color: '#2d2d2d' }}>
                {plant.name || plant.identified_name}
              </p>
            </div>
          </div>
        )}
        <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full text-white text-sm font-bold shadow-md" style={{ backgroundColor: isMainResult ? '#1c352b' : '#a6b28b' }}>
          {(confidence * 100).toFixed(0)}%
        </div>
        
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, imgIndex) => (
              <button
                key={imgIndex}
                onClick={() => setCurrentImageIndex(imgIndex)}
                className="w-2.5 h-2.5 rounded-full transition-all shadow-sm"
                style={{ backgroundColor: imgIndex === currentImageIndex ? '#1c352b' : 'rgba(255,255,255,0.6)' }}
              />
            ))}
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="mb-3">
          <p className="text-sm mb-1" style={{ color: '#666' }}>Species Name</p>
          <p className="font-bold text-lg" style={{ color: '#1c352b' }}>
            {plant.name || plant.identified_name}
          </p>
        </div>
        <div className="mb-3">
          <p className="text-sm mb-1" style={{ color: '#666' }}>Category</p>
          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: '#a6b28b30', color: '#1c352b' }}>
            {plant.category || 'Plant'}
          </span>
        </div>
        <div>
          <p className="text-sm mb-2" style={{ color: '#666' }}>Match Confidence</p>
          <div className="w-full rounded-full h-3 overflow-hidden" style={{ backgroundColor: '#a6b28b30' }}>
            <div 
              className="h-3 rounded-full transition-all duration-700"
              style={{ 
                width: `${(confidence * 100)}%`,
                backgroundColor: isMainResult ? '#1c352b' : '#a6b28b'
              }}
            ></div>
          </div>
          <p className="text-sm mt-1.5 font-semibold" style={{ color: '#1c352b' }}>{(confidence * 100).toFixed(0)}% Match</p>
        </div>
        
        {images.length > 0 && (
          <div className="mt-3 pt-3 border-t text-sm" style={{ borderColor: '#a6b28b50', color: '#666' }}>
            {images.length} reference image{images.length !== 1 ? 's' : ''} available
          </div>
        )}
      </div>
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
  const [user, setUser] = useState({ id: 1, email: 'demo@example.com' }); // Demo user
  const [activeTab, setActiveTab] = useState('Plants');
  const [searchQuery, setSearchQuery] = useState('');

  const handleImageSelect = (file, previewUrl) => {
    setSelectedImage(file);
    setImagePreview(previewUrl);
    setResult(null);
    setError(null);
  };

  const handleIdentifyPlant = async () => {
    if (!selectedImage) return;
    if (!user) {
      setError("Please log in to identify plants");
      return;
    }

    setUploading(true);
    setError(null);

    // Simulate identification process
    setTimeout(() => {
      setUploading(false);
      setIdentifying(true);
      
      setTimeout(() => {
        setResult({
          identified: true,
          identified_name: 'Monstera Deliciosa',
          confidence: 0.94,
          category: 'Tropical Plant',
          is_plant_detected: true,
          is_plant_probability: 0.98,
          similar_images: [],
          alternative_suggestions: [
            {
              identified_name: 'Philodendron Bipinnatifidum',
              probability: 0.78,
              category: 'Tropical Plant',
              similar_images: []
            },
            {
              identified_name: 'Epipremnum Aureum',
              probability: 0.65,
              category: 'Houseplant',
              similar_images: []
            }
          ]
        });
        setIdentifying(false);
      }, 2000);
    }, 1500);
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setResult(null);
    setError(null);
  };

  const tabs = ['Plants', 'Crops', 'Insects'];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f9fa' }}>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4" style={{ color: '#212529' }}>
            Species Identification
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6c757d' }}>
            Identify any plant, crop, or insect with AI-powered accuracy and get instant care recommendations
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          
          {/* Tabs */}
          <div style={{ borderBottom: '2px solid #a6b28b' }}>
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="flex-1 py-5 px-6 text-center font-semibold transition-all text-lg"
                  style={{
                    color: activeTab === tab ? '#1c352b' : '#344e41',
                    backgroundColor: activeTab === tab ? 'white' : '#e9ecef',
                    borderBottom: activeTab === tab ? '3px solid #344e41' : 'none',
                    marginBottom: activeTab === tab ? '-2px' : '0'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Upload Section */}
          <div className="p-10">
            <h2 className="text-2xl font-bold text-center mb-8" style={{ color: '#2d2d2d' }}>
              Upload or Capture Photo
            </h2>
            
            {/* Login Required Message */}
            {!user && (
              <div className="rounded-2xl p-5 mb-8" style={{ backgroundColor: '#344e41', border: '2px solid #a6b28b' }}>
                <div className="flex items-center space-x-3">
                  <Info className="w-6 h-6" style={{ color: '#1c352b' }} />
                  <p className="font-medium" style={{ color: '#1c352b' }}>
                    Please log in to identify plants and access your history
                  </p>
                </div>
              </div>
            )}

            {/* Upload Component */}
            <UnifiedUploadComponent 
              onImageSelect={handleImageSelect}
              onClear={clearImage}
              imagePreview={imagePreview}
            />

            {/* Action Buttons */}
            <div className="mt-8 flex items-center justify-center space-x-4">
              <button
                onClick={handleIdentifyPlant}
                disabled={uploading || identifying || !user || !selectedImage}
                className="px-8 py-4 rounded-2xl font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-lg flex items-center space-x-3"
                style={{ backgroundColor: '#1c352b' }}
                onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {uploading || identifying ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{uploading ? 'Uploading...' : 'Analyzing...'}</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Identify Species</span>
                  </>
                )}
              </button>
              <button
                onClick={clearImage}
                className="px-8 py-4 rounded-2xl font-semibold transition-all shadow-lg text-lg"
                style={{ backgroundColor: '#a6b28b', color: 'white' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="rounded-2xl p-5 mb-8 shadow-md" style={{ backgroundColor: '#fee', border: '2px solid #fcc' }}>
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-6 h-6" style={{ color: '#c00' }} />
              <p className="font-medium" style={{ color: '#c00' }}>{error}</p>
            </div>
          </div>
        )}

        {/* Results Section */}
        {result && (
          <div>
            <h2 className="text-3xl font-bold mb-8" style={{ color: '#2d2d2d' }}>
              Identification Results
            </h2>
            
            {result.identified && result.identified_name ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <PlantCard plant={result} isMainResult={true} />

                {result.alternative_suggestions && result.alternative_suggestions.map((suggestion, index) => (
                  <PlantCard key={index} plant={suggestion} isMainResult={false} index={index} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#a6b28b30' }}>
                  <AlertCircle className="w-10 h-10" style={{ color: '#1c352b' }} />
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: '#2d2d2d' }}>
                  Unable to Identify Species
                </h3>
                <p className="text-lg" style={{ color: '#666' }}>
                  The image might not contain a clear {activeTab.toLowerCase().slice(0, -1)}, or the species is not in our database
                </p>
              </div>
            )}
          </div>
        )}

        {/* Plant Detection Status */}
        {result && result.is_plant_detected !== undefined && (
          <div className="mt-8">
            <div className="rounded-2xl p-6 shadow-md" style={{ 
              backgroundColor: result.is_plant_detected ? '#a6b28b30' : '#fef3cd',
              border: `2px solid ${result.is_plant_detected ? '#a6b28b' : '#f0ad4e'}`
            }}>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ 
                  backgroundColor: result.is_plant_detected ? '#a6b28b' : '#f0ad4e'
                }}>
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-lg" style={{ color: '#2d2d2d' }}>
                    {result.is_plant_detected ? 'Plant Successfully Detected' : 'Plant Detection Uncertain'}
                  </p>
                  <p className="text-sm" style={{ color: '#666' }}>
                    Detection Confidence: {(result.is_plant_probability * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tips Section */}
        {!result && (
          <div className="rounded-2xl p-8 shadow-md" style={{ backgroundColor: 'white', border: '2px solid #a6b28b' }}>
            <h3 className="text-2xl font-bold mb-6" style={{ color: '#1c352b' }}>
              Tips for Best Results
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Take photos in good natural lighting',
                'Include distinctive features clearly',
                'Avoid blurry or distant shots',
                'Fill the frame with the subject',
                'Use camera for instant capture',
                'Position plant in center of frame'
              ].map((tip, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#1c352b' }} />
                  <span style={{ color: '#2d2d2d' }}>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IdentificationPage;