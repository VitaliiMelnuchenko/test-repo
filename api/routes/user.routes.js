const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/auth', userController.signin);

router.post('/test-invite', userController.inviteCandidate);

router.post('/activate-user', userController.activateUser);

module.exports = router;