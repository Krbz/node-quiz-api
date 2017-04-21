const jwtService = require('../services/jwToken.js');

const Auth = {
  Verify: (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    jwtService.VerifyToken(token, (err, resp) => {
      if (err) return res.status(403).json({ success: false, Response: 'Failed to authenticate token.' });
      if (!resp) return res.status(500).json({ success: false, Response: 'Internal error while authenticate token' });

      req.encoded = resp;

      return next();
    });
  },
  Login: (req, res) => res.json({ status: 200 }),
  Register: (req, res) => {},
  Logout: (req, res) => {},
};

module.exports = Auth;
