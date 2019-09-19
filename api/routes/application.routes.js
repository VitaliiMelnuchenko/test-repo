const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/application.controller');

router.route('')
.get(applicationController.getApplications)
.delete(applicationController.deleteApplications);;

router.route('/:id')
.get(applicationController.getApplicationsById)
.patch(applicationController.updateApplication);

router.post('/:id/set-reviewer', applicationController.setReviewer);


module.exports = router;