const Joi = require("joi");

module.exports = Joi.object({
    date: Joi.string(),
    status: Joi.number()
        .integer()
        .min(0)
        .max(1),
    teacherIds:Joi.string()
        .pattern(new RegExp('^[0-9,]{1,}$')),
    studentsCount: Joi.string()
        .pattern(new RegExp('^[0-9,]{1,}$')),
    page: Joi.number().integer().default(1),
    lessonsPerPage: Joi.number().integer().default(5),
    
})