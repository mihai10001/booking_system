const jwt = require('jsonwebtoken');
const secretKey = require('../config').secretKey;
const bcryptSaltRounds = require('../config').bcryptSaltRounds;
const bcrypt = require('bcrypt');
const sanitize = require('mongo-sanitize');
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
                        const accessToken = jwt.sign({ id: user._id, role: user.role }, secretKey);
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
                        if (user) res.status(200).send("User registered successfully")
                    });
                });
            }
        });
}


exports.login = login;
exports.register = register;