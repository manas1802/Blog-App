import blogModel from "../models/blogModel.js";

export const createBlog = async (req, res) => {
  const { title, content, tags } = req.body;

  if (!title || !content || !tags) {
    return res.json({
      success: false,
      message: "Title, content and tags are required",
    });
  }

  try {
    const newBlog = new blogModel({
      title,
      content,
      tags,
      author: req.user.id,
    });

    const savedBlog = await newBlog.save();

    return res.json({
      success: true,
      data: {
        message: "Blog updated successfully",
        blog: savedBlog,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id);
    if (!blog) {
      return res.json({ success: false, message: "Blog not found by this id" });
    }

    if (blog.author.toString() !== req.user.id) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    blog.tags = req.body.tags || blog.tags;
    blog.updatedAt = Date.now();

    const savedBlog = await blog.save();

    return res.json({
      success: true,
      data: {
        message: "Blog updated successfully",
        blog: savedBlog,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id);

    if (!blog) {
      return res.json({ success: false, message: "No Blog found by this id" });
    }

    if (blog.author.toString() !== req.user.id) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    await blog.deleteOne();

    return res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find().populate("author");

    if (!blogs) {
      return res.json({ success: false, message: "No Blogs" });
    }

    res.json({
      success: true,
      data: {
        message: "Blogs fetched successfully",
        blogs,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id).populate("author");
    if (!blog) {
      return res.json({ success: false, message: "Blog not found by this id" });
    }
    return res.json({
      success: true,
      data: {
        message: "Blog fetched successfully",
        blog: blog,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
