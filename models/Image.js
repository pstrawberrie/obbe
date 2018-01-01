const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const imageSchema = new mongoose.Schema({
  url: {type: String}
});

imageSchema.plugin(mongodbErrorHandler);
module.exports = mongoose.model('Image', imageSchema);
