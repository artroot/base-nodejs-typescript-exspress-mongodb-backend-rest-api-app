
import {Request, Response, NextFunction} from "express";

import NotFoundError from "../core/error/NotFoundError";

import GroupModel from "../models/GroupModel";

import Access from "../core/sequrity/Access";

import UserModel from "../models/UserModel";

import AccessError from "../core/error/AccessError";

const GroupAccess = new Access('system', 'groups');

/**
 * @author Artem Semenishch <a.semenishch@gmail.com>
 */
export default class GroupController {

    public static async getAll(req: Request, res: Response, next: Function) {

        try {

            GroupAccess.check(await req.loginnedUser, GroupAccess.ACCESS_READ_ONLY);

            res.body = await GroupModel.find({});

            return next();

        } catch (err) {

            return next(err);

        }
    }

    public static async getById(req: Request, res: Response, next: Function) {

        try {

            GroupAccess.check(await req.loginnedUser, GroupAccess.ACCESS_READ_ONLY);

            const group = await GroupModel.findOne({_id: req.params.id});

            if (!group) throw new NotFoundError("Group not found");

            res.body = group;

            return next();

        } catch (err) {

            return next(err);

        }
    }

    public static async create(req: Request, res: Response, next: Function) {

        try {

            GroupAccess.check(await req.loginnedUser, GroupAccess.ACCESS_READ_WRITE);

            res.body = await GroupModel.create(req.body);

            res.status(201);

            return next();

        } catch (err) {

            return next(err);

        }
    }

    public static async update(req: Request, res: Response, next: Function) {

        try {

            GroupAccess.check(await req.loginnedUser, GroupAccess.ACCESS_READ_WRITE);

            const group = await GroupModel.update({_id: req.params.id}, req.body);

            if (!group) throw new NotFoundError("Group not found");

            res.body = group;

            return next();

        } catch (err) {

            return next(err);

        }
    }

    public static async delete(req: Request, res: Response, next: Function) {

        try {

            GroupAccess.check(await req.loginnedUser, GroupAccess.ACCESS_READ_WRITE);

            const adminsInGroup = await UserModel.find({group: req.params.id});

            if (adminsInGroup.length) throw new AccessError("Forbidden to delete a group if it contains at least one user.");

            const group = await GroupModel.delete(req.params.id);

            if (!group) throw new NotFoundError("Group not found");

            res.body = true;

            return next();

        } catch (err) {

            return next(err);

        }
    }

}