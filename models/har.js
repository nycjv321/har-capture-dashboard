var bookshelf = require('./bookshelf');

var HarLog = require('./har_log');
var Record = require('./record');

var Har = bookshelf.Model.extend({
  tableName: 'hars',
  harLog: function() {
    return this.belongsTo(HarLog, 'log_id');
  },
  record: function() {
    return this.hasOne(Record);
  }
});

module.exports = Har