const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const constants = require('./utils/constants');
const utils = require('./utils/utils');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt_decode = require('jwt-decode');
const UserModel = require('./models/user');

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

app.post('/api/v1/check-compatible', (req, res) => {
    const {type} = req.body;
    const bearer_token = req.headers.authorization;
    const token = bearer_token.split(' ')[1];
    const decoded_token = jwt_decode(token);
    console.log('req.body :>> ', req.body);
    if (type.toLowerCase() === constants.TYPE.collage) {
        res.send(utils.checkCompatibilityCollage(req.body))
    } else if (type.toLowerCase() === constants.TYPE.composition) {
        res.send(utils.checkCompatibilityComposition(req.body))
    }
});

// getProgress
app.get('/api/v1/progress/get', (req, res) => {
    const bearer_token = req.headers.authorization;
    const token = bearer_token.split(' ')[1];
    const decoded_token = jwt_decode(token);
    UserModel
        .findOne({email: decoded_token.email})
        .then(userDoc => {
            res.status(200).json(userDoc.toJSON());  
        })
});

// postProgress
app.post('/api/v1/progress/post', (req, res) => {
    const bearer_token = req.headers.authorization;
    const token = bearer_token.split(' ')[1];
    const decoded_token = jwt_decode(token);
    console.log('decoded_token :>> ', decoded_token);
    console.log('req.body :>> ', req.body);
    
    UserModel
        .findOne({email: decoded_token.email})
        .then(userDoc => {
            console.log('userDoc :>> ', userDoc);
            if (!userDoc || userDoc.sub !== decoded_token.sub) {
                const user = new UserModel({...decoded_token, ...req.body});
                return user.save();
            } else {
                console.log('userDoc.level :>> ', userDoc.level);
                console.log('userDoc level :>> ', userDoc.get('level'));
                console.log('userDoc.toJSON :>> ', userDoc.toJSON());
                console.log('object :>> ', {...userDoc, level: {...userDoc.get('level', {getters: false}), ...req.body.level}});
                userDoc.set('level', {
                    ...userDoc.toJSON().level,
                    ...req.body.level
                })
                return userDoc.save();
            }            
        })
        .then(result => {
            res.status(200).json(result);
        })
});



mongoose.connect('mongodb://localhost:27017/license_game', {useNewUrlParser: true, useUnifiedTopology: true}).then(res => {
    console.log('connected to mongoDB');
    app.listen(5000, () => {
        console.log('App listening on port 5000');
    });
}).catch(err => console.log(err));
