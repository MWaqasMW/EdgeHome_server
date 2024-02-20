import express from "express";
import Hotel from "../models/Hotel";
const router = express.Router();

router.post("/", (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const saveHotel = newHotel.sava();
    res.status(200).json(saveHotel);
  } catch (err) {}
});

export default router;
