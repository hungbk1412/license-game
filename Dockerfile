FROM docker:20.10.2-dind
WORKDIR /app
COPY . .
RUN apk update
RUN apk add docker-compose
CMD ["docker-compose", "up"]
