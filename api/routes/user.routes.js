const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/auth', userController.signin);

router.post('/send-mail', userController.inviteCandidate);

module.exports = router;