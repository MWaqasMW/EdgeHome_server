import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
export const createRoom = async (req, res, next) => {
  const hotelId = req.params?.hotelId;
  try {
    const newRoom = new Room(req.body);
    const savedRoom = await newRoom.save();

    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params?.id,
      { $set: req.body },
      {
        new: true,
      }
    );
    if (!updatedRoom) {
      return next(createError(404, "Not Found"));
    }
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};
export const getRooms = async (req, res, next) => {
  try {
    const allRooms = await Room.find();
    if (!allRooms) return next(404, "Not Found");
    res.status(200).json(allRooms);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deletebyIdRoom = async (req, res, next) => {
  const hotelId = req.params?.hotelId;
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom) {
      return next(createError(404, "Not Found"));
    }
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params?.id },
      });
    } catch (error) {
      next(error);
    }

    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    next(error);
  }
};
export const getByIdRoom = async (req, res, next) => {
  try {
    const findOne = await Room.findById(req.params?.id);
    if (!findOne) return next(createError(404, "Not Found"));
    res.status(200).json(findOne);
  } catch (error) {
    next(error);
  }
};
