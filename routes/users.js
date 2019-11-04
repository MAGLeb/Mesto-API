const router = require('express').Router();
const {
  getUser, getAllUser, refreshAvatar, refreshInfoAboutMe,
} = require('../controllers/users');

router.get('/users/:userId', getUser);
router.get('/users', getAllUser);
router.patch('/users/me', refreshInfoAboutMe);
router.patch('/users/me/avatar', refreshAvatar);

module.exports = router;
