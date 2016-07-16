# dockerized-testing-infrastructure

[![Build Status](https://travis-ci.org/Marketionist/dockerized-testing-infrastructure.svg?branch=master)]
(https://travis-ci.org/Marketionist/dockerized-testing-infrastructure)
[![Sauce Test Status](https://saucelabs.com/browser-matrix/marketionist.svg)]
(https://saucelabs.com/u/marketionist)

Testing infrastructure with Docker image for local tests and Sauce Labs for
remote testing with different browser/OS combinations.

## Setup

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


## Running

Run tests in the container of the image: ``docker run --name=inttests -p 8000:80 test/tests``


## Cleaning up

1. To delete the container: ``docker rm inttests``

2. To delete up the image: ``docker rmi test/tests``
