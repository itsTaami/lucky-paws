import { Request, Response } from "express";
import ProductType from "../models/productType";

const getProductType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productType = await ProductType.findById(id);
    res.status(200).json({ success: true, productType });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllProductTypes = async (req: Request, res: Response) => {
  try {
    const productTypes = await ProductType.find({}).populate("storeCategory");
    res.status(200).json({ success: true, productTypes });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const createProductType = async (req: Request, res: Response) => {
  const { title, StoreCategory } = req.body;
  if (!title || !StoreCategory) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const productType = await ProductType.create(req.body);
    res.status(201).json({ message: "Product type created successfully", productType });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProductType = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Product type ID is required" });
  }
  try {
    const productType = await ProductType.findByIdAndUpdate(id, req.body, { new: true });
    if (!productType) {
      return res.status(404).json({ message: `Product type with ID ${id} not found` });
    }
    res.status(200).json({ message: "Product type updated successfully", productType });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProductType = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Product type ID is required" });
  }
  try {
    const productType = await ProductType.findByIdAndDelete(id);
    res.status(200).json({ message: `Product type ${id} deleted`, productType });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getProductType,
  getAllProductTypes,
  deleteProductType,
  updateProductType,
  createProductType,
};
