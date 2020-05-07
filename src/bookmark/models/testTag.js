const mongoose = require("mongoose");

/**
 * Tags Schema
 */
const tagsSchema = new mongoose.Schema({
  
  /**
   * Title of the tag
   */
  title: {
    type: String,
    required: true,
    unique: true
  },

  /**
   * Time when tag was created
   */
  createdAt: {
    type: Date,
    default: Date.now
  },

  /**
   * Time when tag was updated
   */
  updatedAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("testTags", tagsSchema);