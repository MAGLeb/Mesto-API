const router = require('express').Router();
const { Joi, celebrate} = require('celebrate');
const {
  getUser, getAllUser, refreshAvatar, refreshInfoAboutMe,
} = require('../controllers/users');

router.get('/users', getAllUser);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), refreshInfoAboutMe);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }),
}), refreshAvatar);

module.exports = router;
