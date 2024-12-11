FROM node:23-alpine3.19

WORKDIR /app

COPY package*.json ./

COPY ./src ./ 

RUN npm install

EXPOSE 3000

CMD npm run dev