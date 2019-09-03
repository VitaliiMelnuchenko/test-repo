const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    invitedAt: { type: Date },
    startedAt: { type: Date },
    completedAt: { type: Date },
    evaluetedAt: { type: Date },
    status: { type: String },
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

module.exports = mongoose.model('Application', applicationSchema);