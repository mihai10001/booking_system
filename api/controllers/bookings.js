const ObjectID = require('mongodb').ObjectID;
const sanitize = require('mongo-sanitize');
const { pick } = require('lodash');
const { getConnectedEmail } = require('../services/emailService');
const bookingStatuses = require('../utils/bookingStatuses.json');


const getBookings = (req, res, dbClient) => {
    const userId = sanitize(req.userId);
    let completeBookingInfo = [];

    if (ObjectID.isValid(userId)) {
        dbClient.collection('bookings')
            .find({ user_id: ObjectID(userId) })
            .project({user_id: 0})
            .toArray()
            .then(bookings => {
                completeBookingInfo = bookings;

                let ticketsForBookingsPromises = bookings.map(booking => {
                    return dbClient.collection('tickets').findOne({ _id: ObjectID(booking.ticket_id) })
                });
                return Promise.all(ticketsForBookingsPromises);

            }).then(tickets => {
                completeBookingInfo = completeBookingInfo.map(booking => {
                    return {...booking, ticket: tickets.find(ticket => ticket._id.equals(booking.ticket_id))}
                });

                let eventsForTicketsPromises = tickets.map(ticket => {
                    return dbClient.collection('events').findOne({ _id: ObjectID(ticket.event_id) })
                });
                return Promise.all(eventsForTicketsPromises);

            }).then(events => {
                completeBookingInfo = completeBookingInfo.map(booking => {
                    return {...booking, event: events.find(event => event._id.equals(booking.ticket.event_id))}
                });

                completeBookingInfo = completeBookingInfo.map(booking => {
                    return {
                        ...booking,
                        final_price: booking.ticket.base_price + (booking.event.commission_percentage * booking.ticket.base_price / 100)
                    }
                });

                res.json(completeBookingInfo);
            });
    } else {
        res.status(400).send({status: 'MISSING_FIELDS'});
    }
}


const createBooking = (req, res, dbClient) => {
    const userId = sanitize(req.userId);
    const userEmail = sanitize(req.userEmail);
    const ticketId = sanitize(req.params.ticketId);
    const mailOptions = {
        to: userEmail,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };

    const newBookingData = {
        ...ObjectID.isValid(userId) ? { 'user_id': ObjectID(userId) } : {},
        ...ObjectID.isValid(ticketId) ? { 'ticket_id': ObjectID(ticketId) } : {},
        status: bookingStatuses.pending
    };

    if (ObjectID.isValid(userId) && ObjectID.isValid(ticketId)) {
        dbClient.collection('bookings')
            .insertOne(newBookingData)
            .then(entry => {
                getConnectedEmail().sendMail(mailOptions, (error, info) => {
                    if (!error)
                        console.log('Email sent: ' + info.response);
                });
                res.status(200).send({ status: 'OK'})
            });
    } else {
        res.status(400).send({status: 'MISSING_FIELDS'});
    }
}


const updateBooking = (req, res, dbClient) => {
    const bookingId = sanitize(req.params.bookingId);
    const updateBookingStatus = sanitize(pick(req.body, 'status'));
    const updateBookingStatuses = [bookingStatuses.confirmed, bookingStatuses.canceled];

    if (ObjectID.isValid(bookingId) && updateBookingStatuses.includes(updateBookingStatus)) {
        dbClient.collection('bookings')
            .updateOne({ _id: ObjectID(bookingId) }, { $set: updateBookingStatus })
            .then(entry => res.status(200).send({ status: 'OK'}));
    } else {
        res.status(400).send({status: 'MISSING_FIELDS'});
    }
}


const deleteBooking = (req, res, dbClient) => {
    const bookingId = sanitize(req.params.bookingId);

    if (ObjectID.isValid(bookingId)) {
        dbClient.collection('bookings')
            .deleteOne({ _id: ObjectID(bookingId) })
            .then(entry => res.status(204).send({ status: 'DELETED'}));
    } else {
        res.status(400).send({status: 'MISSING_FIELDS'});
    }
}


exports.getBookings = getBookings;
exports.createBooking = createBooking;
exports.updateBooking = updateBooking;
exports.deleteBooking = deleteBooking;