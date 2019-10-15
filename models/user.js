const mongoose = require('mongoose');
require('mongoose-type-url');

const userShema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: mongoose.SchemaTypes.Url,
    require: true,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('user', userShema);
