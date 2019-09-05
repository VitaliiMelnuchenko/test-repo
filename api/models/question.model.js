const MIN_LENGTH = 3, MAX_TITLE_LENGTH = 150, MAX_DESC_LENGTH = 1000, MAX_TOPIC_LENGTH = 20;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Vacancy = require('./vacancy.model');

const QuestionSchema = new Schema({
    author: {
         type: Schema.Types.ObjectId,
         ref: 'User',
         required: true
    },
    title: { type: String, min: MIN_LENGTH, max: MAX_TITLE_LENGTH, required: true },
    description: { type: String, min: MIN_LENGTH, max: MAX_DESC_LENGTH, required: true },
    type: { type: String, enum: ['code', 'text', 'video'], required: true },
    link: { type: String, default: '' },
    //options: [],
    maxLength: { type: Number, required: true },
    topics: { type:[String], min: 1, required: true },
    level: { type: String, enum: ['junior', 'middle', 'senior'], required: true }
}, { versionKey: false });

QuestionSchema.pre('remove', async function(next) {
    try {
        await Vacancy.updateMany(
            { },
            { $pull: { questions: this._id } }
        );
        next();
    } catch(err) {
        next(err)
    }
});

module.exports = mongoose.model('Question', QuestionSchema);