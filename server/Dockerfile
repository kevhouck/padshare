FROM  ubuntu:xenial

# Install Node.js
RUN   apt-get update
RUN   apt-get install -y wget xz-utils python build-essential
RUN   mkdir node
WORKDIR /node
RUN   wget https://nodejs.org/dist/v8.9.2/node-v8.9.2-linux-x64.tar.xz
RUN   tar xf node-v8.9.2-linux-x64.tar.xz
ENV   PATH=/node/node-v8.9.2-linux-x64/bin:$PATH
RUN   mkdir -p /node/.npm-global
ENV   PATH=/node/.npm-global/bin:$PATH
ENV   NPM_CONFIG_PREFIX=/node/.npm-global

# Create app directory
RUN   mkdir -p /usr/src/app
WORKDIR	/usr/src/app

# Install app
RUN   npm install -g gulp gulp-babel babel-core gulp-watch
COPY  . .
RUN   npm install

# Bundle app source
RUN   gulp build

# Configure network
EXPOSE  3000

# Start app
CMD   ["npm", "start"]
