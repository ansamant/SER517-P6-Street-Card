FROM ubuntu:18.04
RUN apt-get update \
  && apt-get install -y vim \
  && apt-get install -y nodejs \
  && apt-get install -y npm 
WORKDIR /src/frontend
COPY package.json /src/frontend
RUN npm install -g npm@latest
RUN npm i --package-lock-only
RUN npm install
COPY . /src/frontend
EXPOSE 3000
CMD ["npm", "start"]
