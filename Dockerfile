# base imagenya ubuntu
FROM node:18.16.0-alpine

# command line dari ubuntu
RUN apk update && apk add curl

WORKDIR /app

COPY  . .

# install nodejs dependency
RUN npm install

EXPOSE 3000

ENTRYPOINT [ "node", "index.js" ]