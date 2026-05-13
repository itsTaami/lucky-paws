import { Request, Response } from "express";
import Card from "../models/card";

const getCard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);
    res.status(200).json({ success: true, card });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find({});
    res.status(200).json({ success: true, cards });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const createCard = async (req: Request, res: Response) => {
  const { user_Id } = req.body;
  if (!user_Id) {
    return res.status(400).json({ message: "user_Id is required" });
  }
  try {
    const card = await Card.create(req.body);
    res.status(201).json({ message: "Card created successfully", card });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateCard = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Card ID is required" });
  }
  try {
    const card = await Card.findByIdAndUpdate(id, req.body, { new: true });
    if (!card) {
      return res.status(404).json({ message: `Card with ID ${id} not found` });
    }
    res.status(200).json({ message: "Card updated successfully", card });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteCard = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Card ID is required" });
  }
  try {
    const card = await Card.findByIdAndDelete(id);
    res.status(200).json({ message: `Card ${id} deleted`, card });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getCard, getAllCards, deleteCard, updateCard, createCard };
