const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/application.controller');

router.route('')
.get(applicationController.createApplications)
.post(applicationController.getApplications);

router.route('/:id')
.get(applicationController.getApplicationsById)
.put(applicationController.updateApplication)
.delete(applicationController.deleteApplication);

module.exports = router;