const MongoClient = require('mongodb').MongoClient;
const dbUri = require('./config').dbUri;
const defaultUsers = require('./config').defaultUsers;
const bcryptSaltRounds = require('./config').bcryptSaltRounds;
const bcrypt = require('bcrypt');

let connectedDb;

// Seed default users for testing purposes
// If users already found, don't add them
const seedDefaultUsers = (connectedDb) => {
    for (const defaultUser of defaultUsers) {  
        connectedDb.collection('users')
            .findOne({username: defaultUser.username}, (err, user) => {
                if (!user)
                    bcrypt.hash(defaultUser.password, bcryptSaltRounds, function(err, hash) {
                        connectedDb.collection('users').insertOne({
                            email: defaultUser.email,
                            password: hash,
                            name: defaultUser.name,
                            role: defaultUser.role
                        });
                    });
            });
    }
};

module.exports = {
    connectToServer: (callback) => {
        MongoClient.connect(dbUri, {
            useUnifiedTopology: true,	
        }).then(client => {
            connectedDb = client.db('booking_system');
            seedDefaultUsers(connectedDb);
            return callback();
        });
    },
    getConnectedDb: () => {
      return connectedDb;
    }
};
