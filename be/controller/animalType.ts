import { Request, Response } from "express";
import AnimalType from "../models/animalType";

const getAnimalType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const animalType = await AnimalType.findById(id);
    res.status(200).json({ success: true, animalType });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllAnimalTypes = async (req: Request, res: Response) => {
  try {
    const animalTypes = await AnimalType.find({});
    res.status(200).json({ success: true, animalTypes });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const createAnimalType = async (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }
  try {
    const animalType = await AnimalType.create(req.body);
    res.status(201).json({ message: "Animal type created successfully", animalType });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateAnimalType = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Animal type ID is required" });
  }
  try {
    const animalType = await AnimalType.findByIdAndUpdate(id, req.body, { new: true });
    if (!animalType) {
      return res.status(404).json({ message: `Animal type with ID ${id} not found` });
    }
    res.status(200).json({ message: "Animal type updated successfully", animalType });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteAnimalType = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Animal type ID is required" });
  }
  try {
    const animalType = await AnimalType.findByIdAndDelete(id);
    res.status(200).json({ message: `Animal type ${id} deleted`, animalType });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getAnimalType,
  getAllAnimalTypes,
  deleteAnimalType,
  updateAnimalType,
  createAnimalType,
};
