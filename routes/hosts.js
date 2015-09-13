var express = require('express');
var router = express.Router();
var host = require("../models/host");

router.route('/hosts')
    .get(function(request, response) {
        host.collection().fetch().then(function(collection) {
            response.json(collection.toJSON());
        });
    });
module.exports = router;
