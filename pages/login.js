// pages/login.js
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, getSession } from "next-auth/react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  // Add this to your existing useState hooks
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  // Check for errors from URL params (from NextAuth redirects)
  useEffect(() => {
    if (router.query.error) {
      switch (router.query.error) {
        case 'OAuthAccountNotLinked':
          setError('An account with this email already exists. Please sign in with your original method.');
          break;
        case 'CredentialsSignin':
          setError('Invalid email or password.');
          break;
        default:
          setError('An error occurred during sign in.');
      }
    }
  }, [router.query.error]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error when user starts typing
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError("");
      
      const result = await signIn('google', { 
        callbackUrl: '/profile',
        redirect: false 
      });
      
      if (result?.error) {
        console.error("Google sign-in error:", result.error);
        switch (result.error) {
          case 'OAuthAccountNotLinked':
            setError('An account with this email already exists. Please sign in with email/password first.');
            break;
          default:
            setError('Google sign-in failed. Please try again.');
        }
      } else if (result?.ok) {
        // Check session before redirecting
        const session = await getSession();
        if (session) {
          router.push('/profile');
        }
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      setError('Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    setLoading(true);

    try {
      console.log("=== ATTEMPTING SIGN IN ===");
      console.log("Email:", form.email.toLowerCase().trim());
      console.log("Password length:", form.password.length);

      const result = await signIn('credentials', {
        email: form.email.toLowerCase().trim(),
        password: form.password,
        redirect: false,
      });

      console.log("=== SIGN IN RESULT ===");
      console.log("Result:", result);

      if (result?.ok) {
        console.log("Sign in successful, checking session...");
        
        // Wait a moment for session to be created
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const session = await getSession();
        console.log("Session after sign in:", session);
        
        if (session) {
          console.log("Session found, redirecting to profile");
          router.push('/profile');
        } else {
          console.log("No session found after successful login");
          setError("Session creation failed. Please try again.");
        }
      } else {
        console.log("Sign in failed");
        
        if (result?.error) {
          console.error("Sign-in error:", result.error);
          
          // NextAuth returns "CredentialsSignin" for any credential failure
          if (result.error === 'CredentialsSignin') {
            setError('Invalid email or password. Please check your credentials and try again.');
          } else {
            setError('Login failed. Please try again.');
          }
        } else {
          setError('Login failed. Please check your credentials and try again.');
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
  e.preventDefault();
  if (!forgotEmail) return;
  
  setForgotLoading(true);
  try {
    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: forgotEmail })
    });
    const data = await res.json();
    
    if (res.ok) {
      router.push(`/otp-verify?email=${encodeURIComponent(forgotEmail)}`);
    } else {
      setError(data.message);
    }
  } catch (error) {
    setError('Something went wrong');
  }
  setForgotLoading(false);
};
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-green-800 mb-2">
//             Welcome Back
//           </h1>
//           <p className="text-gray-600">Login to your AgroCare account</p>
//         </div>

//         {error && (
//           <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
//             {error}
//           </div>
//         )}
        
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Email
//             </label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 name="email"
//                 type="email"
//                 placeholder="Enter your email"
//                 value={form.email}
//                 onChange={handleChange}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 required
//                 disabled={loading}
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter your password"
//                 value={form.password}
//                 onChange={handleChange}
//                 className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 required
//                 disabled={loading}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 disabled={loading}
//               >
//                 {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//               </button>
//             </div>
//           </div>


//           {/* Submit Button */}
//           <button 
//             type="submit" 
//             disabled={loading} 
//             className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
//           >
//             {loading ? "Signing In..." : "Sign In"}
//           </button>
//         </form>

//         {/* Google Sign In */}
//         <div className="relative my-6">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-gray-300"></div>
//           </div>
//           <div className="relative flex justify-center text-sm">
//             <span className="px-2 bg-white text-gray-500">Or continue with</span>
//           </div>
//         </div>

//         <button
//           onClick={handleGoogleSignIn}
//           disabled={loading}
//           className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
//         >
//           <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
//             <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//             <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//             <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//             <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//           </svg>
//           {loading ? "Connecting..." : "Continue with Google"}
//         </button>

//         {/* Register Link */}
//         <div className="text-center mt-3 text-sm text-gray-600">
//           Do not have an account?{" "}
//           <Link href="/register" className="text-green-600 font-medium hover:text-green-700">
//             Sign Up
//           </Link>
//         </div>
//         <div className="text-center mt-3 text-sm text-gray-60"> <button type="button" onClick={() => setShowForgotPassword(true)} className="text-sm text-green-600 hover:text-green-700" > Forgot Password? </button> </div>
//       </div>

      

// {showForgotPassword && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//     <div className="bg-white rounded-lg p-6 w-full max-w-md">
//       <h3 className="text-lg font-semibold mb-4">Reset Password</h3>
//       <form onSubmit={handleForgotPassword}>
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={forgotEmail}
//           onChange={(e) => setForgotEmail(e.target.value)}
//           className="w-full p-3 border rounded-lg mb-4"
//           required
//         />
//         <div className="flex space-x-3">
//           <button
//             type="button"
//             onClick={() => setShowForgotPassword(false)}
//             className="flex-1 px-4 py-2 border rounded-lg"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={forgotLoading}
//             className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg disabled:bg-gray-400"
//           >
//             {forgotLoading ? 'Sending...' : 'Send OTP'}
//           </button>
//         </div>
//       </form>
//     </div>
//   </div>
// )}
//     </div>
//   );
return (
  <div className="min-h-screen bg-gradient-to-tr from-green-700 via-green-400 to-yellow-300 flex items-center justify-center p-4 relative overflow-hidden">
    {/* Background decorative elements */}
    <div className="absolute top-10 left-10 w-72 h-72 bg-white bg-opacity-10 rounded-full blur-xl"></div>
    <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-200 bg-opacity-20 rounded-full blur-2xl"></div>
    <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-green-200 bg-opacity-15 rounded-full blur-xl"></div>
    
    <div className="bg-white bg-opacity-20 backdrop-blur-lg border border-white border-opacity-30 rounded-3xl shadow-2xl p-8 w-full max-w-md relative">
      {/* Subtle inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white from-opacity-30 to-transparent rounded-3xl"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 drop-shadow-sm">
            Welcome Back
          </h1>
          <p className="text-gray-700">Login to your AgroCare account</p>
        </div>

        {error && (
          <div className="bg-red-500 bg-opacity-20 backdrop-blur-sm border border-red-300 border-opacity-50 text-red-100 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-900 w-5 h-5" />
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 rounded-lg focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-white focus:border-opacity-50 text-gray-800 placeholder-gray-600"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-900 w-5 h-5" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-3 bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 rounded-lg focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-white focus:border-opacity-50 text-gray-800 placeholder-gray-600"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors"
                disabled={loading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 text-white py-3 rounded-lg font-semibold hover:bg-opacity-30 disabled:bg-opacity-10 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl text-gray-800"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Google Sign In */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white border-opacity-30"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-700 rounded-full">Or continue with</span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center px-4 py-3 bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 rounded-lg text-gray-800 hover:bg-opacity-30 transition-all duration-300 disabled:opacity-50"
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {loading ? "Connecting..." : "Continue with Google"}
        </button>

        {/* Register Link */}
        <div className="text-center mt-6 text-sm text-gray-700">
          Do not have an account?{" "}
          <Link href="/register" className="text-green-700 font-medium hover:text-green-800 transition-colors">
            Sign Up
          </Link>
        </div>
        <div className="text-center mt-3 text-sm">
          <button 
            type="button" 
            onClick={() => setShowForgotPassword(true)} 
            className="text-green-700 hover:text-green-800 transition-colors" 
          > 
            Forgot Password? 
          </button> 
        </div>
      </div>
    </div>

    {/* Forgot Password Modal with Glassmorphism */}
    {showForgotPassword && (
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white bg-opacity-20 backdrop-blur-lg border border-white border-opacity-30 rounded-lg p-6 w-full max-w-md relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white from-opacity-30 to-transparent rounded-lg"></div>
          
          <div className="relative z-10">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Reset Password</h3>
            <form onSubmit={handleForgotPassword}>
              <input
                type="email"
                placeholder="Enter your email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full p-3 bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 rounded-lg mb-4 text-gray-800 placeholder-gray-600"
                required
              />
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="flex-1 px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 rounded-lg text-gray-800 hover:bg-opacity-30 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="flex-1 px-4 py-2 bg-white bg-opacity-30 backdrop-blur-sm border border-white border-opacity-30 text-gray-800 rounded-lg disabled:bg-opacity-10 hover:bg-opacity-40 transition-all duration-300"
                >
                  {forgotLoading ? 'Sending...' : 'Send OTP'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}
  </div>
);

}