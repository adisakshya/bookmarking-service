const mongoose = require("mongoose");

/**
 * Bookmarks Schema
 */
const bookmarksSchema = new mongoose.Schema({
  
  /**
   * Unique id of the bookmark (something like UUID)
   */
  id: {
    type: String,
    required: true
  },

  /**
   * Link of the bookmark
   */
  link: {
    type: String,
    required: true
  },

  /**
   * Title of the bookmark
   */
  title: {
    type: String,
    required: true
  },

  /**
   * Time when bookmark was created (in epoch time)
   */
  createdAt: {
    type: Date,
    default: Date.now
  },

  /**
   * Time when bookmark was updated (in epoch time)
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
    default: Date.now
  },
  
  /**
   * User created tags associated with the given bookmark
   */
  tags: {
    type: Array,
    default: Date.now
  }
});

module.exports = mongoose.model("bookmarks", bookmarksSchema);