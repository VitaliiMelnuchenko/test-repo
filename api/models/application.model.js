const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Vacancy = require('../models/vacancy.model');
const Question = require('../models/question.model');

const applicationSchema = new Schema({
    candidate: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vacancy: {
        type: Schema.Types.ObjectId,
        ref: 'Vacancy',
        required: true
    },
    reviewer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    questions: [
        {
            mark: { type: Number },
            answer: { type: String },
            videoKey: { type: String, default: null },
            type: { type: String, default: null },
            question: {
                type: Schema.Types.ObjectId,
                ref: 'Question',
            },
            finishedAt: { type: Date, default: null },
            status: { type: String, enum: ['not answered', 'ansvered', 'evaluated'], default: 'not answered' }
        }
    ],
    invitedAt: { type: Date, default: Date.now },
    startedAt: { type: Date, default: null },
    completedAt: { type: Date, default: null },
    evaluetedAt: { type: Date, default: null },
    status: { type: String, default: 'invited' },
    score: { type: Number, default: null },
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
                mark: null,
                answer: null,
                videoKey: null,
                type: question.type,
                question: question._id,
                finishedAt: null
            }
        });
        next();
    } catch(err) {
        next(err);
    }
});

module.exports = mongoose.model('Application', applicationSchema);