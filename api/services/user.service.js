const { User } = require('../models');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIEN_ID);
const nodeMailer = require('nodemailer');

const createOne = async (data) => {
    try {
        const user = await User.create(data);
        return user; 
    } catch(err) {
        throw new Error(err);
    }
}

const google_auth = async (google_token) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: google_token,
            audience: process.env.CLIEN_ID
        });
        const { email = '', picture = '' } = ticket.getPayload(); 
        const foundUser = await User.findOne({ email: email });
        if (ticket && foundUser) {
            const token = foundUser.generateAuthToken();
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
}

const sendVerificationCode = async (code) => {
    try {
        const transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.COMPANY_EMAIL,
                pass: process.env.PASSWORD
            }
        }); 
        const mailOptions = {
            from: 'TechMagic',
            to: 'melnychenko.vitaliy.1@gmail.com',
            subject: 'Helli',
            html: `
                <h1>Confirm your email:</h1>
                <a href="recruterlinc/${code}">recruterlinc/${code}</a>
            `
        };
        const sendEmail = await transporter.sendMail(mailOptions);
    } catch(err) {
        throw new Error(err);
    }
}

module.exports = { createOne ,google_auth, sendVerificationCode }