const express = require('express');
const router = express.Router();
const systemVarsController = require('../controllers/system_vars.controller');

router.route('/topics')
.get(systemVarsController.getTopics)
.post(systemVarsController.createTopic)
.put(systemVarsController.updateTopic)
.delete(systemVarsController.updateTopic);

router.route('/vacancy-types')
.get(systemVarsController.getTypes)
.post(systemVarsController.createType)
.put(systemVarsController.updateType)
.delete(systemVarsController.deleteType);

module.exports = router;