var bookshelf = require('./bookshelf');

var Host = bookshelf.Model.extend({
    tableName: 'hosts',
    name: function () {
        return this.attributes['name'];
    }
});

module.exports = Host