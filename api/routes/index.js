const express = require('express');
const router = express.Router();

const questionsRoutes = require('./question.routes');
const vacanciesRoutes = require('./vacancy.routes');
const usersRoutes = require('./user.routes');
const healthCheckRoutes = require('./hc.routes');

router.use('/users', usersRoutes);
router.use('/questions', questionsRoutes);
router.use('/vacancies', vacanciesRoutes);
router.use('/hc', healthCheckRoutes);

router.use((err, req, res, next) => {
    res.status(500).json(err.message);
});

module.exports = router;
