/*import { useState } from "react";
import { Eye, EyeOff, Upload, User, Check, X } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    location: "",
    profile_image_url: "",
  });
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  // Password validation function
  const getPasswordValidation = (password) => {
    return {
      minLength: password.length >= 6,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
  };

  const passwordValidation = getPasswordValidation(form.password);
  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error when user starts typing
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    setImageUploading(true);
    
    // Simulate image upload - replace with actual upload logic
    try {
      // Create a temporary URL for preview
      const imageUrl = URL.createObjectURL(file);
      setForm({ ...form, profile_image_url: imageUrl });
      
      // Here you would normally upload to your server
      setTimeout(() => {
        setImageUploading(false);
      }, 1000);
    } catch (error) {
      console.error("Upload error:", error);
      setError("Image upload failed. Please try again.");
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Client-side validation
    if (!form.first_name || !form.last_name || !form.email || !form.password || !form.confirm_password) {
      setError("Please fill in all required fields");
      return;
    }

    if (!isPasswordValid) {
      setError("Password does not meet all requirements");
      return;
    }

    if (form.password !== form.confirm_password) {
      setError("Passwords do not match!");
      return;
    }
    
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert("Registration successful! Please sign in with your credentials.");
      // In real app, redirect to login page
    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const ValidationIcon = ({ isValid }) => (
    isValid ? (
      <Check className="w-4 h-4 text-green-500" />
    ) : (
      <X className="w-4 h-4 text-red-500" />
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-green-800 mb-2">
            Join AgroCare
          </h1>
          <p className="text-sm text-gray-600">Create your account to get started</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                name="first_name"
                placeholder="First Name"
                value={form.first_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                name="last_name"
                placeholder="Last Name"
                value={form.last_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Password *
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            
            {form.password && (
              <div className="mt-2">
                <div className="mb-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600">Password Strength</span>
                    <span className={`text-xs font-medium ${
                      Object.values(passwordValidation).filter(Boolean).length >= 4 ? 'text-green-600' :
                      Object.values(passwordValidation).filter(Boolean).length >= 2 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {Object.values(passwordValidation).filter(Boolean).length >= 4 ? 'Strong' :
                       Object.values(passwordValidation).filter(Boolean).length >= 2 ? 'Medium' : 'Weak'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        Object.values(passwordValidation).filter(Boolean).length >= 4 ? 'bg-green-500 w-full' :
                        Object.values(passwordValidation).filter(Boolean).length >= 2 ? 'bg-yellow-500 w-3/5' :
                        'bg-red-500 w-1/5'
                      }`}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-xs">
                    <ValidationIcon isValid={passwordValidation.minLength} />
                    <span className={passwordValidation.minLength ? 'text-green-600' : 'text-red-600'}>
                      At least 6 characters
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <ValidationIcon isValid={passwordValidation.hasUppercase} />
                    <span className={passwordValidation.hasUppercase ? 'text-green-600' : 'text-red-600'}>
                      One uppercase letter
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <ValidationIcon isValid={passwordValidation.hasLowercase} />
                    <span className={passwordValidation.hasLowercase ? 'text-green-600' : 'text-red-600'}>
                      One lowercase letter
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <ValidationIcon isValid={passwordValidation.hasNumber} />
                    <span className={passwordValidation.hasNumber ? 'text-green-600' : 'text-red-600'}>
                      One number
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <ValidationIcon isValid={passwordValidation.hasSpecialChar} />
                    <span className={passwordValidation.hasSpecialChar ? 'text-green-600' : 'text-red-600'}>
                      One special character
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Confirm Password *
            </label>
            <div className="relative">
              <input
                name="confirm_password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={form.confirm_password}
                onChange={handleChange}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {form.confirm_password && form.password !== form.confirm_password && (
              <p className="mt-1 text-xs text-red-600">Passwords do not match</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Profile Photo *
            </label>
            <div className="flex items-center space-x-3">
              {form.profile_image_url ? (
                <img 
                  src={form.profile_image_url} 
                  alt="Profile" 
                  className="w-12 h-12 rounded-full border-2 border-green-100 object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-12 h-12 rounded-full border-2 border-gray-200 bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-gray-400" />
                </div>
              )}
              
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="profile-upload"
                  disabled={imageUploading}
                />
                <label 
                  htmlFor="profile-upload" 
                  className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-colors w-full ${
                    imageUploading 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200 border border-green-200'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  <span>{imageUploading ? 'Uploading...' : 'Upload Photo'}</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Location *
            </label>
            <input
              name="location"
              placeholder="Enter your location"
              value={form.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <button 
            onClick={handleSubmit}
            disabled={loading || imageUploading || !isPasswordValid} 
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors mt-6"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </div>

        <div className="text-center mt-4 text-xs text-gray-600">
  Already have an account?{" "}
  <Link href="/login" className="text-green-600 font-medium hover:text-green-700">
    Sign In
  </Link>
</div>
      </div>
    </div>
  );
}*/

