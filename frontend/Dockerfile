FROM node:11.15.0-alpine
WORKDIR /app
COPY ./frontend .
ENV REACT_APP_KEYCLOAK_BASE_URL ${REACT_APP_KEYCLOAK_BASE_URL}
ENV REACT_APP_BACKEND_BASE_URL_API ${REACT_APP_BACKEND_BASE_URL_API}
RUN npm install
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "build"]