/**
 * @author Artem Semenishch <a.semenishch@gmail.com>
 */

const Mongo = require('../dist/dbs/MongoDb');

const _UserModel = require('../dist/models/UserModel');

const _GroupModel = require('../dist/models/GroupModel');

const connect = new Mongo.default(require('../dist/configs/config').db.mongo);

const default_user = require('../dist/configs/config').app.default_user;

connect.connect();

const groupName = "Root";

const adminFirstName = default_user.first_name;

const adminEmail = default_user.email;

const adminPassword = default_user.password;

/**
 * Make any changes you need to make to the database here
 */
export async function up () {

    const groupRoot = await _GroupModel.default.findOne({name: groupName});

    const defaultAdmin = {

        first_name: adminFirstName,

        email: adminEmail,

        password: adminPassword,

        group: groupRoot._id.toString()

    };

    await _UserModel.default.create(defaultAdmin);
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
export async function down () {

    const defaultAdmin = await _UserModel.default.findOne({email: adminEmail});

    await _UserModel.default.delete(defaultAdmin._id.toString());

}
