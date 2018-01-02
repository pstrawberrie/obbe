const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const questionResultSchema = new mongoose.Schema({
  resultSet: {type: Array}
});

questionResultSchema.plugin(mongodbErrorHandler);
module.exports = mongoose.model('QuestionResult', questionResultSchema);
