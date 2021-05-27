const ObjectID = require('mongodb').ObjectID;
const sanitize = require('mongo-sanitize');
const { pick, isEmpty } = require('lodash');

var createReviewModel = ['description', 'rating'];


const getReviews = (req, res, dbClient) => {
    const eventId = sanitize(req.params.eventId);

    if (ObjectID.isValid(eventId)) {
        dbClient.collection('reviews')
            .find({ event_id: ObjectID(eventId) })
            .toArray()
            .then(reviews =>  res.json(reviews));
    } else {
        res.status(400).send({status: 'MISSING_FIELDS'});
    }
}


const createReview = (req, res, dbClient) => {
    const eventId = sanitize(req.params.eventId);
    const reviewData = sanitize(pick(req.body, createReviewModel));

    const newReviewData = {
        ...ObjectID.isValid(eventId) ? { 'event_id': ObjectID(eventId) } : {},
        ...reviewData
    };

    if (ObjectID.isValid(eventId) && !isEmpty(newReviewData)) {
        dbClient.collection('reviews')
            .insertOne(newReviewData)
            .then(entry => res.status(200).send({ status: 'OK'}));
    } else {
        res.status(400).send({status: 'MISSING_FIELDS'});
    }
}


exports.getReviews = getReviews;
exports.createReview = createReview;
