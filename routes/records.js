var express = require('express');
var Record = require("../models/record");

var URL = require('url');
var PerformanceTiming = require('../models/performance_timing');

var recordRouter = express.Router();
var performanceTimingRouter = express.Router({mergeParams: true});

recordRouter.use('/records/:recordId/performance_timings', performanceTimingRouter);

recordRouter.route('/records').get(function(req, res) {
        res.render('detailed_har_entries', { title: 'Express' });
    });

recordRouter.route('/records.json')
    .get(function(request, response) {
        console.log(URL.parse(request.url));
        Record.collection().fetch(
            {
                columns: [
                    'id', 'description_id', 'har_id', 'page_classification_id', 'performance_timing_id', 'url_id'
                ]
            }
        ).then(function(collection) {
            response.json(collection.toJSON());
        });
    });

recordRouter.route('/records/:recordId.json')
    .get(function (req, res) {
        res.status(200);
        Record.where({id: req.params.recordId}).fetch().then(function(record) {
            res.send(record.toJSON());
        })
});

recordRouter.route('/performance_timings.json')
    .get(function (req, res) {
        res.status(200);
        PerformanceTiming.collection().fetch().then(function(collection) {
            res.send(collection.toJSON());
        });
    });

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

recordRouter.route('/performance_timings/phases.json')
    .get(function (req, res) {
        res.status(200);
            PerformanceTiming.where({id: 1}).fetch().then(function(performanceTiming) {
               res.send(performanceTiming.keys().diff(['id', 'created', 'modified']));
            });
    });

recordRouter.route('/records/:recordId/detailed_har_entries.json')
    .get(function (req, res) {
        res.status(200);
        Record.where({id: req.params.recordId}).fetch({withRelated: ['har']}).then(function(record) {
           record.detailedHarEntries(function(detailedHarEntries) {
               res.send(detailedHarEntries.toJSON());
           })
        });
    });

recordRouter.route('/performance_timings/:performanceTimingId.json')
    .get(function (req, res) {
        res.status(200);
        PerformanceTiming.where({id: req.params.performanceTimingId}).fetch().then(function(performanceTiming) {
            res.send(performanceTiming.toJSON());
        });
    });



performanceTimingRouter.route('/:performanceTimingId.json')
    .get(function (req, res) {
        res.status(200);
        Record.collection().fetch({withRelated: ['performanceTiming']}).then(function(collection) {
            res.send(collection.first().related('performanceTiming').toJSON());
        });
    });

module.exports = recordRouter;
