var bookshelf = require('./bookshelf');

var HarLog = require('./har_log');
var PerformanceTiming = require('./performance_timing');


var DetailedRecord = bookshelf.Model.extend({
    tableName: 'detailed_records',
    harLog: function () {
        return this.belongsTo(HarLog);
    },
    performanceTiming: function () {
        return this.belongsTo(PerformanceTiming, 'performance_timing_id');
    }
});

DetailedRecord.prototype.detailedHarEntries = function (callback) {
    this.related('harLog').load(['detailedHarEntries']).then(function (harLog) {
        return callback(harLog.related('detailedHarEntries'));
    })
}

var RecordDescription = bookshelf.Model.extend({
    tableName: 'record_descriptions',
    performanceTiming: function () {
        return this.hasOne(DetailedRecord, 'description_id');
    }
});
bookshelf.plugin('registry');

module.exports = bookshelf.model('DetailedRecord', DetailedRecord)