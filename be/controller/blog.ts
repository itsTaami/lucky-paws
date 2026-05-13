import { Request, Response } from "express";
import Blog from "../models/blog";

const getBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find({})
      .sort({ date: 1 })
      .populate("blogCategory")
      .populate("publishedBy");
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const createBlog = async (req: Request, res: Response) => {
  const { title, description, imgList } = req.body;
  if (!title || !description || !imgList) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Blog ID is required" });
  }
  try {
    const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    if (!blog) {
      return res.status(404).json({ message: `Blog with ID ${id} not found` });
    }
    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Blog ID is required" });
  }
  try {
    const blog = await Blog.findByIdAndDelete(id);
    res.status(200).json({ message: `Blog ${id} deleted`, blog });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getBlog, getAllBlogs, deleteBlog, updateBlog, createBlog };
