const mongoose = require("mongoose");

/**
 * Tags Schema
 */
const tagsSchema = new mongoose.Schema({
  
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
});

module.exports = mongoose.model("tags", tagsSchema);