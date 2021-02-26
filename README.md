- To run the game locally:

1. in outer most folder, run command "docker-compose -f docker-compose.dev.yml up"
2. locate to the frontend folder, run npm install, and then run npm start
3. locate to the backend folder, run npm install, then run npm start

The game is now accessible at localhost:3000

- There are three main stages of the deployment:

A. Adapt environment variables:

1. Open the file docker-compose.yml in the root folder.
2. Change the environment variables KEYCLOAK_USER and KEYCLOAK_PASSWORD of service "keycloak". The KEYCLOAK_USER and the KEYCLOAK_PASSWORD can be anything. They are the credentials you use to login to keycloak administration console.
3. Adapt the KEYCLOAK_FRONTEND_URL of service "keycloak" corresponding to the public url you are going to deploy the game. For example, if you are going to deploy the game to http://abc.com/oer-workshop, change the url to http://abc.com/oer-workshop/keycloak (Important: no slash at the end of the url!).
4. Navigate to the frontend folder and open the file .env.production.local
5. Change the value of REACT_APP_KEYCLOAK_BASE_URL to the value of KEYCLOAK_FRONTEND_URL in step 3.
6. Change the value of REACT_APP_KEYCLOAK_BASE_URL. For example, if you are going to deploy the game to http://abc.com/oer-workshop, change the url to http://abc.com/oer-workshop/backend/ (Important: there must be a slash at the end of the url!).
6. Navigate to the backend folder and open the Dockerfile.
7. Change the value of REACT_APP_KEYCLOAK_BASE_URL to the value of KEYCLOAK_FRONTEND_URL in step 3.

B. Start the application:

1. Locate to the root folder, run the command "docker-compose up" to start the game.
2. After a few minutes, when all the containers are ready, access the keycloak administration console at  http://<KEYCLOAK_FRONTEND_URL>/auth/admin/ and login with the chosen username.

C. Configure Keycloak:

1. On the left hand side, open the "Clients" tab.
2. In the table on the right hand side, in the column ClientID, click on "react"  to open the setting page for the "react" client.
3. In the Settings tab, look for the "Valid Redirect URIs"
4. Add the address of the game to this field. For example, if the url of the game is "http://abc.com/oer-workshop", add "http://abc.com/oer-workshop/*" to this field.
5. In the same tab, look for the Web Origins field, add the address of the game to this field. For example, if the url of the game is "http://abc.com/oer-workshop", add "http://abc.com/oer-workshop" to this field (Important, no slash at the end of the URL).
6. Click on "save" button at the end
7. The game is now accessible at your chosen address.

If the keycloak container exits with error message similar to "user ... is already exist", delete the container and run the command docker-compose up again.