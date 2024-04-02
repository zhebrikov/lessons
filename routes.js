const lessons = require("./services/lessons");
const mw_validate = require('./middlewares/validate.query');

module.exports = (app, dependency = {}) => {


    app.use(mw_validate);

    app.get('/lessons', (req, res) => {
        return lessons(req, res, dependency);
    });

    return app;
}