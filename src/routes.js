import { Router } from "express";
import multer from "multer";
//Importing the controllers
import HelloController from "./controllers/HelloController";
import SubjectsController from "./controllers/SubjectsController";
import UsersController from "./controllers/UsersController";
import AdminSessionController from "./controllers/AdminSessionController";
import AdminController from "./controllers/AdminController";
import TaskController from "./controllers/TaskController";
import ResultController from "./controllers/ResultController";
import UserSessionController from "./controllers/UserSessionController";

import storage from "./config/storage";
import auth from "./middleware/auth";


const upload = multer({ storage: storage })
const routes = new Router();

//Rotas publicas
routes.get("/hello", HelloController.index);
routes.post("/adminSession", AdminSessionController.create);
routes.post("/userSession", UserSessionController.create);

//routes.use(auth);

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
routes.get("/users/subjects/:name", SubjectsController.show)




//Tasks routes
routes.get("/subjects/:subject_id/tasks", TaskController.index);
routes.get("/subjects/:subject_id/tasks/:id", TaskController.show);

routes.post("/subjects/:subject_id/tasks", upload.single("file"), TaskController.create);

routes.delete("/subjects/:subject_id/tasks/:id", TaskController.destroy);
routes.put(
	"/subjects/:subject_id/tasks/:id/generateOutputs",
	TaskController.generateOutputs
);
routes.put("/subjects/:subject_id/tasks/:id", TaskController.updateOutputs);

//Result Routes
routes.get("/user/:user_id/task/:task_id/result", ResultController.index);
routes.post("/user/:user_id/task/task:id/result", ResultController.create);
routes.delete(
	"/user/:user_id/task/task:id/result/:id",
	ResultController.destroy
);
routes.post("/files", upload.single("file"), TaskController.sendFile)

//Admins Routes
routes.get("/admin", AdminController.index);
routes.get("/admin/:id", AdminController.show);
routes.post("/admin", AdminController.create);
routes.put("/admin/:id", AdminController.update);
routes.delete("/admin", AdminController.destroy);

export default routes;
