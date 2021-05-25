const ObjectID = require('mongodb').ObjectID;
const sanitize = require('mongo-sanitize');

const getTickets = (req, res, dbClient) => {
    const eventId = sanitize(req.params.eventId);

    if (ObjectID.isValid(eventId)) {
        dbClient.collection('tickets')
            .find({ event_id: ObjectID(eventId) })
            .toArray()
            .then(tickets =>  res.json(tickets));
    } else {
        res.status(400).send({status: 'MISSING_FIELDS'});
    }
}


const getTicket = (req, res, dbClient) => {
    const ticketId = sanitize(req.params.ticketId);

    if (ObjectID.isValid(ticketId)) {
        dbClient.collection('tickets')
            .findOne({ _id: ObjectID(ticketId) })
            .then(event =>  res.json(event));
    } else {
        res.status(400).send({status: 'MISSING_FIELDS'});
    }
}


exports.getTickets = getTickets;
exports.getTicket = getTicket;
