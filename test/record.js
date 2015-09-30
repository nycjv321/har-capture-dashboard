var DetailedRecord            = require("../models/detailed_record");

var chai = require('chai');
var expect = chai.expect;

describe('DetailedRecord', function (done) {
  this.timeout(100);
  describe('#harLog()', function(done) {
    it('Should return the record\'s Har Log', function(done) {
      DetailedRecord.collection().fetch({withRelated: ['harLog']}).then(function(collection) {
        expect(collection.first().related('harLog').keys()).to.not.be.empty
        done();
      });
    });
  });
  describe('#detailedHarEntries()', function(done) {
    it('Should return a collection of detailed har entries', function(done) {
      DetailedRecord.collection().fetch({withRelated: ['harLog.detailedHarEntries']}).then(function(collection) {
        collection.first().detailedHarEntries(function (detailedHarEntry) {
          expect(detailedHarEntry.first().keys()).to.not.be.empty
          done();
        });
      });
    });
  });
  describe('#performanceTiming()', function(done) {
    it('Should return the record\'s performance timing information', function(done) {
      DetailedRecord.collection().fetch({withRelated: ['performanceTiming']}).then(function(collection) {
        expect(collection.first().related('performanceTiming').keys()).to.not.be.empty
        done();
      });
    });
  });
  describe('#description()', function(done) {
    it('Should return the record\'s descriptions', function(done) {
      DetailedRecord.collection().fetch().then(function(collection) {
        expect(collection.first().get('description')).to.not.be.empty
        done();
      });
    });
  });

});