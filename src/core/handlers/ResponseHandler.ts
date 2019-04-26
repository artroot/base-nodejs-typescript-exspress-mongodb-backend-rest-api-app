import {Request, Response, NextFunction} from "express";

import NotFoundError from "../error/NotFoundError";

/**
 * @author Artem Semenishch <a.semenishch@gmail.com>
 */
export default class ResponseHandler {

    public static handle (req: Request, res: Response, next: Function) {

        if (res.body) {

            return res.json({

                status: true,

                result: res.body,

                error: false

            });

        }

        return next(new NotFoundError(`Method: '${req.url}' not found.`));
    }

}