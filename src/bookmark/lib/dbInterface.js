/**
 * Database Controller
 * Interaction with database
 */

/**
 * Load model
 */
let bookmarks = require('../models/bookmark');

/**
 * Check if connection with database if established
 */
const checkDB = async() => {
  // Load database connection test
  const dbTest = require('../db/db').connectionTest;

  // RETURN connection test result
  return dbTest();
};

/**
 * GET item by ID
 * @param {String} id 
 */
const getItemByID = async (id) => {
  
  try {
    // GET item
    const item = await bookmarks.findById(id);
    
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
 * GET item by link
 * @param {String} link 
 */
const getItemByLink = async (link) => {
  
  try {
    // GET item
    const item = await bookmarks.findOne({
      link: link
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
 * GET item by title
 * @param {String} link 
 */
const getItemByTitle = async (title) => {
  
  try {
    // GET item
    const item = await bookmarks.findOne({
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
 * @param {String} id 
 * @param {String} link
 * @param {String} title
 * @param {String} publisher
 * @param {String} tags
 */
const insertNewItem = async (id, link, title, publisher, tags) => {
    
  try {
    // Create new item
    const item = new bookmarks({
        id,
        link,
        title,
        publisher,
        tags
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
    const item = await bookmarks.findById(id);

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
    const flag = await bookmarks.deleteMany({});

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
    const items = await bookmarks.find();

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

exports.checkDB = checkDB;
exports.getItemByID = getItemByID;
exports.insertNewItem = insertNewItem;
exports.deleteItemByID = deleteItemByID;
exports.deleteAllItems = deleteAllItems;
exports.getItems = getItems;
exports.getItemByLink = getItemByLink;
exports.getItemByTitle = getItemByTitle;