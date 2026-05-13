import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const signUp = async (req: Request, res: Response) => {
  const { name, email, password: plainTextPassword, profileImg } = req.body;
  if (!name || typeof name !== "string") {
    return res.status(400).json({ status: "error", error: "Invalid username" });
  }
  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.status(400).json({ status: "error", error: "Invalid password" });
  }
  if (plainTextPassword.length < 7) {
    return res.status(400).json({
      status: "error",
      error: "Password must be at least 8 characters",
    });
  }
  const password = bcrypt.hashSync(plainTextPassword, 10);
  try {
    const user = await User.create({ name, email, password, profileImg });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error: any) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ status: "error", error: "Email already in use" });
    }
    throw error;
  }
};

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ status: "error", error: "Invalid email or password" });
  }
  if (bcrypt.compareSync(password, String(user.password))) {
    const token = jwt.sign({ id: user._id, username: user.name }, JWT_SECRET);
    return res.json({ status: "ok", user, token });
  }
  res.status(400).json({ status: "error", error: "Invalid email or password" });
};

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({ message: `User ${id} deleted`, user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getFavAnimal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const user = await User.findById(id).populate({ path: "favAnimal" });
    if (!user) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }
    res.status(200).json({ success: true, favorites: user.favAnimal });
  } catch (error) {
    next(error);
  }
};

export const addFavAnimal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { favoriteId } = req.body;
  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }
    user.favAnimal.push(favoriteId);
    await user.save();
    res.status(200).json({ message: "Added to favourites", user });
  } catch (error) {
    next(error);
  }
};

export const removeFavAnimal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { favoriteId } = req.body;
  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }
    const idx = user.favAnimal.indexOf(favoriteId);
    if (idx < 0) {
      return res.status(404).json({ message: `Favourite ${id} not found` });
    }
    user.favAnimal.splice(idx, 1);
    await user.save();
    res.status(200).json({ message: "Removed from favourites", user });
  } catch (error) {
    next(error);
  }
};

export const getShoppingProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const user = await User.findById(id).populate({ path: "productList" });
    if (!user) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }
    res.status(200).json({ success: true, productList: user.productList });
  } catch (error) {
    next(error);
  }
};

export const addShoppingProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { productListId } = req.body;
  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }
    user.productList.push(productListId);
    await user.save();
    res.status(200).json({ message: "Added to cart", user });
  } catch (error) {
    next(error);
  }
};

export const removeShoppingProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { productListId } = req.body;
  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }
    const idx = user.productList.indexOf(productListId);
    if (idx < 0) {
      return res.status(404).json({ message: `Product ${productListId} not in cart` });
    }
    user.productList.splice(idx, 1);
    await user.save();
    res.status(200).json({ message: "Removed from cart", user });
  } catch (error) {
    next(error);
  }
};

export { getUser, getAllUsers, deleteUser, updateUser, signUp, signIn };
