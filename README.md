# dockerized-testing-infrastructure

[![Build Status](https://travis-ci.org/Marketionist/dockerized-testing-infrastructure.svg?branch=master)]
(https://travis-ci.org/Marketionist/dockerized-testing-infrastructure)
[![Sauce Test Status](https://saucelabs.com/browser-matrix/marketionist.svg)]
(https://saucelabs.com/u/marketionist)

Testing infrastructure with Docker image for local tests and Sauce Labs for
remote testing with different browser/OS combinations.

## Setup with Docker

You need [Docker Toolbox](https://www.docker.com/toolbox "Docker Toolbox") installed as locally
the tests should be run in the container inside Docker image. Also make sure you
have [node.js, npm](https://nodejs.org/en/ "node.js, npm") and
[gulp](http://gulpjs.com/ "gulp") installed.

To run the tests on your local machine follow the next steps:

1. Clone this repository: ``git clone https://github.com/Marketionist/dockerized-testing-infrastructure.git``

2. Launch your Docker machine: ``docker-machine start default && eval "$(docker-machine env docker-vm)"``

3. Go to repository folder: ``cd dockerized-testing-infrastructure``

4. Build docker image: ``docker build --no-cache -t test/tests .``

5. See that the image was built: ``docker images -a | sort | uniq``


## Running locally with Docker

Run tests in the container of the image: ``docker run -it --rm --name=inttests -p 8000:80 test/tests``
You can also use additional options for protractor - for example selecting
specific suite: ``docker run -it --rm --name=inttests -p 8000:80 test/tests --suite example``


## Setup without Docker

If you want to run tests without Docker make sure you have
[node.js, npm](https://nodejs.org/en/ "node.js, npm"),
[protractor](https://www.npmjs.com/package/protractor "protractor") and
[gulp](https://www.npmjs.com/package/gulp "gulp") installed globally.

To run the tests without Docker on your local machine follow the next steps:

1. Clone this repository: ``git clone https://github.com/Marketionist/dockerized-testing-infrastructure.git``

2. Download and install [node.js, npm](https://nodejs.org/en/ "node.js, npm")

3. Install protractor and gulp globally: ``npm install -g protractor gulp``

4. Go to repository folder: ``cd dockerized-testing-infrastructure``

5. Install all required npm packages: ``npm install``


## Running locally without Docker

Run linting, update webdriver, run tests:
``gulp lint && webdriver-manager update && protractor ./tests/protractor.conf.js``

You can also use additional options for protractor - for example selecting specific suite:
``gulp lint && webdriver-manager update && protractor ./tests/protractor.conf.js --suite example``


## Cleaning up

1. To delete the container: ``docker rm inttests``

2. To stop all containers: ``docker stop $(docker ps -a -q)``

3. To delete all containers: ``docker rm `docker ps -qa``` or ``docker rm $(docker ps -a -q)``

4. To delete the image: ``docker rmi test/tests``

5. To delete all images: ``docker rmi $(docker images -q)``
