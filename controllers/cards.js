const Card = require('../models/card');

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  if (!name || !link) {
    res.send({ message: 'Введите имя и ссылку на картинку, чтобы создать карточку' });
    return;
  }

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const getAllCard = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Данные не прошли валидацию. Либо произошло что-то совсем немыслимое' }));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Данные не прошли валидацию. Либо произошло что-то совсем немыслимое' }));
};

module.exports = {
  createCard,
  deleteCard,
  getAllCard,
  likeCard,
  dislikeCard,
};
