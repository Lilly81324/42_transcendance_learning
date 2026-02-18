FROM node:25-alpine

# Enviroment Variables for Ports
ARG NESTJS_PORT

# For debugging
RUN apk add bash curl

RUN npm i -g @nestjs/cli

WORKDIR /nestjs

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

CMD npm run start