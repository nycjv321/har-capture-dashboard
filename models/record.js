var bookshelf = require('./bookshelf');

var Record = bookshelf.Model.extend({
    tableName: 'records'
});

module.exports = Record