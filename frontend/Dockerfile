FROM node:11.15.0-alpine
WORKDIR /app
COPY ./build ./build
RUN npm install -g serve
CMD ["serve", "-s", "build"]