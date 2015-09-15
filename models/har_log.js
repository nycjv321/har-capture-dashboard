var bookshelf = require('./bookshelf');
var DetailedHarEntry = require('./detailed_har_entry');

var HarLog = bookshelf.Model.extend({
    tableName: 'har_logs',
    detailedHarEntries: function() {
        return this.hasMany(DetailedHarEntry);
    }
});


module.exports = HarLog