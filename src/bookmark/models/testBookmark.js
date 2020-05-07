const mongoose = require("mongoose");

/**
 * Bookmarks Schema
 */
const bookmarksSchema = new mongoose.Schema({
  
  /**
   * Link of the bookmark
   */
  link: {
    type: String,
    required: true,
    unique: true
  },

  /**
   * Title of the bookmark
   */
  title: {
    type: String,
    required: true,
    unique: true
  },

  /**
   * Time when bookmark was created
   */
  createdAt: {
    type: Date,
    default: Date.now
  },

  /**
   * Time when bookmark was updated
   */
  updatedAt: {
    type: Date,
    default: Date.now
  },

  /**
   * Publisher of the bookmark
   */
  publisher: {
    type: String,
    required: true
  },
  
  /**
   * User created tags associated with the given bookmark
   */
  tags: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model("testBookmarks", bookmarksSchema);