import { Request, Response } from "express";
import Product from "../models/products";

const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getFilteredProduct = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    const products = await Product.find({ productType: type }).populate(
      "productType",
      "title"
    );
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({}).populate("productType");
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const createProduct = async (req: Request, res: Response) => {
  const { title, detail, imgList, price } = req.body;
  if (!title || !detail || !imgList || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Product ID is required" });
  }
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ message: `Product with ID ${id} not found` });
    }
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Product ID is required" });
  }
  try {
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json({ message: `Product ${id} deleted`, product });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  createProduct,
  getFilteredProduct,
};
