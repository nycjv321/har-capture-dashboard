var HarLog = require("../models/har_log");

var chai = require('chai');
var expect = chai.expect;

describe('HarLog', function(done) {
  this.timeout(100);
  describe('#detailedHarEntries()', function(done) {
    it('Should return a collection of detailed har entries', function(done) {
      HarLog.where({id: 1}).fetch({withRelated: ['detailedHarEntries']}).then(function(entries) {
        var detailed_har_entries = entries.related('detailedHarEntries');
          expect(
            Object.keys(detailed_har_entries)
        ).to.not.be.empty;

        detailedHarEntry = detailed_har_entries.first();

        expect(
            detailedHarEntry.keys()
        ).to.not.be.empty;

        done();
      });
    });
  });
});
