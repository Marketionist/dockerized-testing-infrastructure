'use strict';
/* global describe, it, browser, expect, require */

// #############################################################################
// INTEGRATION TEST
var examplePage = require('../pages/page.example.js');
var cmsProtractorHelper = require('cms-protractor-helper');

describe('Example integration tests: ', function () {

    it('opens the site and validates the logo', function () {
        // go to the main page
        browser.get(examplePage.site);

        // wait for site logo to appear
        cmsProtractorHelper.waitFor(examplePage.githubLogo);

        // validate logo is displayed
        expect(examplePage.githubLogo.isDisplayed()).toBeTruthy();
    });

});
