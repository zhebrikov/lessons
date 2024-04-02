const knex = require('knex');

module.exports = (client, connection) => {
    return knex({
        client,
        connection,
      });
}