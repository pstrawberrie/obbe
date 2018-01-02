const express = require('express');
const router = express.Router();
const cors = require('cors');
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
router.post('/api/survey/questions',
  catchErrors(apiController.saveSurveyQuestions)
)
router.post('/api/survey/images',
  catchErrors(apiController.saveSurveyImages)
)

module.exports = router;