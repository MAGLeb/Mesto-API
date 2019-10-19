const router = require('express').Router();
const bodyParser = require('body-parser');
const routerUsers = require('./users');
const routerCards = require('./cards');
const routerError = require('./error');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use('/', routerUsers);
router.use('/', routerCards);
router.use('/', routerError);

module.exports = router;
