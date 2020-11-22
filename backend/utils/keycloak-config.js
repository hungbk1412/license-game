// const session = require('express-session');
const Keycloak = require('keycloak-connect');

let keycloak;

const keycloakConfig = {
  realm: 'License-game',
  'auth-server-url': 'https://localhost:8080/auth',
  'ssl-required': 'none',
  resource: 'node-microservice',
  realmPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAn0E5fNgHunnws3DIvlpzXuWAuNU/MwcXFOvO5QPXsHkvqih44ChWWeGjyV9zV7eIn1zG5CFYXcc9Vrgn3rQ+SzJsvsoJcTV/iOd4QoJiM6ESmT/JX/8IMUUD6+pWcaWCOM9ILE4CJTwuRl8ttorcx10hc/++bpMZ6jfqUpv1Q3fOKAAMdKJGH2n2b60qrOEqPjBoTxsWSXTI3y5Y2h2xf0GDZ+GJDHbz1iyIbDay2Ye+i6oKnnkAxIjSlqqqCA1kxRW3uG+ZXqz/MfMw/VRlbrp5pOHt8v385Wm053uS0sQks77eDzxranwMsKNLRPVbxFxXo+ULgsBwFWUuJKsE5wIDAQAB',
  'bearer-only': true,
};

exports.initKeycloak = (memoryStore) => {
  if (keycloak) {
    console.log('Returning existing Keycloak instance');
    return keycloak;
  } else {
    console.log('Initializing Keycloak...');
    // const memoryStore = new session.MemoryStore();
    keycloak = new Keycloak({
      store: memoryStore,
      secret: 'any_key',
      resave: false,
      saveUninitialized: true,
    }, keycloakConfig);
    return keycloak;
  }
};