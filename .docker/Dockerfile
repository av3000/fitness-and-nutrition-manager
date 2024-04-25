FROM node:18.13.0-alpine3.17

ENV DOCKER_ENV=true

WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN npm install

CMD ["npm", "start"]