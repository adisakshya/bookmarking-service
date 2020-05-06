/**
 * Database Controller
 * Interaction with database
 */

/**
 * Load model
 */
let tags = require('../models/tag');

/**
 * GET item by ID
 * @param {String} id 
 */
const getItemByID = async (id) => {
  
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
const getItemByTitle = async (title) => {
  
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
const insertNewItem = async (title) => {
    
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
const deleteItemByID = async (id) => {
    
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
const deleteAllItems = async () => {
    
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
const getItems = async () => {
    
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

exports.getItemByID = getItemByID;
exports.insertNewItem = insertNewItem;
exports.deleteItemByID = deleteItemByID;
exports.deleteAllItems = deleteAllItems;
exports.getItems = getItems;
exports.getItemByTitle = getItemByTitle;