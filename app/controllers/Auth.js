const UserModel = require('../models/User.js');
const BlacklistModel = require('../models/Blacklist');
const CryptService = require('../services/bcrypt');
const jwtService = require('../services/jwToken.js');

const Auth = {
  Verify: (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    BlacklistModel.find({token}, (err, resp) => {
      if (err) return res.status(500).json({success: false, Response: 'Internal error while authenticate token'});
      if (resp) return res.status(403).json({success: false, Response: 'Failed to authenticate token.'});

      jwtService.VerifyToken(token, (error, verifiedToken) => {
        if (err) return res.status(403).json({success: false, Response: 'Failed to authenticate token.'});
        if (!verifiedToken) return res.status(500).json({success: false, Response: 'Internal error while authenticate token'});

        return next();
      });
    });
  },
  Login: (req, res) => {
    UserModel.findOne({
      $or: [
        {username: req.body.login},
        {email: req.body.login},
      ],
    }).exec()
      .then((user) => {
        if (!user) return res.status(403).json({error: true, Response: 'Authentication failed. User not found.'});

        const password = req.body.password;

        return CryptService.ComparePassword(password, user.password, (error, resp) => {
          if (error) return res.status(500).json({error});
          if (!resp.match) return res.status(403).json({
            error: true,
            Response: `Authentication failed. ${resp.message}`,
          });

          return jwtService.CreateToken(user, (err, token) => {
            if (err) return res.status(500).json({
              success: false,
              message: `Failed while creating authenticate token. ${err}`,
            });
            if (!token) return res.status(500).json({
              success: false,
              message: 'Failed while creating authenticate token.',
            });

            return res.status(200).json({
              error: false,
              Response: 'Your authentication is valid',
              token,
            });
          });
        });
      })
      .catch(err => res.status(500).json({error: err.errors, Response: {message: err.message}}));
  },
  Register: (req, res) => {
    this.saltedPassword = null;

    CryptService.BeforeCreate(req.body.password, (error, resp) => {
      if (error) return res.json({error: error.errors, Response: {message: error.message}});

      this.saltedPassword = resp;

      const User = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: this.saltedPassword,
        score: 0,
      });

      return UserModel.find({
        $or: [
          {email: req.body.email},
          {username: req.body.username},
        ],
      })
        .exec()
        .then((user) => {
          if (user.length) return res.status(200).json({error: true, Response: 'User exists!'});

          return UserModel.create(User, (err) => {
            if (err) return res.status(500).json({error: err, Response: {message: err}});

            return res.status(200).json({error: false, Response: `User ${req.body.username} added`});
          });
        })
        .catch((err) => {
          res.status(500).json({error: err.errors, Response: {message: err.message}});
        });
    });
  },
  Logout: (req, res) => {
    UserModel.find({
      $or: [
        {email: req.body.login},
        {username: req.body.login},
      ],
    }).exec()
      .then((user) => {
        if (!user || !user.length) return res.status(200).json({error: true, Response: 'Username does not exists'});

        const User = new BlacklistModel({
          user,
          token: req.body.token,
          reason: 'logout',
        });

        return BlacklistModel.create(User, (err) => {
          if (err) return res.status(500).json({error: err, Response: {message: err}});

          return res.status(200).json({error: false, Response: 'Success Logout'});
        });
      })
      .catch((err) => {
        res.status(500).json({error: err.errors, Response: {message: err.message}});
      });
  },
};

module.exports = Auth;
