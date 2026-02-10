FROM debian:bookworm-20260202

RUN apt update && apt upgrade

# Upd
# Install Curl to install NVM
RUN apt-get install -y curl

# Install NVM to install NPM
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
RUN export NVM_DIR="$HOME/.nvm"
RUN [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
RUN [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Install
RUN nvm install node

RUN apt install libatomic1

RUN npm i -g @nestjs/cli

WORKDIR /home

RUN nest new project-name

CMD sleep infinity