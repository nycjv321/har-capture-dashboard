var bookshelf = require('./bookshelf');

var UniformResourceLocator = bookshelf.Model.extend({
    tableName: 'urls',
    host: function () {
        return this.attributes['DetailedRecord'];
    },
    path: function () {
        return this.attributes['path'];
    },
    port: function () {
        return this.attributes['port'];
    },
    protocol: function () {
        return this.attributes['protocol'];
    },
    URLquery: function () {
        return this.attributes['query'];
    },
    toString: function() {
        var query = this.URLquery() === null ? '' : this.URLquery();
        if (this.port() !== -1) {
            return this.protocol() + "://" + this.host() + ":" + this.port() + this.path() + query;
        } else {
            return this.protocol() + "://" + this.host() + this.path() + query;
        }
    }
});

module.exports = UniformResourceLocator