const { Vacancy } = require('../models/index');
const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

module.exports = { getVacancies, createVacancy, getVacancyById, updateVacancy, deleteVacancy };

function getVacancies(req, res, next) {
    Vacancy.find({}).select('-__v').populate('questions', '-__v')
        .then(vacancies => {
            if (vacancies.length) {
                res.status(200).json(vacancies);
                return;
            }
            res.status(200).json({
                message: 'there are no vacancies in database'
            });
        })
        .catch(err => {
            next(err);
        });
}

function createVacancy(req, res, next) {
    const schema = {
        title: Joi.string().min(3).required(),
        description: Joi.string().min(3).required(),
        status: Joi.string().required(),
        questions: Joi.array(),
        type: Joi.string().min(3).required()
    }
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        res.status(400).json(result.error.details[0].message);
        return;
    }
    req.body.questions = req.body.questions.map(item => {
        return mongoose.Types.ObjectId(item);
    });
    Vacancy.create(req.body)
        .then(() => {
            res.status(201).json({
                message: 'vacancy created'
            });
        })
        .catch(err => {
            next(err);
        });
}

function getVacancyById(req, res, next) {
    Vacancy.findById(req.params.vacancyId).select('-__v')
        .then(foundVacancy => {
            if (foundVacancy) {
                res.status(200).json(foundVacancy);
                return;
            }
            res.status(400).json({
                message: 'there is no vacancy with given ID'
            });
        })
        .catch(err => {
            next(err);
        });
}

function updateVacancy(req, res, next) {
    const schema = {
        title: Joi.string().min(3),
        description: Joi.string().min(3),
        status: Joi.string(),
        questions: Joi.array(),
        type: Joi.string().min(3)
    }
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        res.status(400).json(result.error.details[0].message);
        return;
    }
    req.body.questions = req.body.questions.map(item => {
        return mongoose.Types.ObjectId(item);
    });
    Vacancy.findByIdAndUpdate(req.params.vacancyId, req.body)
        .then(updatedVacancy => {
            if (updatedVacancy) {
                res.status(200).json({
                    message: 'vacancy updated'
                });
                return;
            }
            res.status(400).json({
                message: 'there is no vacancy with given ID'
            });
        })
        .catch(err => {
            next(err);
        });
}

function deleteVacancy(req, res, next) {
    Vacancy.findByIdAndDelete(req.params.vacancyId)
        .then(deletedVacancy => {
            if (deletedVacancy) {

                res.status(200).json({
                    message: 'vacancy deleted'
                });
                return;
            }
            res.status(400).json({
                message: 'there is no vacancy with given ID'
            });
        })
        .catch(err => {
            next(err);
        });
}