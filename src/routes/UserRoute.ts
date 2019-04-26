/**
 * @author Artem Semenishch <a.semenishch@gmail.com>
 */

import * as express from "express";

import UserController from "../controllers/UserController";

const UserRoute = express.Router();

UserRoute.get("/users", UserController.getAll);

UserRoute.get("/user/:id?", UserController.getById);

UserRoute.post("/user", UserController.create);

UserRoute.put("/user/:id", UserController.update);

UserRoute.delete("/user/:id", UserController.delete);

module.exports = UserRoute;