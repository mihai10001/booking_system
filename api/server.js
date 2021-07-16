const express = require('express');
const cors = require('cors')
const routes = require('./endpoints');
const dbUtils = require('./dbUtils');
const emailService = require('./services/emailService');

const app = express();
const port = process.env.PORT || 8123;
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// var corsOptions = { origin: 'http://localhost:4200' };
app.use(cors());

dbUtils.connectToServer((err) => {
    if (err) {
        console.log(err);
    } else {
        // Routes/endpoints go here
        routes(app, dbUtils.getConnectedDb());
        // Connect to email
        emailService.connectToEmail();
        // Start listening on default port
        app.listen(port, () => {  
            console.log('Hello world from ' + port);
        });
    }
});