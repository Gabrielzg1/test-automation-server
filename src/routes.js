import { Router } from "express";
import HelloController from "./controllers/HelloController";
import RepositoriesController from "./controllers/RepositoriesController";
import UsersController from "./controllers/UsersController";
import auth from "./middleware/auth";
import SessionController from "./controllers/SessionController";

const routes = new Router();
//Rotas publicas
routes.get("/hello", HelloController.index);
routes.post("/sessions", SessionController.create);

routes.use(auth);

//Rotas privadas
//Users routes
routes.get("/users", UsersController.index);
routes.get("/users/:id", UsersController.show);
routes.post("/users", UsersController.create);
routes.put("/users/:id", UsersController.update);
routes.delete("/users/:id", UsersController.destroy);

//Repository routes
routes.get("/users/:user_id/repositories", RepositoriesController.index);
routes.post("/users/:user_id/repositories", RepositoriesController.create);
routes.delete(
  "/users/:user_id/repositories/:id",
  RepositoriesController.destroy
);

export default routes;
