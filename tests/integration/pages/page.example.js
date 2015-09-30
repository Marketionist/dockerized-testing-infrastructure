'use strict';
/* global by, element */

// #############################################################################
// INTEGRATION TEST PAGE OBJECT

var examplePage = {
    site: 'https://github.com/',
    githubLogo: element(by.css('.octicon-logo-github'))
};

module.exports = examplePage;
