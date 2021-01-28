FROM node:14.15.4-alpine
WORKDIR /app
ENV REACT_APP_BASE_URL_API=http://backend:5000/api/v1
COPY . .
RUN npm install
CMD ["npm", "start"]