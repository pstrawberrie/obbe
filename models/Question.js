const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const questionSchema = new mongoose.Schema({
  question: {type: String}
});

questionSchema.plugin(mongodbErrorHandler);
module.exports = mongoose.model('Question', questionSchema);
