var bookshelf = require('./bookshelf');

var HarLog = require('./har_log');
var Record = require('./detailed_record');

var Har = bookshelf.Model.extend({
  tableName: 'hars',
  harLog: function() {
    return this.belongsTo(HarLog, 'log_id');
  }
});

module.exports = Har