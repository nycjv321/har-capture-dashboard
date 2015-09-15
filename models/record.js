var bookshelf = require('./bookshelf');

var Har               = require('./har');
var PerformanceTiming = require('./performance_timing');

var Record = bookshelf.Model.extend({
    tableName: 'records',
    har: function() {
       return this.belongsTo(Har);
    },
    performanceTiming: function() {
       return this.belongsTo(PerformanceTiming, 'performance_timing_id');
    }
});

Record.prototype.detailedHarEntries = function(callback) {
    this.related('har').load(['harLog', 'harLog.detailedHarEntries']).then(function (har) {
        return callback(har.related('harLog').related('detailedHarEntries').first());
    })
}

module.exports = Record