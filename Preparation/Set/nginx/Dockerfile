FROM nginx:stable-alpine

WORKDIR /nginx

# Static files for testing purposes
COPY ./src /nginx

# Set new config
RUN rm -f /etc/nginx/nginx.conf
COPY ./template_nginx.conf /etc/nginx/template_nginx.conf
ARG NGINX_PORT
ARG NEXTJS_PORT
ENV NGINX_PORT=${NGINX_PORT}
ENV NEXTJS_PORT=${NEXTJS_PORT}
RUN envsubst '$NGINX_PORT $NEXTJS_PORT' < /etc/nginx/template_nginx.conf > /etc/nginx/nginx.conf

# Install bash for debugging
# RUN apk update && apk add bash

# Run nginx as main process
CMD ["nginx", "-g", "daemon off;"]