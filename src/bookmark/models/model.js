let bookmarks, tags;

if(process.env.NODE_ENV === 'test') {
    console.log('>', 'Test Models Loaded');
    bookmarks = require('./testBookmark');
    tags = require('./testTag');
} else {
    console.log('>', 'Models Loaded');
    bookmarks = require('./bookmark');
    tags = require('./tag');
}

module.exports = { bookmarks, tags }