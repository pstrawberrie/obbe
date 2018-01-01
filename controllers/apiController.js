const mongoose = require('mongoose');
const Survey = mongoose.model('Survey');
const Image = mongoose.model('Image');

// Get Survey Questions
exports.getSurveyQuestions = async (req, res) => {

  // const testSurvey = new Survey({question:'Can i give u hug?'});
  // await testSurvey.save();

  await Survey.find({})
  .then(result => {
    res.json(result);
  })
  .catch(err => {console.log(`error getting survey questions:\n${err}`)})

}

// Get Survey Images
exports.getSurveyImages = async (req, res) => {

  // const testImage = new Image({url:'https://www.placehold.it/69x69'});
  // await testImage.save();

  await Image.find({}).limit(parseInt(req.params.number))
  .then(result => {
    res.json(result);
  })
  .catch(err => {console.log(`error getting images:\n${err}`)})

}