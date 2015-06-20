'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('Protractor Demo App', function() {
    it('should have a title', function() {
        browser.driver.get('http://juliemr.github.io/protractor-demo/');

        expect(browser.driver.getTitle()).to.eventually.equal('Super Calculator');
    });
});