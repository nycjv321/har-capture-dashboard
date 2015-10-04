var DetailedHarEntry = require("../models/detailed_har_entry");

var chai = require('chai');
var expect = chai.expect;
describe('DetailedHarEntry', function () {
    this.timeout(500);
    describe('#content()', function (done) {
        it('Should return the record\'s contents', function (done) {
            DetailedHarEntry.collection().fetch({withRelated: ['harEntry.harEntryResponse.content']}).then(function (entries) {
                entries.first().content(function (content) {
                    expect(Object.keys(content)).to.not.be.empty;
                    done();
                });
            });
        });
    })
    describe('#timing()', function (done) {
        it('Should return the record\'s timing information', function (done) {
            DetailedHarEntry.collection().fetch({withRelated: ['harEntry.timings']}).then(function (entries) {
                var entry = entries.first();
                var timing = entry.related('harEntry').related('timings');
                expect(Object.keys(timing.toJSON())).to.not.be.empty;
                done();
            });
        });
    })
});