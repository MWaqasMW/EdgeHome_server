import express from "express";
import Hotel from "../models/Hotel.js";

const router = express.Router();

// Create a new hotel
router.post("/", async (req, res) => {
  try {
    const newHotel = new Hotel(req.body);
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update an existing hotel by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedHotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }
    res.status(200).json(updatedHotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a hotel by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!deletedHotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }
    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all hotels
router.get("/", async (req, res) => {
  try {
    const allHotels = await Hotel.find();
    res.status(200).json(allHotels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get a single hotel by ID
router.get("/:id", async (req, res) => {
  try {
    const oneHotel = await Hotel.findById(req.params.id);
    if (!oneHotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }
    res.status(200).json(oneHotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
