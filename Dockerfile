FROM node:alpine AS etapaUno

WORKDIR /app

COPY package.json ./

RUN npm install




FROM node:alpine

WORKDIR /app

COPY --from=etapaUno /app/node_modules /app/node_modules

COPY . .

cmd ["npm", "start"]
