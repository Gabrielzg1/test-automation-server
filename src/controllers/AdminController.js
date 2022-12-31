import Admin from "../models/Admin";
import bcrypt from "bcryptjs";

class AdminController {
  async index(req, res) {
    try {
      const admins = await Admin.find();
      return res.json(admins);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const admin = await Admin.findById(id);
      if (!admin) return res.status(404).json({ msg: "Admin not found" });
      return res.json(admin);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
  async create(req, res) {
    try {
      const { username, email, password } = req.body;
      const admin = await Admin.findOne({ email });

      if (admin) {
        return res
          .status(422)
          .json({ message: `Admin ${email} alreary exists` });
      }

      //crypt the password
      const encryptedPassword = await bcrypt.hash(password, 8);
      const newAdmin = await Admin.create({
        username: username.toUpperCase(),
        email: email.toLowerCase(),
        password: encryptedPassword,
      });

      return res.status(201).json(newAdmin);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      const { email, password } = req.body;

      const admin = await Admin.findById(id);

      if (!admin) {
        return res.status(404).json({ msg: "Admin not found" });
      }
      const encryptedPassword = await bcrypt.hash(password, 8);
      await admin.updateOne({
        email: email.toLowerCase(),
        password: encryptedPassword,
      });

      return res.status(200).json();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
  async destroy(req, res) {
    try {
      const { id } = req.params;
      const admin = await Admin.findById(id);
      if (!admin) {
        return res.status(404).json();
      }
      await admin.deleteOne();
      return res.status(200).json();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
}
export default new AdminController();
