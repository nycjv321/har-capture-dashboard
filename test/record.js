var Record = require("../models/record");

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
          ).to.eql(
              ['id','har_log_id','url_id','start_date_time','time','address','bodysize','headerssize','status','URL','Host','Source']
          );
          done();
        });
      });
    });
  });
});