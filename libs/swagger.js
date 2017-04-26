const swaggerJSDoc = require('swagger-jsdoc');
const application = require('../package.json');

const swaggerDefinition = {
  info: {
    title: 'Node Quiz API - Swagger',
    version: application.version,
    description: 'RESTful API with Swagger',
  },
  host: 'localhost:3000',
  basePath: '/',
};

const options = {
  swaggerDefinition,
  apis: ['./app/routes/index.js'],
};

module.exports = swaggerJSDoc(options);
