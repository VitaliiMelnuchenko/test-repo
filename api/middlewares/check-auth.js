const jwt = require('jsonwebtoken');
const errorHandler = require('../../utils/errorHandler');

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) throw errorHandler.unauthorized('Token is not provided');
        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.local = {
            user: decoded
        };
        next();
    } catch(err) {
        next(err);
    }
};