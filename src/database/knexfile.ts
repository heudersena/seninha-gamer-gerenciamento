import "dotenv/config"
import { Knex } from 'knex';

interface IKnexConfig {
    [key: string]: Knex.Config;
}
const configs: IKnexConfig = {
    development: {
        client: "mysql2",
        connection: {
            host: '192.168.0.103',
            port: 3306,
            user: 'root',
            password: 'docker',
            database: 'gamers'
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: `${__dirname}/migrations`
        },
        useNullAsDefault: true,
    },
};

export default configs;