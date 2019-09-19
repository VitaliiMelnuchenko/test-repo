const userService = require('../services/user.service');
const vacancyService = require('../services/vacancy.service');
const applicationService = require('../services/application.service');
const validateApp = require('../validators/application.validator');
const { CANDIDATE } = require('../CONSTANTS');


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
        const userData = req.body.candidate;
        const vacancyId = req.body.vacancy;
        let user = await userService.findUser({ email: userData.email });
        if (user && user.role !== CANDIDATE) throw errorHandler.badRequest();
        if (!user) user = await userService.createUser(userData);
        const code = user.generateVerificationCode();
        const appData = {
            candidate: user._id.toString(),
            vacancy: vacancyId
        };
        validateApp(appData);
        const application = await applicationService.createOne(appData);
        const vacancy = await vacancyService.getOne(vacancyId);
        const email = await userService.sendInvite(user.role, user.email, code, vacancy.title);
        res.status(200).json({message: 'candidate has been invited'});
    } catch(err) {
        next(err);
    }
};

const inviteReviewer = async (req, res, next) => {
    try {
        let user = await userService.findUser({ email: req.body.email });
        if (user) throw errorHandler.badRequest('Reviewer with given email already exist');
        user = await userService.createUser(req.body);
        const code = user.generateVerificationCode();
        const email = await userService.sendInvite(user.role, user.email, code);
        res.status(200).json({message: 'user has been invited'});
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