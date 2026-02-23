# Compile NextJs files into html
FROM node:25-alpine AS builder

# Store port as enviroment variable
ARG NEXTJS_PORT NESTJS_PORT NGINX_PORT
ENV NEXTJS_PORT=${NEXTJS_PORT}
ENV NGINX_PORT=${NGINX_PORT}

# For debugging
RUN apk add bash curl

WORKDIR /nextjs

# For envsubst
RUN apk add gettext

RUN npx create-next-app@latest bff  --typescript --eslint --tailwind --app --src-dir --yes

WORKDIR /nextjs/bff

COPY ./src/template.next.config.js ./template.next.config.js
RUN envsubst '$NESTJS_PORT' < /nextjs/bff/template.next.config.js > /nextjs/bff/next.config.js

COPY ./src/template.page.tsx ./src/app/template.page.tsx
RUN envsubst '$NGINX_PORT' < /nextjs/bff/src/app/template.page.tsx > /nextjs/bff/src/app/page.tsx

# Just for debugging
RUN apk add bash


CMD npm run dev -- -p ${NEXTJS_PORT}
