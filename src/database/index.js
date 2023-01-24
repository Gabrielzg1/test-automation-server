/* import mongoose from "mongoose";
import config from "../config/database"; */
const mongoose = require("mongoose")
const config = require("../config/database").default


class Database {
  constructor() {
    this.connection = mongoose.connect(config.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database -> Connected");
  }
}

export default new Database();
