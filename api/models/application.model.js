const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Vacancy = require('../models/vacancy.model');
const Question = require('../models/question.model');

const applicationSchema = new Schema({
    candidate: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    vacancy: {
        type: Schema.Types.ObjectId,
        ref: 'Vacancy'
    },
    questions: [
        {
            mark: { type: Number },
            answer: { type: String },
            videoKey: { type: String },
            type: { type: String },
            question: {
                type: Schema.Types.ObjectId,
                ref: 'Question'
            },
            finishedAt: { type: Date }
        }
    ],
    invitedAt: { type: Date, default: Date.now },
    startedAt: { type: Date },
    completedAt: { type: Date },
    evaluetedAt: { type: Date },
    status: { type: String, default: 'invited' },
    score: { type: Number },
    comments: [
        {
            author: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            text: { type: String },
            createdAt: { type: Date, default: Date.now }
        }
    ]
}, { versionKey: false });

applicationSchema.post('save', async (doc, next) => {
    try {
        const populateVacancy = await Vacancy.populate(doc, { path: 'vacancy' });
        const populateQuestions = await Question.populate(doc.vacancy, { path: 'questions' });
        console.log(populateVacancy);
        doc.questions = populateQuestions.questions.map(question => {
            return {
                mark: '',
                answer: '',
                videoKey: '',
                type: '',
                question: question._id,
                finishedAt: ''
            }
        });
        next();
    } catch(err) {
        next(err);
    }
});

module.exports = mongoose.model('Application', applicationSchema);