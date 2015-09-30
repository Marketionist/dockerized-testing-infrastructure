/*!
 * @author:    Divio AG
 * @copyright: http://www.divio.ch
 */

'use strict';
/* global describe, it, expect, beforeEach, afterEach, fixture */

// #############################################################################
// UNIT TEST
describe('cl.newsblog.js:', function () {
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
