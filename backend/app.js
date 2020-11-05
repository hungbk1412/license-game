const express = require("express");
const bodyParser = require('body-parser');
const constants = require("./utils/constants");
const utils = require("./utils/utils");

const app = express();

app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

app.post("/", (req, res) => {
  const { type } = req.body;
  if (type.toLowerCase() === constants.TYPE.collage) {
    console.log(req.body);
    console.log('utils.checkCompatibilityCollage(req.body) :>> ', utils.checkCompatibilityCollage(req.body));
    res.send(utils.checkCompatibilityCollage(req.body))
  } else if (type.toLowerCase() === constants.TYPE.composition) {
    console.log(req.body);
    console.log('utils.checkCompatibilityComposition(req.body) :>> ', utils.checkCompatibilityComposition(req.body));
    res.send(utils.checkCompatibilityComposition(req.body))
  }
});

app.listen(5000, () => {
  console.log("App listening on port 5000");
});