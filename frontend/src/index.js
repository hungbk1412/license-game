import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Keycloak from "keycloak-js";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import store from "./store";

const keycloak = Keycloak('/keycloak.json');
keycloak
    .init({onLoad: 'login-required'})
    .then((authenticated) => {
        if (authenticated) {
            window.accessToken = keycloak.token;
            ReactDOM.render(
                <React.StrictMode>
                    <Provider store={store}>
                        <App/>
                    </Provider>
                </React.StrictMode>,
                document.getElementById('root')
            );
        }
    });


