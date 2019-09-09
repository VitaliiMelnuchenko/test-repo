const { User } = require('../models');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIEN_ID);
const nodeMailer = require('nodemailer');
const vacancyService = require('./vacancy.service');
const applicationService = require('./application.service');
const jwt = require('jsonwebtoken');

const createUser = async (data) => {
    try {
        const user = await User.create(data);
        return user; 
    } catch(err) {
        throw new Error(err);
    }
};

const google_auth = async (google_token) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: google_token,
            audience: process.env.CLIENT_ID
        });
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
            throw new Error('Auth failed');
        }
    } catch(err) {
        throw new Error(err);
    }
};

const sendVerificationCode = async (email, code) => {
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
        const mailOptions = {
            from: 'TechMagic',
            to: email,
            subject: 'Test invitation',
            html: `
                <h1 style="color: dodgerblue">You have been invited to test</h1>
                <a href="recruterlink/${code}">recruterlink/${code}</a>
            `
        };
        const sendEmail = await transporter.sendMail(mailOptions);
    } catch(err) {
        throw new Error(err);
    }
};

const inviteCandidate = async (candidateData, vacancyId) => {
    try {
        const candidate = await createUser(candidateData);
        const appData = {
            candidate: candidate._id,
            vacancy: vacancyId
        };
        const application = await applicationService.createOne(appData);
        const vacancy = await vacancyService.getOne(vacancyId);
        const code = candidate.generateVerificationCode();
        const email = await sendVerificationCode(candidate.email, code);
    } catch(err) {
        throw new Error(err);
    }
};

const activateUser = async (code) => {
    try {
        const userId = jwt.verify(code, process.env.JWT_SECRET_KEY);
        const user = await User.findByIdAndUpdate(userId, { isActive: true });
        if (user && user.isActive) {
            return { success: true }
        }
        throw new Error('Something went wrong');
    } catch(err) {
        throw new Error(err);
    }
};

module.exports = { google_auth, inviteCandidate, activateUser };