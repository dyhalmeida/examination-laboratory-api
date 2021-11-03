FROM node:alpine

LABEL version="1.0" description="API developed in the WA Project company test exam" maintainer="Diego Almeida <dyhalmeida@gmail.com>"

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "start"]
