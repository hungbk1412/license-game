import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Keycloak from "keycloak-js";
import 'bootstrap/dist/css/bootstrap.min.css';

const keycloak = Keycloak('/keycloak.json');
keycloak
  .init({ onLoad: 'login-required' })
  .then(authenticated => {
    console.log("authenticated :", authenticated);
    console.log("keycloak token : ", keycloak.token);
    if (authenticated) {
      window.accessToken = keycloak.token;
      ReactDOM.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>,
        document.getElementById('root')
      );
    }
  });


