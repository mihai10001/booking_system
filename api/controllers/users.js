const jwt = require('jsonwebtoken');
const secretKey = require('../config').secretKey;
const bcryptSaltRounds = require('../config').bcryptSaltRounds;
const bcrypt = require('bcrypt');
const sanitize = require('mongo-sanitize');
const ObjectID = require('mongodb').ObjectID;
const roles = require('../utils/roles.json');

// Filter/find first user that meets the criteria from the DB
// Compare hashes using bcrypt.compare() method
// Generate an access token, default signing with HMAC SHA256
const login = (req, res, dbClient) => {
    // Read email and password from request body
    const email = sanitize(req.body.email);
    const password = sanitize(req.body.password);

    if (!email || !password) {
        res.status(400).send('E-mail or password not given');
    }

    dbClient.collection('users')
        .findOne({'email': email}, (err, user) => {
            if (err || !user) {
                res.status(404).send('User not found! Username or password incorrect');
            } else {
                bcrypt.compare(password, user.password, function(err, result) {
                    if (err || !result) res.send('Username or password don\'t match');
                    if (result) {
                        const accessToken = jwt.sign({ id: user._id, role: user.role, email: user.email }, secretKey);
                        res.json({accessToken});
                    }
                });
            }
        });
}

const register = (req, res, dbClient) => {
    const email = sanitize(req.body.email);
    const password = sanitize(req.body.password);

    if (!email || !password) {
        res.status(400).send('E-mail or password not given');
    }

    dbClient.collection('users')
        .findOne({'email': email}, (err, user) => {
            if (err || user)
                res.status(404).send('E-mail already exists! Please choose another e-mail');
            else if (!user) {
                bcrypt.hash(password, bcryptSaltRounds, function(err, hash) {
                    dbClient.collection('users').insertOne({
                        email: email,
                        password: hash,
                        name: '',
                        role: roles.user
                    }, (err, user) =>  {
                        if (user) res.status(200).send({status: 'User registered successfully'})
                    });
                });
            }
        });
}


const getUser = (req, res, dbClient) => {
    const userId = sanitize(req.userId);

    if (ObjectID.isValid(userId)) {
        dbClient.collection('users')
            .findOne({ _id: ObjectID(userId) }, {projection: { password: 0, role: 0}})
            .then(user =>  res.json(user));
    } else {
        res.status(400).send({status: 'MISSING_FIELDS'});
    }
}


const updateUser = (req, res, dbClient) => {
    const userId = sanitize(req.userId);
    const name = req.body.name ? sanitize(req.body.name) : null;
    const password = req.body.password ? sanitize(req.body.password) : null;

    if (password) {
        bcrypt.hash(password, bcryptSaltRounds, function(err, hash) {
            dbClient.collection('users')
                .updateOne({ _id: ObjectID(userId) },
                    { $set: {
                        password: hash,
                        ...name ? name : {}
                    } })
                .then(entry => res.status(200).send({ status: 'OK'}));
        });
    } else if (name) {
        dbClient.collection('users')
            .updateOne({ _id: ObjectID(userId) }, { $set: { name } })
            .then(entry => res.status(200).send({ status: 'OK'}));
    }
}


exports.login = login;
exports.register = register;
exports.getUser = getUser;
exports.updateUser = updateUser;