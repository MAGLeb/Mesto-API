const router = require('express').Router();
const {
  getAllCard, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);
router.get('/cards', getAllCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
