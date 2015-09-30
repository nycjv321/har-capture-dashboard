var bookshelf = require('./bookshelf');
var HarLog = require('./har_log');
var UniformResourceLocator = require('./uniform_resource_locator');

var DetailedHarEntry = bookshelf.Model.extend({
    tableName: 'detailed_har_entries',
    harLog: function() {
        return this.belongsTo(HarLog, 'har_log_id');
    },
    harEntry: function () {
        return this.hasOne(HarEntry, 'id');
    }
});

var HarEntry = bookshelf.Model.extend({
    tableName: 'har_entries',
    detailedHarEntry: function () {
        return this.belongsTo(DetailedHarEntry, 'id')
    },
    harEntryResponse: function () {
        return this.belongsTo(HarEntryResponse, 'entry_response_id');
    }
});

var HarContent = bookshelf.Model.extend({
    tableName: 'har_contents',
    harEntryResponse: function () {
        return this.belongsTo(HarEntryResponse, 'har_content_id');
    },
    mimeType: function () {
        return this.belongsTo(MimeType, 'mime_type_id');
    },
    encoding: function () {
        return this.belongsTo(Encoding, 'encoding_id');
    }
});

var MimeType = bookshelf.Model.extend({
    tableName: 'mimetypes'
});

var Encoding = bookshelf.Model.extend({
    tableName: 'encodings'

});

var HarEntryResponse = bookshelf.Model.extend({
    tableName: 'har_entry_responses',
    url: function () {
        return this.belongsTo(UniformResourceLocator, 'redirect_url_id');
    },
    content: function () {
        return this.belongsTo(HarContent, 'har_content_id');
    },
    harEntry: function () {
        return this.hasOne(HarEntry, 'id');
    }
});

DetailedHarEntry.prototype.content = function (callback) {
    this.related('harEntry').related('harEntryResponse').related('content').load(['encoding', 'mimeType']).then(function (model) {
        responseData = {
            id: model.get('id'),
            compression: model.get('compression'),
            size: model.get('size'),
            text: model.get('text')
        }
        if (typeof model.related('encodings') != 'undefined') {
            responseData['encoding'] = model.related('encodings').get('name');
        }
        if (typeof model.related('mimeType') != 'undefined') {
            responseData['mimeType'] = model.related('mimeType').get('name');
        }
        return callback(responseData);
    });
};


module.exports = bookshelf.model('DetailedHarEntry', DetailedHarEntry)