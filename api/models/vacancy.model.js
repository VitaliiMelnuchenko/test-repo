const MIN_LENGTH = 3, MAX_TITLE_LENGTH = 150, MAX_DESC_LENGTH = 1000;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VacancySchema = new Schema({
    title: { type: String, min: MIN_LENGTH, MAX_TITLE_LENGTH, required: true },
    description: { type: String, min: MIN_LENGTH, max: MAX_DESC_LENGTH, required: true },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: { type: String, enum: ['active', 'on hold', 'closed'], default: 'closed' },
    questions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Question'
        }
    ],
    type: { type: String, enum: ['android', 'web', 'ios', 'managment'], required: true }
}, { versionKey: false });

module.exports = mongoose.model('Vacancy', VacancySchema);