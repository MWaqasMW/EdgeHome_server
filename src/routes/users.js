import express from "express";

import {
  deletebyIdUser,
  getByIdUser,
  getUser,
  updateUser,
} from "../controller/users.js";
import { verfiyAdmin, verfiyToken, verfiyUser } from "../utils/verfiy.js";

const router = express.Router();

// Create a new User

// router.get("/check/:id", verfiyUser, (req, res, next) => {
//     res.json("your are allowed fo this");
//   });

//   router.get("/checkAdmin", verfiyAdmin, (req, res, next) => {
//     res.json("your are Admin");
//   });

// Update an existing User by ID
router.put("/:id", verfiyUser, updateUser);

// Delete a User by ID
router.delete("/:id", verfiyUser, deletebyIdUser);

// Get all Users
router.get("/", verfiyAdmin, getUser);

// Get a single User by ID
router.get("/:id", verfiyUser, getByIdUser);

export default router;
