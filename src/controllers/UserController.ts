
import { Request, Response, NextFunction } from "express";

import NotFoundError from "../core/error/NotFoundError";

import UserModel from "../models/UserModel";

import Access from "../core/sequrity/Access";

import Auth from "../core/sequrity/Auth";

const UserAccess = new Access('system', 'users');

/**
 * @author Artem Semenishch <a.semenishch@gmail.com>
 */
export default class UserController {

    public static async getAll(req: Request, res: Response, next: Function) {

        try {

            UserAccess.check(await req.loginnedUser, UserAccess.ACCESS_READ_ONLY);

            res.body = await UserModel.find({});

            return next();

        } catch (err) {

            return next(err);

        }
    }

    public static async getById(req: Request, res: Response, next: Function) {

        try {

            UserAccess.check(await req.loginnedUser, UserAccess.ACCESS_READ_ONLY);

            const admin = await UserModel.findOne({_id: req.params.id}, {

                private_key: 0,

                token: 0,

                password: 0

            });

            if (!admin) throw new NotFoundError("Admin not found");

            res.body = admin;

            return next();

        } catch (err) {

            return next(err);

        }
    }

    public static async create(req: Request, res: Response, next: Function) {

        // Delete params which will rewrite on login action
        const { private_key, token, sid, ...data } = req.body;

        try {

            UserAccess.check(await req.loginnedUser, UserAccess.ACCESS_READ_WRITE);

            res.body = await UserModel.create(data);

            res.status(201);

            return next();

        } catch (err) {

            return next(err);

        }
    }

    public static async update(req: Request, res: Response, next: Function) {

        // Delete params which will rewrite on login action
        const { private_key, token, sid, ...data } = req.body;

        try {

            UserAccess.check(await req.loginnedUser, UserAccess.ACCESS_READ_WRITE);

            if (data.password) data.password = Auth.generatePasswordHash(data.password);

            const admin = await UserModel.update({

                _id: req.params.id

            }, data, {

                fields: {private_key: 0, token: 0, password: 0},

                runValidators: true,

                new: true

            });

            if (!admin) throw new NotFoundError("User not found");

            res.body = admin;

            return next();

        } catch (err) {

            return next(err);

        }
    }

    public static async delete(req: Request, res: Response, next: Function) {

        try {

            UserAccess.check(await req.loginnedUser, UserAccess.ACCESS_READ_WRITE);

            const admin = await UserModel.delete(req.params.id);

            if (!admin) throw new NotFoundError("User not found");

            res.body = true;

            return next();

        } catch (err) {

            return next(err);

        }
    }

}
