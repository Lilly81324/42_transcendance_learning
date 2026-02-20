FROM nginx:stable-alpine


# Enviroment Variables for Ports
ARG NGINX_PORT NEXTJS_PORT

# For debugging
RUN apk add bash curl

WORKDIR /nginx

# Static files for testing purposes
COPY ./src /nginx

# Set new config
RUN rm -f /etc/nginx/nginx.conf
COPY ./template_nginx.conf /etc/nginx/template_nginx.conf
RUN envsubst '$NGINX_PORT $NEXTJS_PORT' < /etc/nginx/template_nginx.conf > /etc/nginx/nginx.conf

# Run nginx as main process
CMD ["nginx", "-g", "daemon off;"]