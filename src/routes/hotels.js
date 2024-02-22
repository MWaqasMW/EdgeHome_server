import express from "express";

import {
  createHotel,
  deletebyIdHotel,
  getByIdHotel,
  getHotel,
  updateHotel,
} from "../controller/hotels.js";
import { verfiyAdmin } from "../utils/verfiy.js";

const router = express.Router();

// Create a new hotel
router.post("/", verfiyAdmin, createHotel);

// Update an existing hotel by ID
router.put("/:id", verfiyAdmin, updateHotel);

// Delete a hotel by ID
router.delete("/:id", verfiyAdmin, deletebyIdHotel);

// Get all hotels
router.get("/", getHotel);

// Get a single hotel by ID
router.get("/:id", getByIdHotel);

export default router;
