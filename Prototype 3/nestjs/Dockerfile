FROM node:25-alpine

# Enviroment Variables for Ports
ARG NESTJS_PORT NGINX_PORT

# For debugging
RUN apk add bash curl

RUN npm i -g @nestjs/cli

WORKDIR /nestjs

RUN npm i --save @nestjs/websockets @nestjs/platform-socket.io

RUN nest new transcendence_test --package-manager npm

WORKDIR /nestjs/transcendence_test

RUN rm -rf ./src

COPY ./src/nest ./src

RUN mkdir /game

COPY ./src/game /game

# For envsubst
RUN apk add gettext

# Store port as enviroment variable
RUN envsubst '$NESTJS_PORT' < /nestjs/transcendence_test/src/template.main.ts > /nestjs/transcendence_test/src/main.ts
RUN rm /nestjs/transcendence_test/src/template.main.ts

# Store port as enviroment variable
RUN envsubst '$NGINX_PORT' < /game/template.main.js > /game/main.js
RUN rm /game/template.main.js

CMD npm run start