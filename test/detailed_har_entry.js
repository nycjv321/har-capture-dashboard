var DetailedHarEntry = require("../models/detailed_har_entry");

var chai = require('chai');
var expect = chai.expect;
describe('DetailedHarEntry', function () {
    this.timeout(500);
    describe('#content()', function (done) {
        it('Should return the record\'s contents', function (done) {
            DetailedHarEntry.collection().fetch({withRelated: ['harEntry.harEntryResponse.content']}).then(function (records) {
                records.first().content(function (content) {
                    expect(Object.keys(content)).to.not.be.empty;
                    done();
                });
            });
        });
    })
});