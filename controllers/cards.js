const Card = require('../models/card');

const handleResponse = (dbResponse, res) => {
  dbResponse
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  if (!name || !link) {
    res.send({ message: 'Введите имя и ссылку на картинку, чтобы создать карточку' });
    return;
  }

  handleResponse(Card.create({ name, link, owner }), res);
};

const deleteCard = (req, res) => {
  handleResponse(Card.findByIdAndRemove(req.params.cardId), res);
};

const getAllCard = (req, res) => {
  handleResponse(Card.find({}), res);
};

const likeCard = (req, res) => {
  handleResponse(Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  ), res);
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
