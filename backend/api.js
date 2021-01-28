let keycloak_base_url = '';
let mongo_db_base_url = '';

if (process.env.NODE_ENV === 'prod') {
    keycloak_base_url = 'http://keycloak:8080/';
    mongo_db_base_url = 'mongodb://mongo_db:27017/';
} else if (process.env.NODE_ENV === 'dev') {
    keycloak_base_url = 'http://localhost:8080/';
    mongo_db_base_url = 'mongodb://localhost:27017/';
}

module.exports = {keycloak_base_url, mongo_db_base_url};