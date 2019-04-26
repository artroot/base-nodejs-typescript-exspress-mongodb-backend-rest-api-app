import {Request, Response, NextFunction} from "express";

/**
 * @author Artem Semenishch <a.semenishch@gmail.com>
 */
export default class HeadersHandler {

    public static handle (req: Request, res: Response, next: Function) {

        res.header("Access-Control-Allow-Origin", "*");

        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-API-USER-ID, X-API-PUBLIC-KEY");

        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

        if (req.method === "OPTIONS") return res.status(200).end();

        next();

    }

}