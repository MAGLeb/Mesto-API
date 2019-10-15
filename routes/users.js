const router = require('express').Router();
const {
  createUser, getUser, getAllUser, refreshAvatar, refreshInfoAboutMe,
} = require('../controllers/users');

router.post('/users', createUser);
router.get('/users/:userId', getUser);
router.get('/users', getAllUser);
router.patch('/users/:userId', refreshInfoAboutMe); // Позже, когда создадим авторизацию, изменю "userId" -> "me"
router.patch('/users/:userId/avatar', refreshAvatar);

module.exports = router;
