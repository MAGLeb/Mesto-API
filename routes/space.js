const router = require('express').Router();

router.get("/w*/", (req, res) => {
  res.status(404).send("<h1>Запрашиваемый ресурс не найден</h1>");
});

module.exports = router;