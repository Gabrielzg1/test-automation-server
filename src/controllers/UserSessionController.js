import jwt from "jsonwebtoken";
import Users from "../models/Users";
import Admin from "../models/Admin";

import { checkPassword } from "../services/auth";
import authConfig from "../config/auth";

class SessionController {
  async create(req, res) {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User / password invalid" });
    }
    if (!checkPassword(user, password)) {
      return res.status(401).json({ error: "password invalid" });
    }
    const { id } = user;
    console.log("Sucessful", email);
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
