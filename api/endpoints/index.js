const verifyJWTMiddleware = require('../middlewares/verifyJWT').verifyJWT;
const verifyAdminMiddleware = require('../middlewares/verifyAdminRole').verifyAdminRole;

const { login, register, getUser, updateUser } = require('../controllers/users');
const { getEvents, getEvent, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { getTickets, getTicket, createTicket, updateTicket, deleteTicket } = require('../controllers/tickets');
const { getBookings, createBooking, updateBooking, deleteBooking } = require('../controllers/bookings');
const { getReviews, createReview } = require('../controllers/reviews');


module.exports = function(app, dbClient) {

    // Users

    app.post('/register', (req, res) => {
      register(req, res, dbClient);
    });

    app.post('/login', (req, res) => {
      login(req, res, dbClient);
    });

    app.get('/profile', verifyJWTMiddleware, (req, res) => {
      getUser(req, res, dbClient);
    });

    app.put('/profile', verifyJWTMiddleware, (req, res) => {
      updateUser(req, res, dbClient);
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


    // Tickets

    app.get('/tickets/from_event/:eventId', verifyJWTMiddleware, (req, res) => {
      getTickets(req, res, dbClient);
    });

    app.get('/tickets/:ticketId', verifyJWTMiddleware, (req, res) => {
      getTicket(req, res, dbClient);
    });

    app.post('/tickets/from_event/:eventId', verifyJWTMiddleware, verifyAdminMiddleware, (req, res) => {
      createTicket(req, res, dbClient);
    });

    app.put('/tickets/:ticketId', verifyJWTMiddleware, verifyAdminMiddleware, (req, res) => {
      updateTicket(req, res, dbClient);
    });

    app.delete('/tickets/:ticketId', verifyJWTMiddleware, verifyAdminMiddleware, (req, res) => {
      deleteTicket(req, res, dbClient);
    });


    // Bookings

    app.get('/bookings', verifyJWTMiddleware, (req, res) => {
      getBookings(req, res, dbClient);
    });

    app.post('/bookings/:ticketId', verifyJWTMiddleware, (req, res) => {
      createBooking(req, res, dbClient);
    });

    app.put('/bookings/:bookingId', verifyJWTMiddleware, (req, res) => {
      updateBooking(req, res, dbClient);
    });

    app.delete('/bookings/:bookingId', verifyJWTMiddleware, (req, res) => {
      deleteBooking(req, res, dbClient);
    });


    // Reviews

    app.get('/reviews/:eventId', verifyJWTMiddleware, (req, res) => {
      getReviews(req, res, dbClient);
    });

    app.post('/reviews/:eventId', verifyJWTMiddleware, (req, res) => {
      createReview(req, res, dbClient);
    });


    // Test endpoint (ping)

    app.get('/today', (req, res) => {
      res.status(202).send({date: new Date()});
    });

};