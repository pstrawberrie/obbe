const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers');

// Controllers
const coreController = require('../controllers/coreController');
const apiController = require('../controllers/apiController');

/* API */
router.get('/api/survey/questions', 
  catchErrors(apiController.getSurveyQuestions)
)
router.get('/api/survey/images/:number', 
  catchErrors(apiController.getSurveyImages)
)

module.exports = router;