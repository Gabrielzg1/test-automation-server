import { Router } from "express";
import HelloController from "./controllers/HelloController";
import SubjectsController from "./controllers/SubjectsController";
import UsersController from "./controllers/UsersController";
import auth from "./middleware/auth";
import SessionController from "./controllers/SessionController";
import AdminController from "./controllers/AdminController";

const routes = new Router();
//Rotas publicas
routes.get("/hello", HelloController.index);
routes.post("/sessions", SessionController.create);

//routes.use(auth);

//Rotas privadas
//Users routes
routes.get("/users", UsersController.index);
routes.get("/users/:id", UsersController.show);
routes.post("/users", UsersController.create);
routes.put("/users/:id", UsersController.update);
routes.delete("/users/:id", UsersController.destroy);

//Subjects routes

routes.get("/users/:user_id/subjects", SubjectsController.index_user);
routes.get("/admin/:admin_id/subjects", SubjectsController.index_admin);
routes.post("/admin/:admin_id/subjects", SubjectsController.create);
routes.delete(
  "/admins/:admins_id/subjects/:id",
  auth,
  SubjectsController.destroy
);

//Tasks routes
//routes.get("/users/:user_id/subjects/:subject_id/tasks", )
//Admins Routes
routes.get("/admin", AdminController.index);
routes.get("/admin/:id", AdminController.show);
routes.post("/admin", AdminController.create);
routes.put("/admin/:id", AdminController.update);
routes.delete("/admin", AdminController.destroy);

//

export default routes;
