const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user });
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  };
  res.cookie("token", token, cookieOptions);
};

const isTokenValid = ({ token }) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  return payload;
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
