const knex = require('../knex');

module.exports = () => {
    const connection = () => {
        return knex(
            'pg',
            {
                host: '84.252.75.100',
                port: 5432,
                user: 'lessons',
                password: 'le22on2',
                database: 'lessons',
            },
        );
    }

    return {
        connection
    }
}