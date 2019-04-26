import {Request, Response, NextFunction} from "express";

/**
 * @author Artem Semenishch <a.semenishch@gmail.com>
 */
export default class ErrorHandler {

    public static handle (err: Error, req: Request, res: Response, next: Function) {

        if (err) {

            res.status(!err['status'] ? 500 : err['status']).json({

                status: false,

                result: false,

                error: {

                    type: err.name,

                    message: err.message

                }

            });

        }
        else {

            console.error("%s: %s", (new Date()).toUTCString(), err.message);

            next(err);

        }
    }

}