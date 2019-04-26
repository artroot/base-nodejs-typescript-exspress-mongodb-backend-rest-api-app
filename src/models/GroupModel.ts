import { Document, Schema, Model, model } from "mongoose";

import { IGroupModel } from "../ifaces/IGroupModel";

import GroupSchema from "../schemas/GroupSchema";

import AbstractMongoModel from "../abstract/AbstractMongoModel";

/**
 * @author Artem Semenishch <a.semenishch@gmail.com>
 */
export default class GroupModel extends AbstractMongoModel implements IGroupModel {

    protected _model: IGroupModel;

    protected static schema = GroupSchema;

    public model_descr = 'Groups';

    public get name(): string {
        return this._model.name;
    }

    public get access(): object {
        return this._model.access;
    }

    public static async find(query: object = {}) {

        return await this.storage.query().find(query);

    }

    public static async findOne(query: object, options?: object) {

        return await this.storage.query().findOne(query, options);

    }

    public static async create(data: IGroupModel) {

        const group = await this.storage.query().create(<IGroupModel>data);

        return await this.storage.query().findById(group._id);

    }

    public static async update(params: Object, data: IGroupModel) {

        return await this.storage.query().findOneAndUpdate(params, <IGroupModel>data, {

            runValidators: true,

            /** Create a document if one isn't found. Required for `setDefaultsOnInsert` */
            upsert: true,

            setDefaultsOnInsert: true,

            new: true

        });

    }

    public static async delete(_id: string) {

        return await this.storage.query().delete(_id);

    }

}