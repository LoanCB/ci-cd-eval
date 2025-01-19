FROM node:23
WORKDIR /app

COPY package*.json /app/
COPY eslint.config.js /app/
COPY jest.config.js /app/
COPY tsconfig.json /app/

RUN npm clean-install
COPY ./src /app/src/