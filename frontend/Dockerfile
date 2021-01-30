FROM node:11.15.0-alpine
WORKDIR /app
COPY ./build ./build
ENV REACT_APP_KEYCLOAK_BASE_URL "http://license-game.cf/keycloak"
ENV REACT_APP_BACKEND_BASE_URL_API "http://license-game.cf/backend"
RUN npm install -g serve
CMD ["serve", "-s", "build"]