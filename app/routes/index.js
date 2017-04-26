const app = require('express');
const validate = require('express-validation');

const Controllers = require('../controllers');
const Validators = require('../validators/index');

const Router = app.Router();

/* Public routes */

/**
 * @swagger
 * /api/:
 *   get:
 *     description: Returns the Author data
 *     responses:
 *       200:
 *         description: hello world
 */
Router.route('/').get((req, res) => res.json({
  url: 'https://github.com/Krbz/node-quiz-api',
  author: 'https://github.com/Krbz',
}));

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - auth
 *     description: Creates a new User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: request
 *         description: User's Register request
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User ${username} added
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               required: true
 *             email:
 *               type: string
 *               required: true
 *             password:
 *               type: string
 *               required: true
 *       500:
 *         description: Failed to register user ${err}
 */
Router.route('/auth/register').post(validate(Validators.Auth.Register), Controllers.Auth.Register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - auth
 *     description: User Login
 *     consumes:
 *       - 'application/json; charset=utf-8'
 *     parameters:
 *       - name: request
 *         description: User's login request
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Your authentication is valid
 *         schema:
 *           type: object
 *           properties:
 *             login:
 *               type: string
 *               required: true
 *             password:
 *               type: string
 *               required: true
 *       500:
 *         description: Failed while creating authenticate token. ${err}
 *       403:
 *         description: Authentication failed. ${resp.message}
 */
Router.route('/auth/login').post(validate(Validators.Auth.Login), Controllers.Auth.Login);

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
