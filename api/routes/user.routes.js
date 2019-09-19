const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const checkAuth = require('../middlewares/check-auth');

router.post('/auth', userController.signin);

router.post('/invite', checkAuth, userController.inviteCandidate);

router.post('/invite-reviewer', checkAuth, userController.inviteReviewer);

router.post('/confirm', checkAuth, userController.activateUser);

module.exports = router;