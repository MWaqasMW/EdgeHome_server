import jwt from "jsonwebtoken";

export const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { userId: user._id, isAdmin: user.isAdmin },
    process.env.ACCESS_TOKEN_SECRET
    // { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { userId: user._id, isAdmin: user.isAdmin },
    process.env.REFRESH_TOKEN_SECRET
  );

  return { accessToken, refreshToken };
};
