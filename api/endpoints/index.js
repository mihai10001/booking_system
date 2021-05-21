const verifyJWTMiddleware = require('../middlewares/verifyJWT').verifyJWT;
const verifyAdminMiddleware = require('../middlewares/verifyAdminRole').verifyAdminRole;

const { login, register } = require('../controllers/users');
const { getEvents, getEvent, createEvent, updateEvent, deleteEvent } = require('../controllers/events');

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

    app.post('/events', verifyJWTMiddleware, verifyAdminMiddleware, (req, res) => {
      createEvent(req, res, dbClient);
    });

    app.put('/events/:id', verifyJWTMiddleware, verifyAdminMiddleware, (req, res) => {
      updateEvent(req, res, dbClient);
    });

    app.delete('/events/:id', verifyJWTMiddleware, verifyAdminMiddleware, (req, res) => {
      deleteEvent(req, res, dbClient);
    });

};