const router = require('express').Router();
const { NoResursError } = require('../middlewares/errors');

router.use('*', (req, res, next) => {
  next(new NoResursError('Page not found'))
});

module.exports = router;
