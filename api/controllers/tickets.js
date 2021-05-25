const ObjectID = require('mongodb').ObjectID;
const sanitize = require('mongo-sanitize');
const { pick, isEmpty } = require('lodash');

var createOrUpdateTicketModel = [ 'title', 'description', 'base_price', 'available_tickets'];


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


const createTicket = (req, res, dbClient) => {
    const eventId = sanitize(req.params.eventId);
    const newTicketData = sanitize(pick(req.body, createOrUpdateTicketModel));

    if (ObjectID.isValid(eventId) && !isEmpty(newTicketData)) {
        dbClient.collection('tickets')
                .insertOne({ event_id: ObjectID(eventId), ...newTicketData })
            .then(entry => res.status(200).send({ status: 'OK'}));
    } else {
        res.status(400).send({status: 'MISSING_FIELDS'});
    }
}


const updateTicket = (req, res, dbClient) => {
    const ticketId = sanitize(req.params.ticketId);
    const updateTicketData = sanitize(pick(req.body, createOrUpdateTicketModel));

    if (ObjectID.isValid(ticketId) && !isEmpty(updateTicketData)) {
        dbClient.collection('tickets')
            .updateOne({ _id: ObjectID(ticketId) }, { $set: updateTicketData })
            .then(entry => res.status(200).send({ status: 'OK'}));
    } else {
        res.status(400).send({status: 'MISSING_FIELDS'});
    }
}


const deleteTicket = (req, res, dbClient) => {
    var ticketId = sanitize(req.params.ticketId);

    if (ObjectID.isValid(ticketId)) {
        dbClient.collection('tickets')
            .deleteOne({ _id: ObjectID(ticketId) })
            .then(entry => res.status(204).send({ status: 'DELETED'}));
    } else {
        res.status(400).send({status: 'MISSING_FIELDS'});
    }
}


exports.getTickets = getTickets;
exports.getTicket = getTicket;
exports.createTicket = createTicket;
exports.updateTicket = updateTicket;
exports.deleteTicket = deleteTicket;