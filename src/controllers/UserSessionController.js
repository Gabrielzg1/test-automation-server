import jwt from "jsonwebtoken";
import Users from "../models/Users";
import bcrypt from "bcryptjs"

import authConfig from "../config/auth";

class SessionController {
  async create(req, res) {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User / password invalid" });
    }

    if (!await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: "password invalid" });
    }

    const { id } = user;
    return res.json({
      user: {
        id,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
