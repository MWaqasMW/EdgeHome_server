import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createHotel = async (req, res, next) => {
  try {
    const newHotel = new Hotel(req.body);
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (error) {
    next(error);
  }
};
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params?.id,
      req.body,
      { new: true }
    );
    if (!updatedHotel) {
      return next(createError(404, "Not Found"));
    }
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};
export const getHotel = async (req, res, next) => {
  try {
    const allHotels = await Hotel.find();
    if (!allHotels) return next(404, "Not Found");
    res.status(200).json(allHotels);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deletebyIdHotel = async (req, res, next) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!deletedHotel) {
      return next(createError(404, "Not Found"));
    }
    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    next(error);
  }
};
export const getByIdHotel = async (req, res, next) => {
  try {
    const findOne = await Hotel.findById(req.params.id);
    if (!findOne) return next(createError(404, "Not Found"));
    res.status(200).json(findOne);
  } catch (error) {
    next(error);
  }
};
