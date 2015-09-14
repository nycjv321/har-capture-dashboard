var knex = require('knex')({
    client: 'postgres',
    connection: {
        host     : '127.0.0.1',
        user     : 'postgres',
        password : '',
        database : 'performancetool1',
        charset  : 'utf8'
    }
});


var bookshelf = require('bookshelf')(knex);
module.exports = require('bookshelf')(knex);
