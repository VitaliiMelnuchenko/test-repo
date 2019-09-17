const { User } = require('../models');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIEN_ID);
const nodeMailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const errorHandler = require('../../utils/errorHandler');
const err400 = errorHandler.serverError();
const err401 = errorHandler.unauthorized('Auth failed');
const err500 = errorHandler.serverError();

const { inviteCandidateMail, inviteReviewerMail } = require('../CONSTANTS');

const createUser = async data => {
    try {
        const user = await User.create(data);
        return user; 
    } catch(err) {
        throw err;
    }
};

const findUser = async data => {
    try {
        const user = await User.findOne(data);
        return user;
    } catch(err) {
        throw err400;
    }
};

const findUsersByRole = async roles => {
    try {
        if (!Array.ifArray(roles)) throw err400;
        const users = User.find({ role: { $in: roles } });
        return users;
    } catch(err) {
        throw err;
    }
};

const google_auth = async (google_token) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: google_token,
            audience: process.env.CLIENT_ID
        }).catch(() => { throw err401 });
        const { email = '', picture = '' } = ticket.getPayload(); 
        const foundUser = await User.findOne({ email: email });
        if (ticket && foundUser && foundUser.isActive) {
            const token = foundUser.generateAuthToken(picture);
            const { _id, ...userData } = foundUser._doc;
            userData.photoUrl = picture;
            return {
                user: userData,
                accessToken: token
            };
        } else {
            throw err401;
        }
    } catch(err) {
        throw err;
    }
};

const sendMail = async (role ,email, code, vacancy = '') => {
    try {
        const transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.COMPANY_EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        }); 
        const mailOptions = role === 'reviewer' ? inviteReviewerMail(email, code) : inviteCandidateMail(email, code, vacancy);
        const sendEmail = await transporter.sendMail(mailOptions);
    } catch(err) {
        throw err;
    }
};

const activateUser = async (code) => {
    try {
        const userId = jwt.verify(code, process.env.JWT_SECRET_KEY);
        const user = await User.findByIdAndUpdate(userId._id, { $set: { isActive: true } }, { new: true });
        if (user && user.isActive) {
            return { success: true }
        }
        throw err500;
    } catch(err) {
        throw err;
    }
};

module.exports = { createUser, findUser, google_auth, sendMail, activateUser, findUsersByRole };