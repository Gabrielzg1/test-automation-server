/* import { Router } from "express";
import multer from "multer";
//Importing the controllers
import SubjectsController from "./controllers/SubjectsController";
import UsersController from "./controllers/UsersController";
import AdminSessionController from "./controllers/AdminSessionController";
import AdminController from "./controllers/AdminController";
import TaskController from "./controllers/TaskController";
import ResultController from "./controllers/ResultController";
import UserSessionController from "./controllers/UserSessionController";

import { storage, storageUser } from "./config/storage";
import auth from "./middleware/auth";
*/
const routes = require("express").Router()
const multer = require("multer")
const SubjectsController = require("./controllers/SubjectsController")
const UsersController = require('./controllers/UsersController')
const AdminController = require("./controllers/AdminController")
const TaskController = require("./controllers/TaskController")
const ResultController = require("./controllers/ResultController")
const UserSessionController = require("./controllers/UserSessionController")
const AdminSessionController = require("./controllers/AdminSessionController")
const { storage, storageUser } = require("./config/storage")
const auth = require("./middleware/auth")



const upload = multer({ storage: storage });
const uploadUser = multer({ storage: storageUser });
//const routes = new Router();

//Rotas publicas

routes.post("/adminSession", AdminSessionController.create);
routes.post("/userSession", UserSessionController.create);

routes.use(auth, (req, res) => { });

//Rotas privadas
//Users routes
routes.get("/users", UsersController.index);
routes.get("/users/:id", UsersController.show);
routes.get("/users/showSubjects/:id", UsersController.showSubjects);

routes.post("/users", UsersController.create);
routes.put("/users/:id", UsersController.update);
routes.delete("/users/:id", UsersController.destroy);

//Subjects routes

routes.get("/admin/:admin_id/subjects", SubjectsController.index_admin);
routes.post("/admin/:admin_id/subjects", SubjectsController.create);
routes.delete(
	"/admin/:admin_id/subjects/:id",

	SubjectsController.destroy
);
routes.get("/users/subjects/:name", SubjectsController.show);

//Tasks routes
routes.get("/subjects/:subject_id/tasks", TaskController.index);
routes.get("/subjects/:subject_id/tasks/:id", TaskController.show);
routes.post(
	"/subjects/:subject_id/tasks",
	upload.single("file"),
	TaskController.create
);

routes.get(
	"/subjects/:subject_id/tasks/:task_id/:id",
	TaskController.userCreateFolder
);

routes.delete("/subjects/:subject_id/tasks/:id", TaskController.destroy);
routes.put(
	"/subjects/:subject_id/tasks/:id/generateOutputs",
	TaskController.generateOutputs
);
routes.put("/subjects/:subject_id/tasks/:id", TaskController.updateOutputs);

//Result Routes
//Show the specific result to an user
routes.get("/user/:user_id/task/:task_id/result", ResultController.show);
//Show all the results to the specific task
routes.get("/task/:task_id/result", ResultController.index);

routes.post("/user/:user_id/task/:task_id/result", ResultController.create);

routes.delete(
	"/user/:user_id/task/:task_id/result/:id",
	ResultController.destroy
);

//Files
routes.post("/files", upload.single("file"), TaskController.sendFile);
routes.post(
	"/filesUser",
	uploadUser.single("file"),
	TaskController.userSendFile
);

//Admins Routes
routes.get("/admin", AdminController.index);
routes.get("/admin/:id", AdminController.show);
routes.post("/admin", AdminController.create);
routes.put("/admin/:id", AdminController.update);
routes.delete("/admin", AdminController.destroy);

module.exports = routes;
