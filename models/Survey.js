const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const surveySchema = new mongoose.Schema({
  surveyName: {type: String},
  surveyImages: {type: Array}
});

surveySchema.plugin(mongodbErrorHandler);
module.exports = mongoose.model('Survey', surveySchema);
