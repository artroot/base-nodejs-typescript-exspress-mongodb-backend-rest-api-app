import { Document, Schema, Model, model } from "mongoose";

import { IUserModel } from "../ifaces/IUserModel";

import UserSchema from "../schemas/UserSchema";

import AbstractMongoModel from "../abstract/AbstractMongoModel";

import Auth from "../core/sequrity/Auth";

/**
 * @author Artem Semenishch <a.semenishch@gmail.com>
 */
export default class UserModel extends AbstractMongoModel implements IUserModel {

    protected _model: IUserModel;

    protected static schema = UserSchema;

    public model_descr = 'Users';

    public get sid(): string {
        return this._model.sid;
    }

    public get first_name(): string {
        return this._model.first_name;
    }

    public get last_name(): string {
        return this._model.last_name;
    }

    public get email(): string {
        return this._model.email;
    }

    public get password(): string {
        return this._model.password;
    }

    public get phone(): string {
        return this._model.phone;
    }

    public get group(): string {
        return this._model.group;
    }

    public get state(): boolean {
        return this._model.state;
    }

    public get token(): string {
        return this._model.token;
    }

    public get private_key(): string {
        return this._model.private_key;
    }


    public static async find(query: object = {}) {

        return await this.storage.query().find(query, {

            private_key: 0,

            token: 0,

            password: 0

        }).populate('group');

    }

    public static async findOne(query: object, options?: object) {

        return await this.storage.query().findOne(query, options).populate('group');

    }

    public static async create(data: IUserModel) {

        data.sid = Auth.generateSID(data.email);

        data.password = Auth.generatePasswordHash(data.password);

        const user = await this.storage.query().create(<IUserModel>data);

        return await this.storage.query().findById(user._id, {

            private_key: 0,

            token: 0,

            password: 0

        }).populate('group');

    }

    public static async update(params: object, data: object, options?: object) {

        return await this.storage.query().findOneAndUpdate(params, <IUserModel>data, options).populate('group');

    }

    public static async delete(_id: string) {

        return await this.storage.query().delete(_id);

    }

}