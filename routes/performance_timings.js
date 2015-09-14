var express = require('express');
var router = express.Router();
var uniform_resource_locator = require("../models/performance_timing");

router.route('/performance_timings.json')
    .get(function(request, response) {
        uniform_resource_locator.collection().fetch({columns: [
            'id', 'connectend', 'connectstart', 'domcomplete', 'domcontentloadedeventend',
            'domcontentloadedeventstart' , 'dominteractive', 'domloading', 'domainlookupend',
            'domainlookupstart', 'fetchstart', 'loadeventend', 'loadeventstart',
            'navigationstart', 'redirectend', 'redirectstart', 'requeststart',
            'responseend', 'responsestart', 'secureconnectionstart', 'unloadeventend'  ,
            'unloadeventstart'
        ]}).then(function(collection) {
 response.json(collection.toJSON());
        });
    });
module.exports = router;
