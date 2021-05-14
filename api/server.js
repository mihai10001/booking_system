const express = require('express');
const cors = require('cors')
const routes = require('./endpoints');
const dbUtils = require('./dbUtils');

const app = express();
const port = 8123;
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
        // Start listening on default port
        app.listen(port, () => {  
            console.log('Hello world from ' + port);
        });
    }
});