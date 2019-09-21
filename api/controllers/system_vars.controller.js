const systemVarsSeervice = require('../services/system_vars.service');
const validateSystemVar = require('../validators/system_vars.validator');
const validateSystemVarUpdate = require('../validators/update_system_var.validator');

const createTopic = async (req, res, next) => {
    try {
        validateSystemVar(req.body);
        const data = req.body.topic.toLowerCase();
        const topic = await systemVarsSeervice.createOne('topics', data);
        res.status(201).json({ topic: topic });
    } catch(err) {
        next(err);
    }
};

const getTopics = async (req, res, next) => {
    try {
        const topics = await systemVarsSeervice.getMany('topics');
        res.status(201).json({ topics: topics });
    } catch(err) {
        next(err);
    }
};

const updateTopic = async (req, res, next) => {
    try {
        validateSystemVarUpdate(req.body);
        const curVal = req.body.currentValue.toLowerCase();
        const newVal = req.body.newValue.toLowerCase();
        const updatedTopic = await systemVarsSeervice.updateOne('topics' ,curVal, newVal);
        res.status(200).json({ topic: updatedTopic });
    } catch(err) {
        next(err);
    }
}; 

const deleteTopic = async (req, res, next) => {
    try {
        const topic = req.body.topic.toLowerCase();
        const deletedTopic = await systemVarsSeervice.deleteOne('topics', topic);
        res.status(204).josn({});
    } catch(err) {
        next(err);
    }
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