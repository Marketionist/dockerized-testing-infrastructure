
FROM node:slim
MAINTAINER marketionist@gmail.com
WORKDIR /tmp

# Set up npm features
RUN npm completion >>.bashrc
RUN echo "alias npm-exec='PATH=$(npm bin):$PATH'" >>.bashrc

# Install n, and use it to install latest node
RUN npm install n --global
ENV NODE_VERSION 4.2.3
RUN n $NODE_VERSION

RUN npm install -g protractor gulp && \
    webdriver-manager clean && \
    webdriver-manager update && \
    apt-get update && apt-get install -y xvfb wget openjdk-7-jre git && \
    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    dpkg --unpack google-chrome-stable_current_amd64.deb && \
    apt-get install -f -y && \
    apt-get clean && \
    rm google-chrome-stable_current_amd64.deb && \
    google-chrome --version

ADD . /app
ADD protractor.sh /protractor.sh
# Fix for the issue with Selenium, as described here:
# https://github.com/SeleniumHQ/docker-selenium/issues/87
ENV DBUS_SESSION_BUS_ADDRESS=/dev/null
WORKDIR /app

# Install all npm packages from package.json
RUN npm install
RUN node --version

# Set default image container command to launch linting, xvfb, integration tests
ENTRYPOINT ["/protractor.sh"]
