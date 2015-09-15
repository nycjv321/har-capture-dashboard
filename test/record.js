var Record            = require("../models/record");
var PerformanceTiming            = require("../models/performance_timing");

var chai = require('chai');
var expect = chai.expect;

describe('Record', function() {
  this.timeout(100);
  describe('#detailedHarEntries()', function(done) {
    it('Should return a collection of detailed har entries', function(done) {
      Record.collection().fetch({withRelated: ['har']}).then(function(collection) {
        collection.first().detailedHarEntries(function (detailedHarEntry) {
          expect(
              detailedHarEntry.keys()
          ).to.not.be.empty
          done();
        });
      });
    });
  });
  describe('#performanceTiming()', function(done) {
    it('Should return the records performance timing information', function(done) {
      Record.collection().fetch({withRelated: ['performanceTiming']}).then(function(collection) {
        expect(collection.first().related('performanceTiming').keys()).to.not.be.empty
        done();
      });
    });
  });
});