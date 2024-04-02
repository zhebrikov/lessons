const knex = require('../knex');

module.exports = () => {
    const connection = () => {
        return knex(
            'pg',
            {
                host: process.env.DB_HOST,
                port: 5432,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_NAME,
            },
        );
    }

    return {
        connection
    }
}

