
import {Request, Response, NextFunction} from "express";

import Auth from "../core/sequrity/Auth";

import UserModel from "../models/UserModel";

import AccessError from "../core/error/AccessError";

import { IUserModel } from "../ifaces/IUserModel";

/**
 * @author Artem Semenishch <a.semenishch@gmail.com>
 */
export default class AuthController {

    public static async login(req: Request, res: Response, next: Function) {

        try {

            let authUser:IUserModel = await Auth.authenticate(req.body.email, req.body.password);

            authUser.token = Auth.generateToken(authUser.email);

            authUser.private_key = Auth.getPrivateKey(req.headers['x-forwarded-for'], authUser.token);

            const user = await UserModel.update({

                email: authUser.email,

            }, authUser, {

                fields: {

                    private_key: 0,

                    password: 0

                },

                new: true

            });

            if (!user || !user.state) throw new AccessError("Access denied for " + authUser.email);

            res.body = user;

            return next();

        }catch (err) {

            return next(err);

        }

    }

    public static async check(req: Request, res: Response, next: Function) {

        try {

            res.body = await req.loginnedUser;

            return next();

        }catch (err) {

            return next(err);

        }

    }

    public static async logout(req: Request, res: Response, next: Function) {

        try{

            const loginnedUser = await req.loginnedUser;

            const user = await UserModel.update({

                _id: loginnedUser._id

            }, {

                private_key: null,

                token: null

            });

            delete req.loginnedUser;

            if (!user) new AccessError('Access denied');

            res.body = true;

            return next();

        }catch (err) {

            return next(err);

        }

    }

}