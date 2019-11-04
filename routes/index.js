const router = require('express').Router();
const routerUsers = require('./users');
const routerCards = require('./cards');
const routerError = require('./error');

router.use('/', routerUsers);
router.use('/', routerCards);
router.use('/', routerError);

module.exports = router;
