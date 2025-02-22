import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
  createBlog,
  deleteBlog,
  getBlogById,
  getBlogs,
  updateBlog,
} from "../controllers/blogControllers.js";

const blogRouter = express.Router();

blogRouter.post("/", userAuth, createBlog); // Create a new blog
blogRouter.put("/:id", userAuth, updateBlog); // Update a blog by ID
blogRouter.delete("/:id", userAuth, deleteBlog); // Delete a blog by ID
blogRouter.get("/", getBlogs); // Get all blogs
blogRouter.get("/:id", getBlogById); // Get a specific blog by ID

export default blogRouter;
