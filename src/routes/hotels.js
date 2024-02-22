import express from "express";

import {
  createHotel,
  deletebyIdHotel,
  getByIdHotel,
  getHotel,
  updateHotel,
} from "../controller/room.js";

const router = express.Router();

// Create a new hotel
router.post("/", createHotel);

// Update an existing hotel by ID
router.put("/:id", updateHotel);

// Delete a hotel by ID
router.delete("/:id", deletebyIdHotel);

// Get all hotels
router.get("/", getHotel);

// Get a single hotel by ID
router.get("/:id", getByIdHotel);

export default router;
