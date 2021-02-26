- To run the game locally:

1. in outer most folder, run command "docker-compose -f docker-compose.dev.yml up"
2. locate to the frontend folder, run npm install, and then run npm start
3. locate to the backend folder, run npm install, then run npm start

The game is now accessible at localhost:3000

- To deploy the game:

1. Open the file docker-compose.yml in the root folder
2. In the configuration of keycloak container, adapt the environment variables KEYCLOAK_USER and KEYCLOAK_PASSWORD. The KEYCLOAK_USER and the KEYCLOAK_PASSWORD can be anything. They are the credentials you use to login to keycloak administration console.
3. Adapt the KEYCLOAK_FRONTEND_URL corresponding to the public url you are going to deploy the game. At the moment, the url is http://license-game.cf/keycloak. For example, if you are going to deploy the game to http://abc.com/oer-workshop, change the url to http://abc.com/oer-workshop/keycloak.
4. Locate to the frontend folder and open the file .env.production.local
5. Change the value of REACT_APP_KEYCLOAK_BASE_URL to the value of KEYCLOAK_FRONTEND_URL in step 3.
6. Change the value of REACT_APP_KEYCLOAK_BASE_URL. For example, if you are going to deploy the game to http://abc.com/oer-workshop, change the url to http://abc.com/oer-workshop/backend/.
6. Locate to the backend folder and open the Dockerfile.
7. Change the value of REACT_APP_KEYCLOAK_BASE_URL to the value of KEYCLOAK_FRONTEND_URL in step 3.
8. Locate to the root folder, run the command "docker-compose up" to start the game.
9. After a few minutes, when all the containers are ready, access the keycloak administration console at  http://<KEYCLOAK_FRONTEND_URL>/auth/admin/ and login with the chosen username.
10. On the left hand side, open the "Clients" tab.
11. In the "Clients" tab, open the "react" client.
12. In the Settings tab, look for the "Valid Redirect URIs"
13. Add the address of the game to this. For example, if the game is accessible at "http://abc.com/oer-workshop", add "http://abc.com/oer-workshop/*" to this field.
14. In the same tab, look for the Web Origins field, add the address of the game to this field. For example, if the game is accessible at "http://abc.com/oer-workshop", add "http://abc.com/oer-workshop" to this field.
15. Click on "save" button at the end
16. The game is now accessible at your chosen address.

If the keycloak container exits with error message similar to "user ... is already exist", delete the container and run the command docker-compose up again.