var express = require('express');
var router = express.Router();
var host = require("../models/record");

router.route('/records')
    .get(function(request, response) {
        host.collection().fetch(
            {
                columns: [
                    'id', 'description_id', 'har_id', 'page_classification_id', 'performance_timing_id', 'url_id'
                ]
            }
        ).then(function(collection) {
            response.json(collection.toJSON());
        });
    });
module.exports = router;
