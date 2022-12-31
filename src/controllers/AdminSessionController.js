import jwt from "jsonwebtoken";
import Admin from "../models/Admin";

import { checkPassword } from "../services/auth";
import authConfig from "../config/auth";

class AdminSessionController {
  async create(req, res) {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ error: "email / password invalid" });
    }
    if (!checkPassword(admin, password)) {
      return res.status(401).json({ error: "password invalid" });
    }
    const { id } = admin;
    console.log("Sucessful", email);
    return res.json({
      admin: {
        id,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new AdminSessionController();
