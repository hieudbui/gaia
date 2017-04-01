const express = require('express');
const apiRoutes = express.Router();
const termsController = require('../api_controllers/terms');

apiRoutes.get('(/:termId/longest-preview-media-url)', termsController.longestPreview);

module.exports = apiRoutes;