/**
 * @author Artem Semenishch <a.semenishch@gmail.com>
 */

import * as express from "express";

const AuthRoute = express.Router();

import AuthController from "../controllers/AuthController";

AuthRoute.post("/login", AuthController.login);

AuthRoute.get("/check", AuthController.check);

AuthRoute.get("/logout", AuthController.logout);

module.exports = AuthRoute;