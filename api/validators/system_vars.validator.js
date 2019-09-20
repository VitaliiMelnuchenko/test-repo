const { MIN_LENGTH, MAX_SYSTEM_VAR_LENGTH } = require('../CONSTANTS');
const Joi = require('@hapi/joi');
const validator = require('../services/validators.service');

const schema = Joi.object({
    type: Joi.string().lowercase().trim().min(MIN_LENGTH).max(MAX_SYSTEM_VAR_LENGTH),
    topic: Joi.string().lowercase().trim().min(MIN_LENGTH).max(MAX_SYSTEM_VAR_LENGTH)
}).oxor('type', 'topic');

module.exports = validator(schema);