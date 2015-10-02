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
    responseData = {};
    this.related('harEntry').related('harEntryResponse').load().then(function (harEntryResponse) {

        if (harEntryResponse.url().toString() != '') {
            responseData['redirect_url'] = harEntryResponse.url().toString();
        }

        harEntryResponse.related('content').load(['encoding', 'mimeType']).then(function (model) {
            if (model.get('compression') != null) {
                responseData['compression'] = model.get('compression');
            }
            if (typeof model.related('mimeType') != 'undefined') {
                responseData['mimeType'] = model.related('mimeType').get('name');
            }
            if (typeof model.related('encodings') != 'undefined') {
                responseData['encoding'] = model.related('encodings').get('name');
            }

            responseData['text'] = model.get('text');
            responseData['size'] = model.get('size');


            return callback(responseData);
        });
    });
};

bookshelf.plugin('registry');
module.exports = bookshelf.model('DetailedHarEntry', DetailedHarEntry)