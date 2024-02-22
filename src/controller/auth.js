import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import { generateTokens } from "../utils/genToken.js";

export const registerUser = async (req, res, next) => {
  const { password, ...rest } = req.body;
  const salt = bcrypt.genSaltSync(8);
  const hash = bcrypt.hashSync(password, salt);

  try {
    const newUser = new User({ ...rest, password: hash });
    const savedUser = await newUser.save();

    const { password: userPassword, ...userWithoutPassword } =
      savedUser.toObject();

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(createError(404, "user not found"));

    const isCorrect = await bcrypt.compareSync(password, user?.password);
    if (!isCorrect) {
      return next(createError(401, "Password is Incorrect"));
    }

    const { password: userPassword, isAdmin, ...others } = user?._doc;

    const token = generateTokens(user);
    const data = {
      ...others,
      token,
    };
    res.cookie("access_token", token?.accessToken, {
      httpOnly: true,
    });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
