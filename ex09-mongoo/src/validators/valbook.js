const Joi = require("joi");

exports.addBookSchema = Joi.object({
    title: Joi.string().min(2).max(50).required(),
    content: Joi.string().min(2).max(50).required(),
    author: Joi.string().min(2).max(50).required(),
    image: Joi.string().allow(null).allow("").required()
});

exports.deleteBookSchema = Joi.object({
    id: Joi.string().required()
});
