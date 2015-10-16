FROM ubuntu
RUN apt-get -y update && apt-get -y install git nodejs npm openjdk-7-jdk
# For Ubuntu it is `nodejs`, but everything else calls it `node`
RUN ln -s /usr/bin/nodejs /usr/bin/node

ADD . /app
WORKDIR /app

RUN npm install -g npm@2
RUN npm install -g gulp
RUN npm install
RUN node --version
RUN node node_modules/protractor/bin/webdriver-manager update

EXPOSE 80

CMD gulp tests:unit && gulp tests:lint && gulp tests:integration
