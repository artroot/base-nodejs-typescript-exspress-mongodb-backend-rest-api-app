import * as config from "../../configs/config";

import * as Crypto from "crypto";

import {Request, Response, NextFunction} from "express";

import UserModel from "../../models/UserModel";

import AccessError from "../error/AccessError";

import { IUserModel } from "../../ifaces/IUserModel";

/**
 * @author Artem Semenishch <a.semenishch@gmail.com>
 */
export default class Auth {

    /**
     * Check Authorization & add Mixing loginnedUser to Request if Authorization - success
     *
     * @throws AccessError
     * @param req
     * @param res
     * @param next
     */
    public static async check(req: Request, res: Response, next: Function) {

        try {

            // /auth/login route
            if (/^\/auth\/login/.test(req.originalUrl)) return next();

            if (!req.headers['x-auth-sid']) throw {name: 'BadRequest', message: 'Missed x-auth-sid'};
            if (!req.headers['x-auth-token']) throw {name: 'BadRequest', message: 'Missed x-auth-token'};

            const loginnedUser = await Auth.getloginnedUser(
                req.headers['x-auth-sid'],
                Auth.getPrivateKey(req.headers['x-forwarded-for'], req.headers['x-auth-token'])
            );

            if (!loginnedUser || !loginnedUser.state)
                throw new AccessError("Authorization failed");
            else
                req['loginnedUser'] = loginnedUser;

            next();

        }catch (err) {
            return next(err);
        }
    }

    /**
     * Getting Admin by sid & private_key
     *
     * @param sid
     * @param private_key
     * @return Promise
     */
    protected static async getloginnedUser(sid: string, private_key: string):Promise<IUserModel> {

        return await UserModel.findOne({

            sid: sid,

            private_key: private_key

        }, {

            private_key: 0,

            token: 0,

            password: 0

        });
    }

    /**
     * @param ip
     * @param token
     * @return string private_key
     */
    public static getPrivateKey(ip, token): string {

        return Crypto.createHash('sha1').update(token + ip).digest('hex');

    }

    public static generateSID(email: string): string {

        return Crypto.createHash('md5').update(email).digest('hex');

    }

    /**
     * @return string token
     */
    public static generateToken(email: string): string {

        const random = Math.random().toString(36).substr(2);

        return Crypto.createHash('sha1').update(random+email+config.app.secret).digest('hex');
    }

    public static generatePasswordHash(password: string): string {

        return Crypto.createHash('sha1').update(password + config.app.secret).digest('hex');

    }

    public static validatePassword(password: string, validate_password: string): boolean {

        return Auth.generatePasswordHash(validate_password) == password;

    }

    /**
     * Checking auth_token in api.lanet.me and return authorized user object
     *
     * @param email
     * @param password
     * @return IUserModel
     */
    public static async authenticate(email, password): Promise<IUserModel> {

        const user:IUserModel = await UserModel.findOne({email: email});

        if (!Auth.validatePassword(user.password, password)) throw new AccessError("Wrong user email or password");

        return user;

    }

}