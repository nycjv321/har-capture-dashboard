var bookshelf = require('./bookshelf');

var PerformanceTiming = bookshelf.Model.extend({
    tableName: 'performance_timings'
});

module.exports = PerformanceTiming