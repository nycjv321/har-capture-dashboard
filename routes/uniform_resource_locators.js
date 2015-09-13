var express = require('express');
var router = express.Router();
var uniform_resource_locator = require("../models/uniform_resource_locator");

router.route('/uniform_resource_locators')
    .get(function(request, response) {
        uniform_resource_locator.collection().fetch({columns: ['id', 'host', 'path',' port', 'protocol', 'query']}).then(function(collection) {
            response.json(collection.toJSON());
        });
    });
module.exports = router;
