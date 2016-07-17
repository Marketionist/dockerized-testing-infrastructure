#!/bin/bash
gulp lint && xvfb-run --server-args='-screen 0 1280x1024x24' protractor ./tests/protractor.conf.js $@
