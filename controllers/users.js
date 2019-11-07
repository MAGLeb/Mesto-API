const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { ServerError, NoResursError, NoAuthorizationError } = require('../middlewares/errors');

const handleResponse = (dbResponse, res, next) => {
  dbResponse
    .then((user) => res.send({ data: user }))
    .catch((err) => next(new ServerError(err.message)));
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.status(201).cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).send({ message: 'Success authorization' });
    })
    .catch((err) => {
      next(new NoAuthorizationError(err.message))
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!name || !about || !avatar || !email || !password) {
    res.send({ message: 'Enter name, info, avatar, email and password.' });
    return;
  }

  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
    .then((user) => res.send(user))
    .catch((err) => err.code === 11000 ? next(new ServerError(`User with ${email} exist, use other email`)) : next(new ServerError(err))));
};

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => (user === null ? next(new NoResursError(`No user with this ID:${req.params.userId}`)) : res.send({ data: user })))
    .catch(() => next(new NoResursError(`No user with this ID:${req.params.userId}`)));
};

const getAllUser = (req, res) => {
  handleResponse(User.find({}), res);
};

const refreshAvatar = (req, res, next) => {
  const { avatar } = req.body;

  handleResponse(User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  ), res, next);
};

const refreshInfoAboutMe = (req, res) => {
  const { name, about } = req.body;

  handleResponse(User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      about,
    },
    {
      new: true,
      runValidators: true,
    },
  ), res);
};

module.exports = {
  createUser,
  getUser,
  getAllUser,
  refreshAvatar,
  refreshInfoAboutMe,
  login,
};
