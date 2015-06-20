FROM node:latest

COPY ./ ./src/ui

RUN ln -s /src/ui/package.json /src/package.json
RUN ln -s /src/ui/bower.json /src/bower.json
RUN ln -s /src/ui/.bowerrc /src/.bowerrc
RUN ln -s /src/ui/Gruntfile.js /src/Gruntfile.js

WORKDIR /src/

RUN npm install
