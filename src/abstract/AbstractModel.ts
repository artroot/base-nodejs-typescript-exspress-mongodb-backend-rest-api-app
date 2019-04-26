import { IModel } from "../ifaces/IModel";

import { IStorage } from "../ifaces/IStorage";

/**
 * @author Artem Semenishch <a.semenishch@gmail.com>
 */
export default abstract class AbstractModel implements IModel {

    protected static _storage: IStorage;

    protected abstract _model: any;

    public abstract model_descr: string;

    constructor(model?: any) {

        this.model = model;
    }

    public get model() {
        return this._model;
    }

    public set model(model) {
        this._model = model;
    }

}