var bookshelf = require('./bookshelf');

var Record = require('./record');

PerformanceTiming = bookshelf.Model.extend({
    tableName: 'performance_timings',
    record: function() {
        return this.hasOne(Record, 'performance_timing_id');
    }
});

module.exports = PerformanceTiming