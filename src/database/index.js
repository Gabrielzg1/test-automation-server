/* import mongoose from "mongoose";
import config from "../config/database"; */
const mongoose = require("mongoose")
const config = require("../config/database")


class Database {
  constructor() {
    this.connection = mongoose.connect(config.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database -> Connected");
  }
}

module.exports = new Database();
