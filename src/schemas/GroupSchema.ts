import { Document, Schema, Model, model } from "mongoose";

import { IGroupModel } from "../ifaces/IGroupModel";

/**
 * @author Artem Semenishch <a.semenishch@gmail.com>
 */
export const schema = new Schema({

    name: {
        type: String,
        unique: true,
        required: true,
        validate: /^[а-яёіїА-ЯЁІЇ\d\w\s-,]*$/
    },

    access: {
        system: {
            name: {
                type: String,
                default: "Main",
                set: () => "Main"
            },
            fields: {
                users: {
                    name: {
                        type: String,
                        default: "Users",
                        set: () => "Users"
                    },
                    value: {
                        type: String,
                        required: true,
                        enum: ['no', 'r', 'rw'],
                        default: 'no'
                    }
                },
                groups: {
                    name: {
                        type: String,
                        default: "Groups",
                        set: () => "Groups"
                    },
                    value: {
                        type: String,
                        required: true,
                        enum: ['no', 'r', 'rw'],
                        default: 'no'
                    }
                }
            }
        }
    }

}, {
    strict: true,
    retainNullValues: true
});

const GroupSchema = model<IGroupModel>('Group', schema);

export default GroupSchema;
