# Node Quiz API
Work in Progress, 

Node RESTFUL API using [Express](https://github.com/expressjs/express).

Server-side of [React Quiz](https://github.com/Krbz/react-quiz). 

## Quick start

### 1. Copy a config files and fill it

1.1. Database configuration
```sh
$ cp config/database.example.json config/database.json
```

1.2 Secrets config
```sh
$ cp config/secrets.example.json config/secrets.json
```
!NOTE - You will need own server with MongoDB

### 2. Install dependencies
```sh
$ npm install 
```
or
```sh
$ yarn
```

### 3. Run server
```sh
$ npm start:dev
```

## Dependecies

| Plugin | Description |
| ------ | ------ |
| [Express](https://github.com/expressjs/express) | Fast, unopinionated, minimalist web framework for node |
| [Mongoose](https://github.com/Automattic/mongoose) | Mongoose is a [MongoDB](https://www.mongodb.org/) object modeling tool designed to work in an asynchronous environment |
| [Babel](https://github.com/babel/babel) | The compiler for writing next generation JavaScript |
| [Request](https://github.com/request/request) | Simplified HTTP client |
| [ESLint](https://github.com/eslint/eslint) | A fully pluggable tool for identifying and reporting on patterns in JavaScript |
| [Joi](https://github.com/hapijs/joi) | Object schema validation |
| [Body-Parser](https://github.com/expressjs/body-parser) | Node.js body parsing middleware |
| [Nodemon](https://github.com/remy/nodemon) | Monitor for any changes in your node.js application and automatically restart the server - perfect for development |
| [Node-cron](https://github.com/ncb000gt/node-cron) | Cron jobs for your node |
| [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) | Lib to help you hash passwords |
| [Bluebird](https://github.com/petkaantonov/bluebird) | Fully featured promise library |
| [Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | An implementation of [JSON Web Tokens](https://tools.ietf.org/html/rfc7519) |
| [Swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) | Integrate Swagger using JSDoc. |
| [Swagger-ui-express](https://github.com/scottie1984/swagger-ui-express) | Adds middleware to your express app to serve the Swagger UI |

## License
MIT © [Krystian Błaszczyk](https://github.com/Krbz)
