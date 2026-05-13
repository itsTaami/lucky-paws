import { Request, Response } from "express";
import BlogCategory from "../models/blogCategories";

const getBlogCat = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blogCategory = await BlogCategory.findById(id);
    res.status(200).json({ success: true, blogCategory });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllBlogCats = async (req: Request, res: Response) => {
  try {
    const blogCategories = await BlogCategory.find({});
    res.status(200).json({ success: true, blogCategories });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const createBlogCat = async (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }
  try {
    const blogCategory = await BlogCategory.create(req.body);
    res.status(201).json({ message: "Blog category created successfully", blogCategory });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateBlogCat = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Blog category ID is required" });
  }
  try {
    const blogCategory = await BlogCategory.findByIdAndUpdate(id, req.body, { new: true });
    if (!blogCategory) {
      return res.status(404).json({ message: `Blog category with ID ${id} not found` });
    }
    res.status(200).json({ message: "Blog category updated successfully", blogCategory });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteBlogCat = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Blog category ID is required" });
  }
  try {
    const blogCategory = await BlogCategory.findByIdAndDelete(id);
    res.status(200).json({ message: `Blog category ${id} deleted`, blogCategory });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getBlogCat, getAllBlogCats, deleteBlogCat, updateBlogCat, createBlogCat };
