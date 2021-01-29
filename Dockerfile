FROM docker:19.03-dind
WORKDIR /app
COPY . .
RUN apk update
RUN apk add docker-compose
RUN apk add --update npm
RUN npm install -g serve
RUN npm install --prefix ./backend
RUN npm install --prefix ./frontend
RUN npm run build --prefix ./frontend
CMD ["npm", "start"]
