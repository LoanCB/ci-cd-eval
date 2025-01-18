FROM node:23
WORKDIR /app

COPY package*.json /app/
COPY eslint.config.js /app/

RUN npm clean-install
COPY ./src/* /app/