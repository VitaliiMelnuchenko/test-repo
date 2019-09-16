const applicationService = require('../services/application.service');

const createApplications = async (req, res, next) => {
    try {
        const newApplication = await applicationService.createOne(req.body);
        res.status(201).json(newApplication);
    } catch(err) {
        next(err);
    }
};

const getApplications = async (req, res, next) => {
    try {
        const applications = await applicationService.getMany();
        res.status(200).json(applications);
    } catch(err){
        next(err);
    }
};

const getApplicationsById = async (req, res, next) => {
    try {
        const application = await applicationService.getOne(req.params.id);
        res.status(200).json(application);
    } catch(err) {
        next(err);
    }
};

const deleteApplication = async (req, res, next) => {
    try {
        const deletedApplication = await applicationService.remove(req.body.appIdList);
        res.status(204).json(deletedApplication);
    } catch(err) {
        next(err);
    }
};

module.exports = { createApplications, getApplications, getApplicationsById, deleteApplication };