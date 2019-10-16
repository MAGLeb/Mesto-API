const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (link) => link.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.([-a-zA-Z0-9@:%_+.~#?&//=]*)([-a-zA-Z0-9@:%_+.~#?&//=]*)/g),
    },
    message: (link) => `${link.value} не валидная ссылка`,
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
