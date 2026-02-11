FROM node:25-alpine


# Install bash for debugging
RUN apk update && apk add bash

RUN npm i -g @nestjs/cli

WORKDIR /nestjs

RUN nest new project-name --package-manager npm

WORKDIR /nestjs/project-name

CMD [ "npm", "run", "start" ]