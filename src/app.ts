import * as express from "express";

import * as bodyParser from "body-parser";

import DbFactory from "./core/DbFactory";

import MongoDb from "./dbs/MongoDb";

import * as config from "./configs/config";

import * as RoutesAvailable from "./routes/RoutesAvailable";

import Auth from "./core/sequrity/Auth";

import ErrorHandler from "./core/handlers/ErrorHandler";

import HeadersHandler from "./core/handlers/HeadersHandler";

import ResponseHandler from "./core/handlers/ResponseHandler";

/**
 * @author Artem Semenishch <a.semenishch@gmail.com>
 */
class App {

    public app: express.Application;

    public config;

    constructor() {

        this.app = express();

        this.app.config = config;

        this.init();
    }

    private init(): void {

        /**
         * DB Connection
         */
        DbFactory.connect(new MongoDb(this.app.config.db.mongo), this.app);

        /**
         * Add Access-Control headers
         */
        this.app.use(HeadersHandler.handle);

        /**
         * Checking Auth
         */
        this.app.use('/', Auth.check);

        /**
         * Start checking DB connection watcher
         */
        this.app.use('/', DbFactory.checkConnection);

        /**
         * Add Parsing body to json
         */
        this.app.use(bodyParser.json());

        /**
         * Add Url encoding
         */
        this.app.use(bodyParser.urlencoded({extended: false}));

        /**
         * Add API Routes
         */
        this.app.use(RoutesAvailable);

        /**
         * To Handle Errors
         */
        this.app.use(ErrorHandler.handle);

        /**
         * To Handle Responses
         */
        this.app.use(ResponseHandler.handle);

    }

}

export default new App().app;