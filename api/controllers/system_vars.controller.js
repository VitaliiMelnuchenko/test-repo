const systemVarsSeervice = require('../services/system_vars.service');
const validateSystemVar = require('../validators/system_vars.validator');

const createTopic = async (req, res, next) => {
    try {
        validateSystemVar(req.body);
        //const topic = await systemVarsSeervice.createOne('topics', req.body.topic);
        res.status(201).json(req.body);
    } catch(err) {
        next(err);
    }
};

const getTopics = async (req, res, next) => {
    try {
        const topics = await systemVarsSeervice.createOne('topics');
        res.status(201).json(topic);
    } catch(err) {
        next(err);
    }
};

const updateTopic = async (req, res, next) => {

};

const deleteTopic = async (req, res, next) => {

};

const createType = async (req, res, next) => {
    try {
        validateSystemVar(req.body.type);
        const topic = await systemVarsSeervice.createOne('vacancy_types', req.body.type);
        res.status(201).json(req.body);
    } catch(err) {

    }
};

const getTypes = async (rea, res, next) => {

};

const updateType = async (req, res, next) => {

};

const deleteType = async (req, res, next) => {

} ;

module.exports = {
    createTopic,
    getTopics,
    updateTopic,
    deleteTopic,
    createType,
    getTypes,
    updateType,
    deleteType
};