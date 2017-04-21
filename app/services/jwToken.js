const jwt = require('jsonwebtoken');
const config = require('../../config/secrets.json');

const env = process.env.ENV || 'development';
const tokenSecret = config[env].jwt;
const expiresIn = '120m';

const Token = {
  CreateToken: (user, next) => {
    jwt.sign({ _id: user.id }, tokenSecret, { expiresIn }, (err, token) => {
      next(err, { token });
    });
  },

  VerifyToken: (token, next) => {
    jwt.verify(token, tokenSecret, (err, decoded) => {
      next(err, decoded);
    });
  },
};

module.exports = Token;
