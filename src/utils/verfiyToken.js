import jwt from "jsonwebtoken";

import { createError } from "./error.js";

export const verfiyToken = async (req, res, next) => {
  const header = req.headers?.cookie;
  const token = header?.split(`=`)[1];
  console.log(token);
  try {
    if (!token) return next(createError(401, "user are unuthorized"));
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return next(createError(403, "invalid Token"));
      req.user = user;
      next();
    });
  } catch (err) {
    console.log("err", err.message);
  }
};
