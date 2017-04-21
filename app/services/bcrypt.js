const bcrypt = require('bcrypt');

const Crypt = {
  BeforeCreate: (password, cb) => {
    bcrypt.genSalt(10, (saltErr, salt) => {
      if (saltErr) return cb({ error: saltErr });

      return bcrypt.hash(password, salt, (hashErr, hash) => {
        if (hashErr) return cb({ error: hashErr });

        return cb({ hash });
      });
    });
  },

  ComparePassword: (password, saltedPassword, cb) => {
    bcrypt.compare(password, saltedPassword, (error, match) => {
      if (error) return cb({ error });
      if (match) return cb({ match, Response: 'Password valid' });

      return cb({ match, Response: 'Password invalid' });
    });
  }
};

module.exports = Crypt;
