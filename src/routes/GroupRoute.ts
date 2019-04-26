/**
 * @author Artem Semenishch <a.semenishch@gmail.com>
 */

import * as express from "express";

const GroupRoute = express.Router();

import GroupController from "../controllers/GroupController";

GroupRoute.get("/groups", GroupController.getAll);

GroupRoute.get("/group/:id", GroupController.getById);

GroupRoute.post("/group", GroupController.create);

GroupRoute.put("/group/:id", GroupController.update);

GroupRoute.delete("/group/:id", GroupController.delete);

module.exports = GroupRoute;