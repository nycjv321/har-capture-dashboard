var HarLog = require("../models/har_log");
var DetailedHarEntry = require("../models/detailed_har_entry");

var chai = require('chai');
var expect = chai.expect;

describe('HarLog', function() {
  this.timeout(100);
  describe('#detailedHarEntries()', function() {
    it('Should return a collection of detailed har entries', function(done) {
      HarLog.where({id: 1}).fetch({withRelated: ['detailedHarEntries']}).then(function(entries) {
        expect(
            entries.related('detailedHarEntries')
        ).to.not.be.empty;

        detailedHarEntry = entries.related('detailedHarEntries').first();

        expect(
            detailedHarEntry.keys()
        ).to.not.be.empty;

        done();
      });
    });
  });
});
