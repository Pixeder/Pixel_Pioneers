import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/UseAuth';
import apiClient from '../services/api.service';

const Login = () => {
  const [form, setForm] = useState({
    identifier: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token);
    }
  }, [isAuthenticated, navigate]);

  const verifyToken = async (token) => {
    try {
      // apiClient will automatically add the token to the headers
      const response = await apiClient.get('/v1/users');

      if (response.status === 200) {
        login(token);
        navigate('/transact', { replace: true });
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
      }
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }

    if (message) {
      setMessage('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.identifier.trim()) {
      newErrors.identifier = 'Username or email is required';
    } else if (form.identifier.trim().length < 3) {
      newErrors.identifier = 'Username or email must be at least 3 characters';
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isEmail = (str) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
  };

  const extractToken = (responseData) => {
    const possibleTokenPaths = [
      responseData.data?.accessToken,
      responseData.accessToken,
    ];

    return possibleTokenPaths.find(token => token && typeof token === 'string');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const loginData = {
        password: form.password
      };
      if (isEmail(form.identifier)) {
        loginData.email = form.identifier;
      } else {
        loginData.username = form.identifier;
      }

      console.log('Attempting login...');

      const response = await apiClient.post('/v1/users/login', loginData);
      const data = response.data;

      console.log('=== COMPLETE API RESPONSE ===');
      console.log('Response status:', response.status);
      console.log('Response data:', JSON.stringify(data, null, 2));
      console.log('===============================');

      if (response.status === 200 && data.success) {
        console.log('Login request successful');

        const token = extractToken(data);
        console.log('Extracted token:', token ? 'present' : 'missing');

        if (token) {
          localStorage.setItem('token', token);
          login(token);

          const user = data.data?.user || data.user;
          if (user) {
            localStorage.setItem('userInfo', JSON.stringify(user));
          }

          setForm({
            identifier: '',
            password: ''
          });

          console.log('Authentication successful, navigating to /transact');
          setMessage('Login successful! Redirecting...');

          navigate('/transact', { replace: true });

        } else {
          console.error('No token found in successful response');
          setMessage('Login successful but no authentication token received. Please contact support.');
        }

      } 
      // Note: Axios throws for non-2xx responses, so this 'else' block is unlikely to be hit.
      // Error handling is now primarily in the catch block.

    } catch (error) {
      console.error('Login error:', error);
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const { status, data } = error.response;
        const errorMessage = data?.message || 'An unknown error occurred.';

        console.log('Login failed with status:', status);
        console.error('Login failed:', {
          status: status,
          message: data?.message,
          errors: data?.errors,
          success: data?.success
        });

        if (status === 401) {
          setMessage('Invalid credentials. Please check your username/email and password.');
        } else if (status === 429) {
          setMessage('Too many login attempts. Please try again later.');
        } else if (status === 500) {
          setMessage('Server error. Please try again later.');
        } else {
          setMessage(errorMessage);
        }
      } else {
        setMessage('Network error. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      {/* Live Financial Wallpaper Background */}

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px]"></div>
      </div>

      {/* Floating Financial Data Points */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-data opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          >
            <div className="text-xs text-blue-400 font-mono">
              {Math.random() > 0.5 ? `₹${(Math.random() * 1000).toFixed(0)}` : `${(Math.random() * 100).toFixed(1)}%`}
            </div>
          </div>
        ))}
      </div>

      {/* Particle System */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400 rounded-full animate-particle-rise opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '0px',
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Background Glows */}
      <div className="fixed top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none animate-float-glow"></div>
      <div className="fixed bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-full blur-3xl pointer-events-none animate-float-glow-reverse"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-500/5 via-blue-500/5 to-green-500/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>

      {/* Main Login Card */}
      <div className="relative z-20 w-full max-w-md mx-4">
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-md rounded-3xl border border-gray-700/50 p-8 shadow-2xl">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-amber-500/25">
                <div className="text-black text-2xl font-bold">₹</div>
              </div>
            </div>
            <h1 className="text-4xl font-light text-white mb-3">Welcome Back</h1>
            <p className="text-gray-300 font-light">Access your financial dashboard</p>

            {/* Live Market Indicator */}
            <div className="inline-flex items-center space-x-2 mt-4 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm">Markets are LIVE</span>
            </div>
          </div>

          {/* Message Display */}
          {message && (
            <div className={`mb-6 p-4 rounded-xl border backdrop-blur-sm ${
              message.includes('successful') 
                ? 'bg-green-500/10 text-green-400 border-green-500/30' 
                : 'bg-red-500/10 text-red-400 border-red-500/30'
            }`}>
              <div className="flex items-center">
                <div className="mr-3">
                  {message.includes('successful') ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  )}
                </div>
                <span className="text-sm font-medium">{message}</span>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username/Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Username or Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="identifier"
                  placeholder="Enter your username or email"
                  value={form.identifier}
                  onChange={handleChange}
                  className={`w-full px-4 py-4 bg-gray-800/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 backdrop-blur-sm ${
                    errors.identifier 
                      ? 'border-red-500/50 bg-red-500/5' 
                      : 'border-gray-600/50 hover:border-gray-500/50'
                  }`}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              {errors.identifier && (
                <p className="mt-2 text-sm text-red-400 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  {errors.identifier}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-4 bg-gray-800/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 backdrop-blur-sm pr-12 ${
                    errors.password 
                      ? 'border-red-500/50 bg-red-500/5' 
                      : 'border-gray-600/50 hover:border-gray-500/50'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-400 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-amber-400 hover:text-amber-300 transition-colors font-medium"
              >
                Forgot your password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 px-6 rounded-xl font-medium transition-all duration-300 transform ${
                loading
                  ? 'bg-gray-600 cursor-not-allowed text-gray-300'
                  : 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black hover:scale-105 shadow-lg shadow-amber-500/25'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-transparent mr-3"></div>
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center justify-center font-semibold">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign In
                </span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-600/50"></div>
            <span className="px-4 text-gray-400 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-600/50"></div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-gray-400 text-sm font-light">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-amber-400 hover:text-amber-300 font-medium transition-colors hover:underline"
              >
                Create Account
              </button>
            </p>

            {/* Additional Links */}
            <div className="flex justify-center space-x-6 mt-6 text-xs text-gray-500">
              <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-gray-400 transition-colors">Support</a>
            </div>
          </div>
        </div>

        {/* Financial Stats Footer */}
        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-8 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>NIFTY 24,315</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span>SENSEX 79,987</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <span>GOLD ₹73,245</span>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float-data {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
        }

        @keyframes particle-rise {
          0% { transform: translateY(0px); opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }

        @keyframes float-glow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-10px) translateX(5px); }
          66% { transform: translateY(5px) translateX(-3px); }
        }

        @keyframes float-glow-reverse {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(5px) translateX(-5px); }
          66% { transform: translateY(-10px) translateX(3px); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.05; transform: scale(1); }
          50% { opacity: 0.1; transform: scale(1.05); }
        }

        .animate-float-data { animation: float-data 15s ease-in-out infinite; }
        .animate-particle-rise { animation: particle-rise 15s linear infinite; }
        .animate-float-glow { animation: float-glow 12s ease-in-out infinite; }
        .animate-float-glow-reverse { animation: float-glow-reverse 14s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Login;