import { useState, useEffect, useRef } from "react";
import { Eye, EyeOff, Upload, User, Check, X } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    location: "",
    profile_image_url: "",
  });
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  // Vanta background setup
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    const loadScript = (src) =>
      new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve();
        const script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });

    const initVanta = async () => {
      try {
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js"
        );
        await loadScript(
          "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.topology.min.js"
        );
        if (window.VANTA && vantaRef.current && !vantaEffect.current) {
          vantaEffect.current = window.VANTA.TOPOLOGY({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
          });
        }
      } catch (err) {
        console.error("Error loading Vanta.js:", err);
      }
    };

    initVanta();

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  const getPasswordValidation = (password) => ({
    minLength: password.length >= 6,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  });

  const passwordValidation = getPasswordValidation(form.password);
  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    setImageUploading(true);
    try {
      const imageUrl = URL.createObjectURL(file);
      setForm({ ...form, profile_image_url: imageUrl });
      setTimeout(() => setImageUploading(false), 1000);
    } catch (err) {
      console.error(err);
      setError("Image upload failed. Please try again.");
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !form.first_name ||
      !form.last_name ||
      !form.email ||
      !form.password ||
      !form.confirm_password
    ) {
      setError("Please fill in all required fields");
      return;
    }

    if (!isPasswordValid) {
      setError("Password does not meet all requirements");
      return;
    }

    if (form.password !== form.confirm_password) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Registration successful! Please sign in with your credentials.");
    } catch (err) {
      console.error(err);
      setError("Registration failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const ValidationIcon = ({ isValid }) =>
    isValid ? (
      <Check className="w-4 h-4 text-green-500" />
    ) : (
      <X className="w-4 h-4 text-red-500" />
    );

  return (
    <div
      ref={vantaRef}
      className="min-h-screen flex items-center justify-center p-4 relative"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-10 z-0 pointer-events-none"></div>

      <div className="bg-white/1.5 backdrop-blur-[6px] rounded-3xl shadow-xl p-6 w-full max-w-md relative z-10 border border-white/10">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2" style={{ color: "#C5D96F" }}>
            Join AgroCare
          </h1>

          <p className="text-sm text-white -600">
            Create your account to get started
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-white -700 mb-1">
                First Name *
              </label>
              <input
                name="first_name"
                placeholder="First Name"
                value={form.first_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white/30 rounded-lg bg-white/0 text-white text-sm placeholder-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 focus:scale-105"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white -700 mb-1">
                Last Name *
              </label>
              <input
                name="last_name"
                placeholder="Last Name"
                value={form.last_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white/30 rounded-lg bg-white/0 text-white text-sm placeholder-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 focus:scale-105"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-white -700 mb-1">
              Email *
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-white/30 rounded-lg bg-white/0 text-white text-sm placeholder-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 focus:scale-105"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-white -700 mb-1">
              Password *
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white/30 rounded-lg bg-white/0 text-white text-sm placeholder-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 focus:scale-105"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-medium text-white -700 mb-1">
              Confirm Password *
            </label>
            <div className="relative">
              <input
                name="confirm_password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={form.confirm_password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white/30 rounded-lg bg-white/0 text-white text-sm placeholder-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 focus:scale-105"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Profile Photo */}
          <div>
            <label className="block text-xs font-medium text-white -700 mb-2">
              Profile Photo *
            </label>
            <div className="flex items-center space-x-3">
              {form.profile_image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={form.profile_image_url}
                  alt="Profile"
                  className="w-12 h-12 rounded-full border-2 border-green-100 object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-12 h-12 rounded-full border-2 border-gray-200 bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-gray-400" />
                </div>
              )}
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="profile-upload"
                  disabled={imageUploading}
                />
                <label
                  htmlFor="profile-upload"
                  className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-colors w-full ${
                    imageUploading
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white -100 text-black -700 hover:bg-green-200 border border-green-200"
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  <span>
                    {imageUploading ? "Uploading..." : "Upload Photo"}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-medium text-white -700 mb-1">
              Location *
            </label>
            <input
              name="location"
              placeholder="Enter your location"
              value={form.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-white/30 rounded-lg bg-white/0 text-white text-sm placeholder-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 focus:scale-105"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || imageUploading || !isPasswordValid}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors mt-6"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="text-center mt-4 text-xs text-white">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#C5D96F] font-medium hover:text-green-700"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
