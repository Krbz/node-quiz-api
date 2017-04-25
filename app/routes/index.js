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
Router.route('/quiz').post(Controllers.Quiz.GetList);
Router.route('/quiz/add').post(validate(Validators.Quiz.Add), Controllers.Quiz.AddQuiz);

Router.route('/quiz/levels').post(validate(Validators.Level.Get), Controllers.Levels.Get);
Router.route('/quiz/levels/add').post(validate(Validators.Level.Add), Controllers.Levels.Add);

Router.route('/quiz/questions').post(validate(Validators.Question.Get), Controllers.Questions.Get);
Router.route('/quiz/questions/add').post(validate(Validators.Question.Add), Controllers.Questions.Add);

module.exports = Router;
