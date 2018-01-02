const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const imageResultSchema = new mongoose.Schema({
  images: {type: Array},
  selectedImage: {type: Object}
});

imageResultSchema.plugin(mongodbErrorHandler);
module.exports = mongoose.model('ImageResult', imageResultSchema);
