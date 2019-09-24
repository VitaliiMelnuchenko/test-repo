const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const checkAuth = require('../middlewares/check-auth');

router.post('/auth', userController.signin);

router.use(checkAuth);
router.post('/invite', userController.inviteCandidate);

router.post('/invite-reviewer', userController.inviteReviewer);

router.post('/confirm', userController.activateUser);

router.post('/filter', userController.findByRole);

router.route('/:id')
.put(userController.updateUser)
.delete(userController.deleteUser);

module.exports = router;