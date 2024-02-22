import express from "express";
import dotenv from "dotenv";
const app = express();
import connectDb from "./src/db/index.js";
import authRouter from "./src/routes/auth.js";
import hotelRouter from "./src/routes/hotels.js";
import roomRouter from "./src/routes/room.js";
import userRouter from "./src/routes/users.js";
import { createError } from "./src/utils/error.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDb();
  console.log(`Server running on,${PORT}`);
});

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/hotel", hotelRouter);
app.use("/api/room", roomRouter);
app.use("/api/user", userRouter);

app.use((err, req, res, next) => {
  const falied = true;
  if (falied) return next(createError(401, "you are not authorize"));

  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});
