var express = require('express');
var DetailedRecord = require("../models/detailed_record");
var DetailedHarEntry = require("../models/detailed_har_entry");

var URL = require('url');
var PerformanceTiming = require('../models/performance_timing');

var recordRouter = express.Router();
var performanceTimingRouter = express.Router({mergeParams: true});

recordRouter.use('/records/:recordId/performance_timings', performanceTimingRouter);

function detailedRecords(callback) {
    DetailedRecord.collection().fetch().then(function (detailed_records) {
        callback(detailed_records);
    })
}


recordRouter.route('/records').get(function (req, res) {
    detailedRecords(function (allrecords) {
        res.render('detailed_har_entries', {id: 1, records: allrecords.toJSON(), title: 'Express'});
    });
});


recordRouter.route('/records/:recordId').get(function (req, res) {
    detailedRecords(function (allrecords) {
        DetailedRecord.where({id: req.params.recordId}).fetch().then(function (detailed_records) {
            res.render('detailed_har_entries', {
                id: req.params.recordId,
                records: allrecords.toJSON(),
                title: 'Express'
            });
        });
    });

});

recordRouter.route('/records.json')
    .get(function (request, response) {
        DetailedRecord.collection().fetch().then(function (collection) {
            res.status(200);
            res.header("Content-Type", 'application/json');

            response.json(collection.toJSON());
        });
    });

recordRouter.route('/records/:recordId.json')
    .get(function (req, res) {
        res.status(200);
        res.header("Content-Type", 'application/json');
        DetailedRecord.where({id: req.params.recordId}).fetch().then(function (record) {
            res.send(record.toJSON());
        })
    });

recordRouter.route('/performance_timings.json')
    .get(function (req, res) {
        PerformanceTiming.collection().fetch().then(function (collection) {
            res.status(200);
            res.header("Content-Type", 'application/json');

            res.send(collection.toJSON());
        });
    });

Array.prototype.diff = function (a) {
    return this.filter(function (i) {
        return a.indexOf(i) < 0;
    });
};

recordRouter.route('/performance_timings/phases.json')
    .get(function (req, res) {
        res.status(200);
        res.header("Content-Type", 'application/json');

        performance_timings = {};

        performance_timings[0] = 'navigationstart';
        performance_timings[1] = 'redirectStart';
        performance_timings[2] = 'unloadend';
        performance_timings[3] = 'unloadend';
        performance_timings[4] = 'redirectend';
        performance_timings[5] = 'fetchstart';
        performance_timings[6] = 'domainlookupstart';
        performance_timings[7] = 'domainlookupend';
        performance_timings[8] = 'connectstart';
        performance_timings[9] = 'secureconnectionstart';
        performance_timings[10] = 'connectend';
        performance_timings[11] = 'requeststart';
        performance_timings[12] = 'responsestart';
        performance_timings[13] = 'unloadeventstart';
        performance_timings[14] = 'unloadeventend';
        performance_timings[15] = 'responseend';
        performance_timings[16] = 'domloading';
        performance_timings[17] = 'dominteractive';
        performance_timings[18] = 'domcontentloadedeventstart';
        performance_timings[19] = 'domcontentloadedeventend';
        performance_timings[20] = 'domcomplete';
        performance_timings[21] = 'loadeventstart';
        performance_timings[22] = 'loadeventend';

        res.send(JSON.stringify(performance_timings));

    });

recordRouter.route('/performance_timings/simple_phases.json')
    .get(function (req, res) {
        res.status(200);
        res.header("Content-Type", 'application/json');

        performance_timings = {};

        performance_timings[0] = 'navigationstart';
        performance_timings[1] = 'dominteractive';
        performance_timings[2] = 'domcontentloadedeventend';
        performance_timings[3] = 'domcomplete';
        performance_timings[4] = 'loadeventend';
        performance_timings[5] = 'afterloadeventend';

        res.send(JSON.stringify(performance_timings));

    });

recordRouter.route('/records/:recordId/detailed_har_entries.json')
    .get(function (req, res) {
        DetailedRecord.where({id: req.params.recordId}).fetch({withRelated: ['harLog.detailedHarEntries']}).then(function (detailedRecord) {
            detailedRecord.detailedHarEntries(function (detailedHarEntry) {
                res.status(200);
                res.header("Content-Type", 'application/json');
                res.send(detailedHarEntry);
            });
        });
    });

recordRouter.route('/records/:recordId/detailed_har_entries/:entry/content.json')
    .get(function (req, res) {
        DetailedHarEntry.where({id: req.params.entry}).fetch({withRelated: ['harEntry.harEntryResponse.content']}).then(function (entry) {
            entry.content(function (content) {
                res.status(200);
                res.header("Content-Type", 'application/json');
                res.send(content);
            });
        });
    });

recordRouter.route('/records/:recordId/performance_timings.json')
    .get(function (req, res) {
        res.status(200);
        res.header("Content-Type", 'application/json');
        DetailedRecord.where({id: req.params.recordId}).fetch({withRelated: ['performanceTiming']}).then(function (record) {
            res.send(record.related('performanceTiming').toJSON());
        });
    });

module.exports = recordRouter;
