const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/application.controller');

router.route('')
.get(applicationController.getApplications)
.post(applicationController.createApplications)
.delete(applicationController.deleteApplication);;

router.route('/:id')
.get(applicationController.getApplicationsById)


module.exports = router;