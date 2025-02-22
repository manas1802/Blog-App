const API_BASE_URL = 'http://localhost:3000/api';

export const endpoints = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
    logout: `${API_BASE_URL}/auth/logout`,
    sendVerifyOtp: `${API_BASE_URL}/auth/send-verify-otp`,
    verifyEmail: `${API_BASE_URL}/auth/verify-email`,
  },
  user: {
    data: `${API_BASE_URL}/user/data`,
  },
  blogs: {
    create: `${API_BASE_URL}/blog`,
    getAll: `${API_BASE_URL}/blog`,
    getById: (id) => `${API_BASE_URL}/blog/${id}`,
    update: (id) => `${API_BASE_URL}/blog/${id}`,
    delete: (id) => `${API_BASE_URL}/blog/${id}`,
  }
}; 