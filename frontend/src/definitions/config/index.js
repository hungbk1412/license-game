let api_version = 'api/v1';
let BACKEND_BASE_URL_API = 'http://localhost/backend/' + api_version;
let KEYCLOAK_BASE_URL_API = 'http://localhost/keycloak/';
if (process.env.REACT_APP_KEYCLOAK_BASE_URL) {
    KEYCLOAK_BASE_URL_API = process.env.REACT_APP_KEYCLOAK_BASE_URL;
}
if (process.env.REACT_APP_BACKEND_BASE_URL) {
    BACKEND_BASE_URL_API = process.env.REACT_APP_BACKEND_BASE_URL;
}


export {BACKEND_BASE_URL_API, KEYCLOAK_BASE_URL_API};