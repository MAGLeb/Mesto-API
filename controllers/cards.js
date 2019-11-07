const Card = require('../models/card');
const { ServerError, NoResursError } = require('../middlewares/errors');

const handleResponse = (dbResponse, res, next) => {
  dbResponse
    .then((card) => res.send({ data: card }))
    .catch((err) => next(new ServerError(err.message)));
};

const handleResponseId = (dbResponse, req, res, next) => {
  dbResponse
    .then((card) => (card === null ? next(new NoResursError(`No card with this ID:${req.params.cardId}`)) : res.send({ data: card})))
    .catch(() => next(new NoResursError(`No card with this ID:${req.params.cardId}`)));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  if (!name || !link) {
    res.send({ message: 'Enter name and link to create card' });
    return;
  }

  handleResponse(Card.create({ name, link, owner }), res, next);
};

const deleteCard = (req, res, next) => {
  handleResponseId(Card.findByIdAndRemove(req.params.cardId), req, res, next);
};

const getAllCard = (req, res) => {
  handleResponse(Card.find({}), res);
};

const likeCard = (req, res, next) => {
  handleResponseId(Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  ), req, res, next)
};

const dislikeCard = (req, res, next) => {
  handleResponseId(Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  ), req, res, next)
};

module.exports = {
  createCard,
  deleteCard,
  getAllCard,
  likeCard,
  dislikeCard,
};
