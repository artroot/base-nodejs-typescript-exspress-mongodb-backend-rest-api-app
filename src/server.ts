#!/usr/bin/env node

/**
 * @author Artem Semenishch <a.semenishch@gmail.com>
 */

import app from './app';

import * as http from 'http';

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort((!!app.config.server && !!app.config.server.port) ? app.config.server.port : (process.env.PORT  || "4000"));

app.set('port', port);

process.env.TZ = 'Europe/Kiev';

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

server.listen(port, () => console.info("%s: Server listening on port %d", (new Date()).toUTCString(), parseInt(port)));

function normalizePort(val) {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}