
import IDb from "../ifaces/IDb";

/**
 * @author Artem Semenishch <a.semenishch@gmail.com>
 */
export default class DbFactory {

    protected static connection = null;

    protected static database: IDb;

    public static reconnectTimer = null;

    public static err = null;

    public static connect(database, app): void {

        DbFactory.database = database;

        DbFactory.database.connect().then(connection => {

            app.db = connection;

            console.info("%s: DataBase Connection Success", (new Date()).toUTCString());

            delete DbFactory.err;

            delete DbFactory.reconnectTimer;

        }).catch(err => {

            DbFactory.err = err;

            console.error("%s: %s", (new Date()).toUTCString(), err.message);

            DbFactory.setReconnectWatcher(app);

        });

    }

    public static reconnect(app): void {

        console.info("%s: Start DataBase Reconnect...",(new Date()).toUTCString());

        DbFactory.connect(DbFactory.database, app);

    }

    public static setReconnectWatcher(app) {

        if (!DbFactory.reconnectTimer) DbFactory.reconnectTimer = setInterval(function () {

            if (!DbFactory.reconnectTimer) clearInterval(this);
            else DbFactory.reconnect(app);

        }, 10000);

    }

    public static checkConnection(req, res, next) {

        if (DbFactory.database.checkConnection(DbFactory.err)) {

            res.status(503).json({
                error: {
                    type: 'DataBaseError',
                    message: DbFactory.err.message
                }
            });

            // Start Reconnect Watcher
            DbFactory.setReconnectWatcher(req.app);

        } else {

            next();

        }

    }

}