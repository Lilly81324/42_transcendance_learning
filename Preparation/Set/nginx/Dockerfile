FROM debian:bookworm-20251117-slim

# Update packages
RUN apt-get update

# Install Prerequisites
RUN apt --yes install curl gnupg2 ca-certificates lsb-release debian-archive-keyring

# Create signing key for NGINX
RUN curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor | tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null

# Add NGINX to package list
RUN echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] http://nginx.org/packages/debian `lsb_release -cs` nginx" | tee /etc/apt/sources.list.d/nginx.list

# Update again
RUN apt update

# Install NGINX
RUN apt --yes install nginx

WORKDIR /nginx

COPY ./src /nginx

# Delte old nginx config
RUN rm -f /etc/nginx/nginx.conf

# Copy NGINX Config into Docker
COPY ./nginx.conf /etc/nginx/nginx.conf

# Open port for binding to Host Machine
EXPOSE 443

# Run nginx as main process, so the Docker doesnt stop
CMD ["nginx", "-g", "daemon off;"]