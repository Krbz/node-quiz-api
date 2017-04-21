const app = require('express');
const validate = require('express-validation');

const Controllers = require('../controllers');
const Validators = require('../validators/index');

const Router = app.Router();

Router.route('/').post((req, res) => res.json({
  success: 'https://github.com/Krbz/node-quiz-api',
  author: 'https://github.com/Krbz',
}));

/* Public routes */
Router.route('/auth/register').post(Controllers.Auth.Register);
Router.route('/auth/login').post(Controllers.Auth.Login);

// Token verify
Router.use(validate(Validators.Auth.verifyAuth), Controllers.Auth.Verify);

/* Private routes */
Router.route('/auth/register').delete(Controllers.Auth.Register);


module.exports = Router;
