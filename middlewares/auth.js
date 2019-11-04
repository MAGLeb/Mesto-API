const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, 'Qi93O-2rp=e#BnM');
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Required authorization' });
  }

  req.user = payload;

  next();
};
