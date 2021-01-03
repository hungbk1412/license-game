const express = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');
const constants = require("./utils/constants");
const utils = require("./utils/utils");
const cors = require('cors');
const mongoose = require('mongoose');
const jwt_decode = require('jwt-decode');

const app = express();

const memoryStore = new session.MemoryStore();

// app.use(function (req, res, next) {
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     // Pass to next layer of middleware
//     next();
// });
app.use(cors());
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));

const keycloak = require('./utils/keycloak-config').initKeycloak(memoryStore);

app.use(keycloak.middleware());

app.post("/api/v1/check-compatible", keycloak.checkSso(), (req, res) => {
    const {type} = req.body;
    const {bearer_token} = req.headers.Authorization;
    const token = bearer_token.split(' ')[1];
    console.log('req.body :>> ', req.body);
    if (type.toLowerCase() === constants.TYPE.collage) {
        res.send(utils.checkCompatibilityCollage(req.body))
    } else if (type.toLowerCase() === constants.TYPE.composition) {
        res.send(utils.checkCompatibilityComposition(req.body))
    }
});

mongoose.connect('mongodb://localhost:27017/license_game', {useNewUrlParser: true, useUnifiedTopology: true}).then(res => {
    console.log('connected to mongoDB');
    app.listen(5000, () => {
        console.log("App listening on port 5000");
    });
}).catch(err => console.log(err));
