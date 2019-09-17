const { Application, Vacancy, Question } = require('../models');
const vacancyService = require('./vacancy.service');
const errorHandler = require('../../utils/errorHandler');
const badRequestErr = errorHandler.badRequest('There is no document with given ID');

const createOne = async (data) => {
    try {
        const copyQuestion = question => {
            return {
                type: (question.type) ? question.type : null,
                question: (question._id) ? question._id : null
            }
        };
        const vacancy = await vacancyService.getOne(data.vacancy);
        if (vacancy.status !== 'active') {
            throw new Error('Vacancy is not active');
        }
        const newDoc = await Application.create(data);
        const populateVacancy = await Vacancy.populate(newDoc, { path: 'vacancy' });
        const populateVcacncyQuestions = await Question.populate(newDoc.vacancy, { path: 'questions' });
        newDoc.questions = populateVcacncyQuestions.questions.map(copyQuestion);
        const filledApplication = await newDoc.save();
        const populateQuestions = await Question.populate(filledApplication.questions, { path: 'question' });
        return filledApplication;
    } catch(err) {
        throw err;
    }
};

const getMany = async () => {
    try {
        const docs = await Application.find({}).populate({
            path: 'vacancy',
            populate: { path: 'questions' }
        }).populate('questions.question');
        return docs;
    } catch(err) {
        throw err;
    }
};

const getOne = async (id) => {
    try {
        const doc = await Application.findById(id).populate({
            path: 'vacancy',
            populate: { path: 'questions' }
        }).populate('questions.question');;
        if (doc) {
            return doc;
        } else {
            throw badRequestErr;
        }
    } catch(err) {
        throw err;
    }
};

const updateOne = async data => {
    try {

    } catch(err) {
        
    }
};

const remove = async (appIdList) => {
    try {
        if (Array.isArray(appIdList)) throw badRequestErr;;
        const deletedApps = await Application.deleteMany({ _id : { $in: appIdList } });
        return deletedApps;
    } catch(err) {
        throw err;
    }
};

module.exports = { createOne, getMany, getOne, remove }