const jwt = require('jsonwebtoken');
const { options, secret } = require('./authConst');

module.exports = {
  validateToken: (req, res, next) => {
    const authorizationHeaader = req.headers.authorization;
    let result;
    if (authorizationHeaader) {
      const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
      try {
        result = jwt.verify(token, secret, options);
        req.decoded = result;
        // res.status(200).json(result);
        next();
      } catch (err) {
        res.status(401).send('Authentication error. Invalid token.');
      }
    } else {
      res.status(401).send('Authentication error. Token required.');
    }
  }
};