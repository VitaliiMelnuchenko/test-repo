const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');

const questionsRoutes = require('./question.routes');
const vacanciesRoutes = require('./vacancy.routes');
const usersRoutes = require('./user.routes');
const applicationRoutes = require('./application.routes');

router.use('/users', usersRoutes);
router.use('/questions', checkAuth, questionsRoutes);
router.use('/vacancies', checkAuth, vacanciesRoutes);
router.use('/applications', checkAuth, applicationRoutes);

router.use((err, req, res, next) => {
    res.status(500).json(err.message);
});

module.exports = router;