# Compile NextJs files into html
FROM node:25-alpine AS builder

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY . .

RUN npm run build


# Discard old files, but copy the compiled html files into nginx directory
FROM nginx:stable-alpine

# Copy generated html files
RUN mkdir /nextjs
COPY --from=builder /app/build /nextjs

# Set new nginx config
RUN rm -f /etc/nginx/nginx.conf
COPY ./template_nginx.conf /etc/nginx/template_nginx.conf
ARG NEXTJS_PORT
ENV NEXTJS_PORT=${NEXTJS_PORT}
RUN envsubst '$NEXTJS_PORT' < /etc/nginx/template_nginx.conf > /etc/nginx/nginx.conf

# Run nginx as main process
CMD ["nginx", "-g", "daemon off;"]