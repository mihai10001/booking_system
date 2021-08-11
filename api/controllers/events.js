const ObjectID = require('mongodb').ObjectID;
const sanitize = require('mongo-sanitize');
const { pick, isEmpty } = require('lodash');


var createOrUpdateEventModel = [
    'title',
    'description',
    'city',
    'genre_type',
    'image_url',
    'start_date',
    'end_date',
    'commission_percentage'
];


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


const createEvent = (req, res, dbClient) => {
    const newEventData = sanitize(pick(req.body, createOrUpdateEventModel));
    const newEvent = {
        'title': newEventData.title || '',
        'description': newEventData.description || '',
        'city': newEventData.city || '',
        'genre_type': newEventData.genre_type || '',
        'image_url': newEventData.image_url || '',
        'start_date': newEventData.start_date || new Date(),
        'end_date': newEventData.end_date || new Date(),
        'commission_percentage': newEventData.commission_percentage || 0
    }

    if (!isEmpty(newEventData)) {
        dbClient.collection('events')
            .insertOne(newEvent)
            .then(entry => res.status(200).send({ status: 'OK', eventId: entry.insertedId }));
    } else {
        res.status(400).send({status: 'MISSING_FIELDS'});
    }
}


const updateEvent = (req, res, dbClient) => {
    const eventId = sanitize(req.params.id);
    const updateEventData = sanitize(pick(req.body, createOrUpdateEventModel));

    if (ObjectID.isValid(eventId) && !isEmpty(updateEventData)) {
        dbClient.collection('events')
            .updateOne({ _id: ObjectID(eventId) }, { $set: updateEventData })
            .then(entry => res.status(200).send({ status: 'OK'}));
    } else {
        res.status(400).send({status: 'MISSING_FIELDS'});
    }
}


const deleteEvent = (req, res, dbClient) => {
    const eventId = sanitize(req.params.id);

    if (ObjectID.isValid(eventId)) {
        dbClient.collection('events')
            .deleteOne({ _id: ObjectID(eventId) })
            .then(entry => res.status(204).send({ status: 'DELETED'}));
    } else {
        res.status(400).send({status: 'MISSING_FIELDS'});
    }
}

exports.getEvents = getEvents;
exports.getEvent = getEvent;
exports.createEvent = createEvent;
exports.updateEvent = updateEvent;
exports.deleteEvent = deleteEvent;
