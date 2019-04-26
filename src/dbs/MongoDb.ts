
import IDb from "../ifaces/IDb";

import {MongoError, MongoNetworkError} from "mongodb";

import * as mongoose from "mongoose";

/**
 * @author Artem Semenishch <a.semenishch@gmail.com>
 */
export default class MongoDb implements IDb {

    private params: any = {};

    constructor(params) {

        this.params = params;

    }

    public connect() {

        return mongoose.connect(
            'mongodb://' + this.params.user + ":" + this.params.password + '@' + this.params.host + ':' + this.params.port + '/' + this.params.db + '?authSource=' + this.params.db,

            {
            	useNewUrlParser: true, 
            	useCreateIndex: true
            }
        );

    }

    public checkConnection(err) {

        if (err instanceof MongoNetworkError) return true;

        return false;

    }

}