const jwt = require('jsonwebtoken');
const {
  AuthorizationError,
  OperationalError,
} = require('../utils/errors');

const sendToken = (req, res, next) => {
  jwt.sign({ username: req.parsed.username }, process.env.SECRET, { expiresIn: '1200s' }, (err, token) => {
    if (err) {
      next(new OperationalError('Could not generate Token'));
      return;
    }
    res.status(200).json({ token });
  });
};

const verifyToken = (req, res, next) => {
  let token = null;
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    token = bearerToken;
  } else {
    next(new AuthorizationError('Did not receive token'));
    return;
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      next(new AuthorizationError('Token Invalid. Forbidden!'));
      return;
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = {
  sendToken,
  verifyToken
};
