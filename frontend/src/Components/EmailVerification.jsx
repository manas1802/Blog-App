import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { endpoints } from '../config/api';

const EmailVerification = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      const response = await fetch(endpoints.auth.sendVerifyOtp, {
        method: 'POST',
        credentials: 'include'
      });
      const data = await response.json();
      
      if (data.success) {
        setMessage('Verification code sent to your email');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Failed to send verification code');
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(endpoints.auth.verifyEmail, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ otp }),
      });
      const data = await response.json();
      
      if (data.success) {
        navigate('/create-blog');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Verify Your Email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Please verify your email to create blogs
          </p>
        </div>

        {message && (
          <div className="bg-blue-500 text-white p-3 rounded-md text-center">
            {message}
          </div>
        )}

        <button
          onClick={sendOtp}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-600"
        >
          Send Verification Code
        </button>

        <form onSubmit={verifyOtp} className="mt-8 space-y-6">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter verification code"
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerification; 