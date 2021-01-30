let keycloak_base_url = 'http://localhost:8080/auth';
let mongo_db_base_url = 'mongodb://localhost:27017/';

if (process.env.KEYCLOAK_BASE_URL) {
    keycloak_base_url = process.env.KEYCLOAK_BASE_URL
}

if (process.env.MONGO_DB_BASE_URL) {
    mongo_db_base_url = process.env.MONGO_DB_BASE_URL
}
module.exports = {keycloak_base_url, mongo_db_base_url};