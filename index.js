const express = require('express');
const routes = require('./routes');
const db = require('./modules/db');

const db_connect = db().connection();

const app = routes(express(), { db: db_connect });

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});