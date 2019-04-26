
const config = require('./dist/configs/config');

module.exports = {
    migrationsDir: 'migrations',
    dbConnectionUri: 'mongodb://' + config.db.mongo.development.user + ":" + config.db.mongo.development.password + '@' + config.db.mongo.development.host + ':' + config.db.mongo.development.port + '/' + config.db.mongo.development.db + '?authSource=' + config.db.mongo.development.db,
    "es6": true
}