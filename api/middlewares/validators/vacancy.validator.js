const MIN_LENGTH = 3, MAX_TITLE_LENGTH = 150, MAX_DESC_LENGTH = 1000;
const Joi = require('@hapi/joi');
const validator = require('../../services/validators.service');

const schema = {
    title: Joi.string().min(MIN_LENGTH).max(MAX_TITLE_LENGTH).required(),
    description: Joi.string().min(MIN_LENGTH).max(MAX_DESC_LENGTH).required(),
    status: Joi.string().valid('active', 'on hold', 'closed').required(),
    questions: Joi.array(),
    type: Joi.string().valid('android', 'web', 'ios', 'managment').required()
};

module.exports = validator(schema);