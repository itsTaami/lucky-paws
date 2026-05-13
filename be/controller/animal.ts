import { Request, Response } from "express";
import Animal from "../models/animal";

const getAnimal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const animal = await Animal.findById(id);
    res.status(200).json({ success: true, animal });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getFilteredAnimal = async (req: Request, res: Response) => {
  const { type } = req.params;
  try {
    const animals = await Animal.find({ animaltype: type }).populate("animaltype");
    res.status(200).json({ success: true, animals });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllAnimals = async (req: Request, res: Response) => {
  try {
    const animals = await Animal.find({})
      .populate("animaltype")
      .populate("publishedBy");
    res.status(200).json({ success: true, animals });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const createAnimal = async (req: Request, res: Response) => {
  const { imgs, age, size, gender, health, location, publishedBy, animaltype } =
    req.body;
  if (!imgs || !age || !size || !gender || !health || !location || !publishedBy || !animaltype) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const animal = await Animal.create(req.body);
    res.status(201).json({ message: "Animal created successfully", animal });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateAnimal = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Animal ID is required" });
  }
  try {
    const animal = await Animal.findByIdAndUpdate(id, req.body, { new: true });
    if (!animal) {
      return res.status(404).json({ message: `Animal with ID ${id} not found` });
    }
    res.status(200).json({ message: "Animal updated successfully", animal });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteAnimal = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Animal ID is required" });
  }
  try {
    const animal = await Animal.findByIdAndDelete(id);
    res.status(200).json({ message: `Animal ${id} deleted`, animal });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getAnimal,
  getAllAnimals,
  deleteAnimal,
  updateAnimal,
  createAnimal,
  getFilteredAnimal,
};
