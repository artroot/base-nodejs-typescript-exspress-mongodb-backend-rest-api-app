import {Document, Schema, Model, model} from "mongoose";

import { IUserModel } from "../ifaces/IUserModel";

/**
 * @author Artem Semenishch <a.semenishch@gmail.com>
 */
export const schema = new Schema({

    first_name: {
        type: String,
        required: false
    },

    last_name: {
        type: String,
        required: false
    },

    phone: {
        type: String,
        required: false
    },

    email: {
        type: String,
        unique: true,
        required: true,
        validate: /\S+@\S+\.\S+/
    },

    password: {
        type: String,
        required: true
    },

    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        default: null
    },

    state: {
        type: Boolean,
        default: true
    },

    private_key: String,

    sid: String,

    token: String

}, {
    strict: true,
    retainNullValues: true
});

const UserSchema = model<IUserModel>('User', schema);

export default UserSchema;
