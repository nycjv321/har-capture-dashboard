var bookshelf = require('./bookshelf');
var HarLog = require('./har_log');

var DetailedHarEntry = bookshelf.Model.extend({
    tableName: 'detailed_har_entries',
    harLog: function() {
        return this.belongsTo(HarLog, 'har_log_id');
    }
});


module.exports = DetailedHarEntry