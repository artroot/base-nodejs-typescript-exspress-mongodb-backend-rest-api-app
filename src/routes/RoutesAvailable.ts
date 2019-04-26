/**
 * @author Artem Semenishch <a.semenishch@gmail.com>
 */

import * as express from "express";

import * as UserRoute from "./UserRoute";

import * as GroupRoute from "./GroupRoute";

import * as AuthRoute from "./AuthRoute";

const RoutesAvailable = express.Router();

RoutesAvailable.use('/auth', AuthRoute);

RoutesAvailable.use(UserRoute);

RoutesAvailable.use(GroupRoute);

module.exports = RoutesAvailable;
