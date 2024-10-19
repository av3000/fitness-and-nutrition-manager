FROM node:18.13.0-alpine3.17

ENV DOCKER_ENV=true

WORKDIR /usr/src/app

COPY package*.json package-lock.json /usr/src/app/

RUN npm install

COPY . .

CMD ["npm", "start"]