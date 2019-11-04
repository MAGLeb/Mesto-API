const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
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
    type: String,
    require: true,
    validate: {
      validator: (link) => link.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.([-a-zA-Z0-9@:%_+.~#?&//=]*)([-a-zA-Z0-9@:%_+.~#?&//=]*)/g),
      message: (link) => `${link.value} not valid link`,
    },
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate: {
      validator: (email) => email.match(/^(?!.*@.*@.*$)(?!.*@.*\-\-.*\..*$)(?!.*@.*\-\..*$)(?!.*@.*\-$)(.*@.+(\..{1,11})?)$/g),
      message: (email) => `${email.value} not valid Email`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
}, {
  versionKey: false,
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Wrong login or password'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Wrong login or password'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
