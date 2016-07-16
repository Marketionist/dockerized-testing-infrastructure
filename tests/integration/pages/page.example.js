'use strict';
/* global by, element, module */

// #############################################################################
// INTEGRATION TEST PAGE OBJECT

var examplePage = {
    site: 'https://github.com/',
    githubLogo: element(by.css('.header-logo-invertocat'))
};

module.exports = examplePage;
