var bookshelf = require('./bookshelf');
var DetailedHarEntry = require('./detailed_har_entry');

var HarLog = bookshelf.Model.extend({
    tableName: 'har_logs',
    har: function() {
        return this.hasOne(Har, 'log_id');
    },
    detailedHarEntries: function() {
        return this.hasMany(DetailedHarEntry);
    }
});


module.exports = HarLog