const { MIN_LENGTH, MAX_TITLE_LENGTH, MAX_DESC_LENGTH } = require('../CONSTANTS');
const Joi = require('@hapi/joi');
const validator = require('../../services/validators.service');

const schema = {
    title: Joi.string().trim().min(MIN_LENGTH).max(MAX_TITLE_LENGTH).required(),
    description: Joi.string().trim().min(MIN_LENGTH).max(MAX_DESC_LENGTH).required(),
    status: Joi.string().valid('active', 'on hold', 'closed').required(),
    questions: Joi.array(),
    type: Joi.string().valid('android', 'web', 'ios', 'managment').required()
};

module.exports = validator(schema);