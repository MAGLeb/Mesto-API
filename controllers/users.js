const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const handleResponse = (dbResponse, res) => {
  dbResponse
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'Qi93O-2rp=e#BnM', { expiresIn: '7d' });
      res.status(201).cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).send({ message: 'Success authorization' });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!name || !about || !avatar || !email || !password) {
    res.send({ message: 'Введите имя, информацию о себе, ссылку на аватар, пароль и Email' });
    return;
  }

  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send(user))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const getUser = (req, res) => {
  handleResponse(User.findById(req.params.userId), res);
};

const getAllUser = (req, res) => {
  handleResponse(User.find({}), res);
};

const refreshAvatar = (req, res) => {
  const { avatar } = req.body;

  handleResponse(User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  ), res);
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
