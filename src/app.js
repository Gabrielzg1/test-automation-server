//import cors from "cors";
//import routes from "./routes";
const express = require("express");
const cors = require("cors")
const routes = require("./routes")
require("./database/index")

class App {
	constructor() {
		this.server = express();
		this.middlewares();
		this.routes();
		console.log("Running on http://localhost:2020");
	}
	middlewares() {
		this.server.use(express.json());
		this.server.use(cors());
	}
	routes() {
		this.server.use(routes);
	}
}

module.exports = new App().server;
