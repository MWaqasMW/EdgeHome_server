import express from "express";

import {
  deletebyIdUser,
  getByIdUser,
  getUser,
  updateUser,
} from "../controller/users.js";
import { verfiyToken } from "../utils/verfiyToken.js";

const router = express.Router();

// Create a new User

// Update an existing User by ID
router.put("/:id", verfiyToken, updateUser);

// Delete a User by ID
router.delete("/:id", deletebyIdUser);

// Get all Users
router.get("/", getUser);

// Get a single User by ID
router.get("/:id", getByIdUser);

export default router;
