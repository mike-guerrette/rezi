FROM node:latest

COPY ./ ./src/api

RUN ln -s /src/api/package.json /src/package.json
RUN ln -s /src/api/bower.json /src/bower.json
RUN ln -s /src/api/Gruntfile.js /src/Gruntfile.js

WORKDIR /src/

RUN npm install