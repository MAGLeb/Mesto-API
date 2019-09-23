const router = require('express').Router();
const users = require('../data/users.json');

const checkUser = (req, res, next) => {
  const user = users.filter((user) => {
    return user._id === req.params.id;
  });
  if(user.length === 0) {
    res.status(404).send("Нет пользователя с таким id");
    return;
  }
  res.send(user);
  next(user);

};

const sendUser = (user, req, res, next) => {
  res.send(user);
}

router.get('/users', (req, res) => {
  res.send(users);
});

router.get('/users/:id', checkUser);
router.get('/users/:id', sendUser);

module.exports = router;