import { Request, Response } from "express";
import StoreCategory from "../models/storeCategory";

const getStoreCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const storeCategory = await StoreCategory.findById(id);
    res.status(200).json({ success: true, storeCategory });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllStoreCategories = async (req: Request, res: Response) => {
  try {
    const storeCategories = await StoreCategory.find({});
    res.status(200).json({ success: true, storeCategories });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const createStoreCategory = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const storeCategory = await StoreCategory.create(req.body);
    res.status(201).json({ message: "Store category created successfully", storeCategory });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateStoreCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Store category ID is required" });
  }
  try {
    const storeCategory = await StoreCategory.findByIdAndUpdate(id, req.body, { new: true });
    if (!storeCategory) {
      return res.status(404).json({ message: `Store category with ID ${id} not found` });
    }
    res.status(200).json({ message: "Store category updated successfully", storeCategory });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteStoreCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Store category ID is required" });
  }
  try {
    const storeCategory = await StoreCategory.findByIdAndDelete(id);
    res.status(200).json({ message: `Store category ${id} deleted`, storeCategory });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getStoreCategory,
  getAllStoreCategories,
  deleteStoreCategory,
  updateStoreCategory,
  createStoreCategory,
};
