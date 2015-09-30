var knex = require('knex')({
    client: 'postgres',
    connection: {
        host     : '127.0.0.1',
        user     : 'postgres',
        password : '',
        database: 'har_capture_dashboard_test',
        charset  : 'utf8'
    }
});


var bookshelf = require('bookshelf')(knex);
module.exports = require('bookshelf')(knex);