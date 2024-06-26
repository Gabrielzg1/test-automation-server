/* import jwt from "jsonwebtoken";
import authConfig from "../config/auth";
import { promisify } from "util"; */
const { promisify } = require("util")
const authConfig = require("../config/auth")
const jwt = require("jsonwebtoken")


module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token was not provided" });
  }
  const [, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid Token" });
  }
};
