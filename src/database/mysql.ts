import mysql from "mysql2"

const config = mysql.createPool({
    host: '192.168.0.103',
    user: 'root',
    database: 'gamers',
    password: 'docker',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    charset:'utf8mb4'
});
const poll = config.promise()
export { poll }