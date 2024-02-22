import jwt from "jsonwebtoken";

import { createError } from "./error.js";

export const verfiyToken = async (req, res, next) => {
  const header = req.headers?.cookie;
  const token = header?.split(`=`)[1];
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

export const verfiyUser = (req, res, next) => {
  verfiyToken(req, res, () => {
    try {
      if (req.user?.userId === req.params?.id || req.user?.isAdmin) {
        next();
      } else {
        return next(createError(401, "Unuthorized"));
      }
    } catch (err) {
      console.log(err);
    }
  });
};
export const verfiyAdmin = (req, res, next) => {
  verfiyToken(req, res, next, () => {
    try {
      if (req.user?.isAdmin) {
        return next();
      } else {
        return next(createError(401, "Unuthorized only Admin"));
      }
    } catch (err) {
      console.log(err);
    }
  });
};
