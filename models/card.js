const mongoose = require('mongoose');
require('mongoose-type-url');

const cardSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: mongoose.SchemaTypes.Url,
    require: true,
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
    require: true,
  },
  likes: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
    require: true,
    default: [],
  }],
  createAd: {
    type: Date,
    default: Date.now,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('card', cardSchema);
