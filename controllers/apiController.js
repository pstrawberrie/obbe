const mongoose = require('mongoose');
const Question = mongoose.model('Question');
const QuestionResults = mongoose.model('QuestionResult');
const Image = mongoose.model('Image');
const ImageResults = mongoose.model('ImageResult');

const questionsJSON = require('../data/questions.json');
const imagesJSON = require('../data/images.json');

// Get Survey Questions
exports.getSurveyQuestions = async (req, res) => {

  // const testQuestion = new Question({question:'Can i give u hug?'});
  // await testQuestion.save();

  await Question.find({})
  .then(result => {
    //check for questions and populate if they aren't proper
    if(result.length != questionsJSON.length) {
      Question.remove({}).then(result => {

        Question.create(questionsJSON)
        .then(result => {
          console.log('updated questions');
          Question.find({})
          .then(result => {res.json(result)})
          .catch(err => {console.log(err)})
        })
        .catch(err => {console.log(err)});

      }).catch(err => {console.log(err)});
    } else {
      res.json(result);
    }
  })
  .catch(err => {console.log(`error getting survey questions:\n${err}`)})

}

// Get Survey Images
exports.getSurveyImages = async (req, res) => {

  // const testImage = new Image({url:'https://www.placehold.it/69x69'});
  // await testImage.save();

  await Image.find({})
  .then(result => {
    //check for images and populate if they aren't proper
    if(result.length != imagesJSON.length) {
      Image.remove({}).then(result => {

        Image.create(imagesJSON)
        .then(result => {
          console.log('updated images');
          Image.find({})
          .then(result => {res.json(result)})
          .catch(err => {console.log(err)})
        })
        .catch(err => {console.log(err)});

      }).catch(err => {console.log(err)});
    } else {
      res.json(result);
    }
  })
  .catch(err => {console.log(`error getting survey questions:\n${err}`)})

}

// Save Survey Questions
exports.saveSurveyQuestions = async (req, res) => {

  const questionResults = new QuestionResults({resultSet:req.body});
  await questionResults.save()
  .then(result => { 
    console.log('saved question results');
    res.json({save:'success'});
  })
  .catch(err => {
    console.log(`err saving question results:\n${err}`);
    res.json({save:'failed'});
  });

}

// Save Survey Images
exports.saveSurveyImages = async (req, res) => {

  const imageResults = new ImageResults({
    images: req.body.images,
    selectedImage: req.body.selectedImage
  });
  await imageResults.save()
  .then(result => { 
    console.log('saved image results');
    res.json({save:'success'});
  })
  .catch(err => {
    console.log(`err saving image results:\n${err}`);
    res.json({save:'failed'});
  });

}