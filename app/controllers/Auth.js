const UserModel = require('../models/User.js');
const CryptService = require('../services/bcrypt');
const jwtService = require('../services/jwToken.js');

const Auth = {
  Verify: (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    jwtService.VerifyToken(token, (err, resp) => {
      if (err) return res.status(403).json({success: false, Response: 'Failed to authenticate token.'});
      if (!resp) return res.status(500).json({success: false, Response: 'Internal error while authenticate token'});

      req.encoded = resp;

      return next();
    });
  },
  Login: (req, res) => {
    UserModel.findOne({
      $or: [
        {username: req.body.username},
        {email: req.body.email},
      ],
    }).exec()
      .then((user) => {
        if (!user) return res.status(403).json({error: true, Response: 'Authentication failed. User not found.'});

        const password = req.body.password;

        return CryptService.ComparePassword(password, user.password, (error, resp) => {
          if (error) return res.status(500).json({error});
          if (!resp.match) return res.status(403).json({error: true, Response: `Authentication failed. ${resp.message}`});

          return jwtService.CreateToken(user, (err, token) => {
            if (err) return res.status(500).json({success: false, message: `Failed while creating authenticate token. ${err}`});
            if (!token) return res.status(500).json({success: false, message: 'Failed while creating authenticate token.'});

            return res.json({
              error: false,
              Response: 'Your authentication is valid',
              token,
            });
          });
        });
      })
      .catch((err) => {
        return res.status(500).json({error: err.errors, Response: {message: err.message}});
      });
  },
  Register: (req, res) => {
    this.saltedPassword = null;

    CryptService.BeforeCreate(req.body.password, (error, resp) => {
      if (error) return res.json({error: error.errors, Response: {message: error.message}});

      this.saltedPassword = resp.hash;

      const User = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: this.saltedPassword,
      });

      return UserModel.find({ $or: [
          {email: req.body.email},
          {username: req.body.username},
      ]})
        .exec()
        .then((user) => {
          if (user.length) return res.json({error: false, Response: 'User exists!'});

          return UserModel.create(User, (err) => {
            if (err) return res.status(500).json({error: err, Response: {message: err}});

            return res.json({error: false, Response: `User ${req.body.username} added`});
          });
        })
        .catch((err) => {
          res.status(500).json({error: err.errors, Response: {message: err.message}});
        });
    });
  },
  Logout: (req, res) => {
  },
};


module.exports = Auth;
