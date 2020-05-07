/**
 * Interface - Tag Schema
 */

/**
 * Load model
 */
let { tags } = require('../models/model');

/**
 * GET all item 
 */
const _getItems = async () => {
    
  try {
    // Get all items
    const items = await tags.find();
    
    // Return items
    if(items && items.length) {
      return {
        error: false,
        data: items,
        message: "Tags found"
      };
    } else {
      return {
        error: false,
        data: null,
        message: "No tags found"
      };
    }
  } catch(err) {
    return {
      error: {
        name: err.name,
        code: err.code
      },
      data: null,
      message: "Something went wrong"
    };
  };

};

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
      return {
        error: false,
        data: item,
        message: "Tag found"
      };
    } else {
      return {
        error: false,
        data: null,
        message: "No such tag found"
      };
    }
  } catch(err) {
    return {
      error: {
        name: err.name,
        code: err.code
      },
      data: null,
      message: "Something went wrong"
    };
  };
  
};

/**
 * GET item by title
 * @param {String} title 
 */
const _getItemByTitle = async (title) => {
  
  try {
    // GET item
    const item = await tags.findOne({
      title: title
    });
    
    // RETURN item
    if(item) {
      return {
        error: false,
        data: item,
        message: "Tag found"
      };
    } else {
      return {
        error: false,
        data: null,
        message: "No such tag found"
      };
    }
  } catch(err) {
    return {
      error: {
        name: err.name,
        code: err.code
      },
      data: null,
      message: "Something went wrong"
    };
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
    return {
      error: false,
      data: item,
      message: "New tag created"
    };
  } catch(err) {
    return {
      error: {
        name: err.name,
        code: err.code
      },
      data: null,
      message: "Something went wrong"
    };
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
      return {
        error: false,
        data: removed_item,
        message: "Tag deleted"
      };
    } else {
      return {
        error: false,
        data: null,
        message: "No such tag found"
      };
    }
  } catch(err) {
    return {
      error: {
        name: err.name,
        code: err.code
      },
      data: null,
      message: "Something went wrong"
    };
  };
  
};

/**
 * DELETE all items
 */
const _deleteAllItems = async () => {
    
  try {
    // Get item by ID
    const flag = await tags.deleteMany({});

    // Delete and return item
    if(flag && flag.deletedCount > 0) {
      return  {
        error: false,
        data: flag,
        message: "Tags deleted"
      };
    } else {
      return  {
        error: false,
        data: null,
        message: "No tags found"
      };
    }
  } catch(err) {
    return {
      error: {
        name: err.name,
        code: err.code
      },
      data: null,
      message: "Something went wrong"
    };
  };

};

exports.getItems = _getItems;
exports.getItemByID = _getItemByID;
exports.getItemByTitle = _getItemByTitle;
exports.insertNewItem = _insertNewItem;
exports.deleteItemByID = _deleteItemByID;
exports.deleteAllItems = _deleteAllItems;