const app = require('express');
const validate = require('express-validation');

const Controllers = require('../controllers');
const Validators = require('../validators/index');

const Router = app.Router();

Router.route('/').post((req, res) => res.json({
  url: 'https://github.com/Krbz/node-quiz-api',
  author: 'https://github.com/Krbz',
}));

/* Public routes */
Router.route('/auth/register').post(Controllers.Auth.Register);
Router.route('/auth/login').post(Controllers.Auth.Login);

// Token verify
Router.use(validate(Validators.Auth.verifyAuth), Controllers.Auth.Verify);

/* Private routes */
Router.route('/quiz/add').post(validate(Validators.Quiz.Add), Controllers.Quiz.AddQuiz);

Router.route('/quiz/list').post(Controllers.Quiz.GetList);
Router.route('/quiz/levels').post(Controllers.Quiz.GetLevels);
Router.route('/quiz/questions').post(Controllers.Quiz.GetQuestions);

module.exports = Router;
