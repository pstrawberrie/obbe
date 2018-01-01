const express = require('express');
const router = express.Router();
const cors = require('cors');
const { catchErrors } = require('../handlers/errorHandlers');

// Controllers
const coreController = require('../controllers/coreController');
const apiController = require('../controllers/apiController');

/* API */
router.get('/api/survey/questions', 
  cors(),
  catchErrors(apiController.getSurveyQuestions)
)
router.get('/api/survey/images/:number', 
  cors(),
  catchErrors(apiController.getSurveyImages)
)

module.exports = router;