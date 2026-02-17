FROM node:25-alpine


# Install bash for debugging
RUN apk update && apk add bash

RUN npm i -g @nestjs/cli

WORKDIR /nestjs

RUN nest new transcendence_test --package-manager npm

WORKDIR /nestjs/transcendence_test

RUN rm -rf ./src

COPY ./src/nest ./src

RUN mkdir /game

COPY ./src/game /game


# Store port as enviroment variable
ARG NESTJS_PORT
ENV NESTJS_PORT=${NESTJS_PORT}

CMD npm run start -- -p ${NESTJS_PORT}