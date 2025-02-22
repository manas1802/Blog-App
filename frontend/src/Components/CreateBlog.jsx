import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { endpoints } from '../config/api';

const CreateBlog = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [blogData, setBlogData] = useState({
    title: '',
    description: '',
    content: '',
    category: 'Technology',
    imageUrl: '',
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBlogData(prev => ({
        ...prev,
        imageUrl: file
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(endpoints.blogs.create, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: blogData.title,
          content: blogData.content,
          description: blogData.description,
          category: blogData.category
        }),
      });

      const data = await response.json();
      if (data.success) {
        navigate('/blogs');
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error creating blog:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Create New Blog</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={blogData.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-black/40 border border-white/10 text-white px-4 py-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Enter your blog title"
            />
          </div>

          {/* Category Select */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-300">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={blogData.category}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-black/40 border border-white/10 text-white px-4 py-2 focus:ring-cyan-500 focus:border-cyan-500"
            >
              <option>Technology</option>
              <option>Travel</option>
              <option>Food</option>
              <option>Lifestyle</option>
              <option>Business</option>
              <option>Health</option>
            </select>
          </div>

          {/* Description Input */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              required
              value={blogData.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md bg-black/40 border border-white/10 text-white px-4 py-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Brief description of your blog"
            />
          </div>

          {/* Content Input */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-300">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              required
              value={blogData.content}
              onChange={handleChange}
              rows={10}
              className="mt-1 block w-full rounded-md bg-black/40 border border-white/10 text-white px-4 py-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Write your blog content here..."
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Cover Image
            </label>
            <div className="mt-1 flex items-center space-x-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-cyan-500 file:text-white hover:file:bg-cyan-600"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-20 w-20 object-cover rounded-md"
                />
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-md text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Publishing...' : 'Publish Blog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog; 