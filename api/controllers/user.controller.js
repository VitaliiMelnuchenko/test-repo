const userService = require('../services/user.service');

const signin = async (req, res, next) => {
    try {
        const user = await userService.google_auth(req.body.token);
        res.status(200).json(user);
    } catch(err) {
        next(err);
    }
}

const inviteCandidate = async (req, res, next) => {
    try {
        await userService.sendVerificationCode('alkasguaosjcvqwerg.aiosodfgaoADakADSfas23.kiasjhyduyewqbzx2');
        res.status(200).send({success: true});
    } catch(err) {
        next(err);
    }
}

module.exports = { signin, inviteCandidate };