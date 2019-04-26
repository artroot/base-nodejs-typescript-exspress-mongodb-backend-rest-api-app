
import AbstractModel from "./AbstractModel";

import MongoStorage from "../core/storages/MongoStorage";

/**
 * @author Artem Semenishch <a.semenishch@gmail.com>
 */
export default abstract class AbstractMongoModel extends AbstractModel {

    protected static _schema;

    protected get schema() {
        return this.constructor['schema'];
    }

    protected get storage(): MongoStorage {
        return new MongoStorage(this.schema);
    }

    protected static get storage(): MongoStorage {

        return new MongoStorage(this['schema']);
    }

    public get model() {
        return this._model;
    }

    public set model(model) {
        this._model = model;
    }

}