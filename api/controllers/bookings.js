const ObjectID = require('mongodb').ObjectID;
const sanitize = require('mongo-sanitize');


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



exports.getBookings = getBookings;
