/**
 * @author Artem Semenishch <a.semenishch@gmail.com>
 */

const Mongo = require('../dist/dbs/MongoDb');

const _GroupModel = require('../dist/models/GroupModel');

const connect = new Mongo.default(require('../dist/configs/config').db.mongo);

connect.connect();

const groupName = "Root";

/**
 * Make any changes you need to make to the database here
 */
export async function up () {

    const groupRoot = {

        name: groupName,

        access: {

            system: {

                fields: {

                    users: {
                        value: "rw"
                    },
                    groups: {
                        value: "rw"
                    }
                }
            }
        }

    };

    await _GroupModel.default.create(groupRoot);
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
export async function down () {

    const groupAdmin = await _GroupModel.default.findOne({name: groupName});

    await _GroupModel.default.delete(groupAdmin._id.toString());

}
