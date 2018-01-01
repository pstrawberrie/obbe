const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const surveySchema = new mongoose.Schema({
  question: {type: String}
});

surveySchema.plugin(mongodbErrorHandler);
module.exports = mongoose.model('Survey', surveySchema);
