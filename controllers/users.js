const User = require('../models/user');

const handleResponse = (dbResponse, res) => {
  dbResponse
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  if (!name || !about || !avatar) {
    res.send({ message: 'Введите имя, информацию о себе и ссылку на аватар' });
    return;
  }

  handleResponse(User.create({ name, about, avatar }), res);
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
    req.params.userId,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  ), res);
};

const refreshInfoAboutMe = (req, res) => {
  const { name, about } = req.body;

  handleResponse(User.findByIdAndUpdate(
    req.params.userId,
    {
      name,
      about,
    },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  ), res);
};

module.exports = {
  createUser,
  getUser,
  getAllUser,
  refreshAvatar,
  refreshInfoAboutMe,
};
