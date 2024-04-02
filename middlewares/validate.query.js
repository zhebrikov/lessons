const query = require('../validations/query');

module.exports = (req, res, next) => {
    const queries = query.validate(req.query);
    if(queries.error) {
        let message = '';
        queries.error.details.forEach((err) => message+=err.message)
        res.status(400).send({message: message});
        throw new Error(queries.error);
    }
    req.query = {...queries.value};
    next();
}