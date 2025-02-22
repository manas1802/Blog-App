import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { endpoints } from '../config/api';

const Blogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(endpoints.blogs.getAll, {
        credentials: 'include'
      });
      const data = await response.json();
      
      if (data.success) {
        setBlogs(data.data.blogs);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Latest Blogs</h1>
          <button
            onClick={() => navigate('/create-blog')}
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-md hover:from-cyan-600 hover:to-blue-600 transition-all flex items-center gap-2"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 4v16m8-8H4" 
              />
            </svg>
            Create Blog
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div 
                key={blog._id} 
                className="bg-gray-900 rounded-lg overflow-hidden shadow-lg"
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold text-white mb-2">{blog.title}</h2>
                  <p className="text-gray-400 mb-4">{blog.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-500">{blog.category}</span>
                    <button 
                      onClick={() => navigate(`/blog/${blog._id}`)}
                      className="text-white hover:text-cyan-500"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white col-span-full text-center">No blogs found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;