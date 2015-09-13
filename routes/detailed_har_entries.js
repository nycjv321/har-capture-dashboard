var express = require('express');
var router = express.Router();
var detailed_har_entry = require("../models/detailed_har_entry");

router.route('/detailed_har_entries')
  .get(function(request, response) {
    detailed_har_entry.collection().fetch(
      {
        columns: 
          [
           'id', 'har_log_id', 'url_id', 'start_date_time', 'time', 'address', 'bodysize', 'headerssize', 'status', 'URL', 'Source'
          ]
      }
    ).then(
      function(collection) {
        response.json(collection.toJSON());
      }
    );
  });
module.exports = router;
