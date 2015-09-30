var bookshelf = require('./bookshelf');


var HarCookie = bookshelf.Model.extend({
    tableName: 'har_cookies',

});


module.exports = HarCookie