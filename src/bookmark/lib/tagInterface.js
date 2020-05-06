/**
 * Interface - Tag Schema
 */

/**
 * Load model
 */
let tags = require('../models/tag');

/**
 * GET item by ID
 * @param {String} id 
 */
const _getItemByID = async (id) => {
  
  try {
    // GET item
    const item = await tags.findById(id);
    
    // RETURN item
    if(item) {
      return item;
    } else {
      return false;
    }
  } catch(err) {
    return false;
  }
  
};

/**
 * GET item by title
 * @param {String} link 
 */
const _getItemByTitle = async (title) => {
  
  try {
    // GET item
    const item = await tags.findOne({
      title: title
    });
    
    // RETURN item
    if(item) {
      return item;
    } else {
      return false;
    }
  } catch(err) {
    return false;
  }

};

/**
 * INSERT new item
 * @param {String} title
 */
const _insertNewItem = async (title) => {
    
  try {
    // Create new item
    const item = new tags({
        title
    });

    // Insert into DB
    await item.save();

    // Return item
    return item;
  } catch(err) {
    return false;
  }
    
};

/**
 * DELETE item 
 * @param {String} id 
 */
const _deleteItemByID = async (id) => {
    
  try {
    // Get item by ID
    const item = await tags.findById(id);

    // Delete and return item
    if(item) {
      let removed_item = await item.remove();
      return removed_item;
    } else {
      return false;
    }
  } catch(err) {
    return false;
  }
  
};

/**
 * DELETE all items
 */
const _deleteAllItems = async () => {
    
  try {
    // Get item by ID
    const flag = await tags.deleteMany({});

    // Delete and return item
    if(flag) {
      return flag;
    } else {
      return false;
    }
  } catch(err) {
    return false;
  }
  
};

/**
 * GET all item 
 */
const _getItems = async () => {
    
  try {
    // Get all items
    const items = await tags.find();

    // Return items
    if(items) {
      return items;
    } else {
      return false;
    }
  } catch(err) {
    return false;
  }
  
};

exports.getItemByID = _getItemByID;
exports.insertNewItem = _insertNewItem;
exports.deleteItemByID = _deleteItemByID;
exports.deleteAllItems = _deleteAllItems;
exports.getItems = _getItems;
exports.getItemByTitle = _getItemByTitle;