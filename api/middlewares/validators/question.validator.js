const MIN_LENGTH = 3, MAX_TITLE_LENGTH = 150, MAX_DESC_LENGTH = 1000, MAX_TOPIC_LENGTH = 20;
const Joi = require('@hapi/joi');
const validator = require('../../services/validators.service');

const schema = {
    title: Joi.string().min(MIN_LENGTH).max(MAX_TITLE_LENGTH).required(),
    description: Joi.string().min(MIN_LENGTH).max(MAX_DESC_LENGTH).required(),
    type: Joi.string().valid('code', 'text', 'video').required(),
    link: Joi.string(),
    maxLength: Joi.number().greater(0).integer().required(),
    topics: Joi.array().items(Joi.string().min(MIN_LENGTH).max(MAX_TOPIC_LENGTH).required()).required(),
    level: Joi.string().valid('junior', 'middle', 'senior').required()
}

module.exports = validator(schema);