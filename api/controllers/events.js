const ObjectID = require('mongodb').ObjectID;
const sanitize = require('mongo-sanitize');

const getEvents = (req, res, dbClient) =>
    dbClient.collection('events')
        .find()
        .toArray()
        .then(events =>  res.json(events));


const getEvent = (req, res, dbClient) => {
    const eventId = sanitize(req.params.id);

    if (ObjectID.isValid(eventId)) {
        dbClient.collection('events')
            .findOne({ _id: ObjectID(eventId) })
            .then(event =>  res.json(event));
    } else {
        res.status(400).send({status: 'MISSING_FIELDS'});
    }
}

exports.getEvents = getEvents;
exports.getEvent = getEvent;
