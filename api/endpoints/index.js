const verifyJWTMiddleware = require('../middlewares/verifyJWT').verifyJWT;
const { login, register } = require('../controllers/users');
const { getEvents, getEvent,
  } = require('../controllers/events');

module.exports = function(app, dbClient) {

    // Users

    app.post('/register', (req, res) => {
      register(req, res, dbClient);
    });

    app.post('/login', (req, res) => {
      login(req, res, dbClient);
    });


    // Events

    app.get('/events', verifyJWTMiddleware, (req, res) => {
      getEvents(req, res, dbClient);
    });

    app.get('/events/:id', verifyJWTMiddleware, (req, res) => {
      getEvent(req, res, dbClient);
    });


};