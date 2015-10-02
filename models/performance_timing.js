var bookshelf = require('./bookshelf');

var Record = require('./detailed_record');

var PerformanceTiming = bookshelf.Model.extend({
    tableName: 'performance_timings',
    record: function() {
        return this.hasOne(Record, 'performance_timing_id');
    }
});
bookshelf.plugin('registry');
module.exports = bookshelf.model('PerformanceTiming', PerformanceTiming)