import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { endpoints } from '../config/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(endpoints.auth.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      
      if (data.success) {
        setUser(data.userData);
        navigate('/blogs');
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (error) {
      setError('An error occurred during login');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-1 h-full bg-cyan-500/20 blur-sm left-1/4 animate-pulse"></div>
        <div className="absolute w-1 h-full bg-cyan-500/20 blur-sm left-1/2 animate-pulse delay-75"></div>
        <div className="absolute w-1 h-full bg-cyan-500/20 blur-sm left-3/4 animate-pulse delay-150"></div>
        <div className="absolute bottom-0 w-full h-1 bg-cyan-500 blur-[100px]"></div>
        
        <div className="absolute top-8 left-8">
          <svg className="w-12 h-12 text-cyan-500 animate-spin-slow" viewBox="0 0 100 100">
            <g fill="currentColor">
              <path d="M50,16.6c-18.5,0-33.4,15-33.4,33.4s15,33.4,33.4,33.4s33.4-15,33.4-33.4S68.5,16.6,50,16.6z M50,76.3
                c-14.4,0-26.3-11.9-26.3-26.3S35.6,23.7,50,23.7S76.3,35.6,76.3,50S64.4,76.3,50,76.3z"/>
              <circle cx="50" cy="50" r="8.9"/>
            </g>
          </svg>
        </div>
      </div>

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md p-8">
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/10">
          <h2 className="text-3xl font-bold text-center text-white mb-8">Login</h2>
          
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 bg-black/30 border border-cyan-500/30 text-white rounded-lg focus:outline-none focus:border-cyan-500 transition-colors placeholder-gray-500"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 bg-black/30 border border-cyan-500/30 text-white rounded-lg focus:outline-none focus:border-cyan-500 transition-colors placeholder-gray-500"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-400">
                <input type="checkbox" className="mr-2 w-4 h-4 border-gray-300 rounded focus:ring-cyan-500" />
                Remember me
              </label>
              <a href="#" className="text-cyan-500 hover:text-cyan-400">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all"
            >
              Sign in
            </button>

            <p className="text-center text-gray-400 mt-4">
              Don't have an account?{' '}
              <Link to="/signup" className="text-cyan-500 hover:text-cyan-400">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;