const app = require('express');
const Controllers = require('../controllers');

const Router = app.Router();

/**
 * Public instance
 */
Router.route('/').post((req, res) => {
    return res.json({
        success: 'https://github.com/Krbz/node-quiz-api',
        author: 'https://github.com/Krbz'
    });
});

module.exports = Router;
