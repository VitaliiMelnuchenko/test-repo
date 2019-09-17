const userService = require('../services/user.service');
const vacancyService = require('../services/vacancy.service');
const applicationService = require('../services/application.service');

const errorHandler = require('../../utils/errorHandler');

const signin = async (req, res, next) => {
    try {
        const user = await userService.google_auth(req.body.token);
        res.status(200).json(user);
    } catch(err) {
        next(err);
    }
};

const inviteCandidate = async (req, res, next) => {
    try {
        const candidateData = req.body.candidate;
        const vacancyId = req.body.vacancy;
        let candidate = await userService.findUser({ email: candidateData.email });
        if (!candidate) candidate = await userService.createUser(candidateData);
        const appData = {
            candidate: candidate._id,
            vacancy: vacancyId
        };
        const application = await applicationService.createOne(appData);
        const vacancy = await vacancyService.getOne(vacancyId);
        const code = candidate.generateVerificationCode();
        const email = await userService.sendMaill(candidate.role, candidate.email, code, vacancy.title);
        res.status(200).json({message: 'candidate has been invited'});
    } catch(err) {
        next(err);
    }
};

const inviteReviewer = async (req, res, next) => {
    try {
        let reviewer = await userService.findUser({ email: req.body.email });
        if (reviewer) throw errorHandler.serverError('Reviewer with given email already exist');
        reviewerData = { ...req.body, role: 'reviewer' };
        await userService.createUser(reviewerData);
        const code = reviewer.generateVerificationCode();
        const email = await userService.sendMaill(reviewer.role, candidate.email, code, vacancy.title);
    } catch(err) {
        next(err);
    }
};

const activateUser = async (req, res, next) => {
    try {
        await userService.activateUser(req.body.code);
        res.status(200).json({message: 'user has been activated'});
    } catch(err) {
        next(err);
    }
};

module.exports = { signin, inviteCandidate, activateUser, inviteReviewer };