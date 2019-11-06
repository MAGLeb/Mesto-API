const router = require('express').Router();

router.use('*', (req, res) => {
  res.status(404).send('<h1>Page not found</h1>');
});

module.exports = router;
