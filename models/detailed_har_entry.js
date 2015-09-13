var bookshelf = require('./bookshelf');

var DetailedHarEntry = bookshelf.Model.extend({
    tableName: 'detailed_har_entries',
    time: function() {
        return this.attributes['time'];
    },
    address: function() {
        return this.attributes['address'];
    },
    bodysize: function() {
        return this.attributes['bodysize'];
    },
    headerssize: function() {
        return this.attributes['headerssize'];
    },
    status: function() {
        return this.attributes['status'];
    },
    URL: function() {
        return this.attributes['URL'];
    },
    Source: function() {
        return this.attributes['Source'];
    },

});

module.exports = DetailedHarEntry