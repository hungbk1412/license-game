// const session = require('express-session');
const Keycloak = require('keycloak-connect');

let keycloak;

exports.initKeycloak = (memoryStore) => {
  if (keycloak) {
    return keycloak;
  } else {
    // configuration of keycloak will be automatically loaded from the file keycloak.json
    keycloak = new Keycloak({
      store: memoryStore,
      secret: 'any_key',
      resave: false,
      saveUninitialized: true,
    });
    return keycloak;
  }
};