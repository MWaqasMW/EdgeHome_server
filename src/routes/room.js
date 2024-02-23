import express from "express";
import {
  createRoom,
  deletebyIdRoom,
  getByIdRoom,
  getRooms,
  updateRoom,
} from "../controller/room.js";
import { verfiyAdmin } from "../utils/verfiy.js";

const router = express.Router();

router.post("/:hotelId", verfiyAdmin, createRoom);

// Update an existing hotel by ID
router.put("/:id", verfiyAdmin, updateRoom);

// Delete a Room by ID
router.delete("/:id/:hotelId", verfiyAdmin, deletebyIdRoom);

// Get all Rooms
router.get("/", getRooms);

// Get a single Room by ID
router.get("/:id", getByIdRoom);

export default router;
