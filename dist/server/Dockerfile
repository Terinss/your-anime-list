FROM node:current-alpine3.16

WORKDIR /app/

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .

CMD ["node", "server.js"]