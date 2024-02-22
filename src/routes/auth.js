import express from "express";
import { loginUser, registerUser } from "../controller/auth.js";
import { verfiyToken } from "../utils/verfiyToken.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

export default router;
