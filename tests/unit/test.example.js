'use strict';
/* global describe, it, expect, beforeEach, afterEach, fixture */

// #############################################################################
// UNIT TEST
describe('Example project js unit tests:', function () {
    beforeEach(function () {
        fixture.setBase('tests/fixtures');
        this.markup = fixture.load('example.html');
        this.preventEvent = { preventDefault: function () {} };
    });

    afterEach(function () {
        fixture.cleanup();
    });

    it('runs dummy test', function () {
        expect('Test dummy text').toEqual('Test dummy text');
        return console.log('Tested dummy text successfully');
    });

});
