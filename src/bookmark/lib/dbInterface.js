/**
 * Interface - Bookmark Schema
 */

/**
 * Load model
 */
let { bookmarks } = require('../models/model');

/**
 * GET item by ID
 * @param {String} id 
 */
const _getItemByID = async (id) => {
  
  try {
    // GET item
    const item = await bookmarks.findById(id);
    
    // RETURN item
    if(item) {
      return {
        error: false,
        data: item,
        message: "Bookmark found"
      };
    } else {
      return {
        error: false,
        data: null,
        message: "No such bookmark found"
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
 * GET item by link
 * @param {String} link 
 */
// const _getItemByLink = async (link) => {
  
//   try {
//     // GET item
//     const item = await bookmarks.findOne({
//       link: link
//     });
    
//     // RETURN item
//     if(item) {
//       return item;
//     } else {
//       return false;
//     }
//   } catch(err) {
//     return false;
//   }

// };

/**
 * GET item by title
 * @param {String} link 
 */
// const _getItemByTitle = async (title) => {
  
//   try {
//     // GET item
//     const item = await bookmarks.findOne({
//       title: title
//     });
    
//     // RETURN item
//     if(item) {
//       return {
//         error: false,
//         data: item,
//         message: "Bookmark found"
//       };
//     } else {
//       return {
//         error: false,
//         data: null,
//         message: "No such bookmark found"
//       };
//     }
//   } catch(err) {
//     return {
//       error: {
//         name: err.name,
//         code: err.code
//       },
//       data: null,
//       message: "Something went wrong"
//     };
//   }

// };

/**
 * INSERT new item
 * @param {String} link
 * @param {String} title
 * @param {String} publisher
 * @param {String} tags
 */
const _insertNewItem = async (link, title, publisher, tags) => {
    
  try {
    // Create new item
    const item = new bookmarks({
        link,
        title,
        publisher,
        tags
    });

    // Insert into DB
    await item.save();

    // Return item
    return {
      error: false,
      data: item,
      message: "New bookmark created"
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
    const item = await bookmarks.findById(id);

    // Delete and return item
    if(item) {
      let removed_item = await item.remove();
      return {
        error: false,
        data: removed_item,
        message: "Bookmark deleted"
      };
    } else {
      return {
        error: false,
        data: null,
        message: "No such bookmark found"
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
 * DELETE all items
 */
const _deleteAllItems = async () => {
    
  try {
    // Get item by ID
    const flag = await bookmarks.deleteMany({});
    
    // Delete and return item
    if(flag && flag.deletedCount > 0) {
      return  {
        error: false,
        data: flag,
        message: "Bookmarks deleted"
      };
    } else {
      return  {
        error: false,
        data: null,
        message: "No bookmarks found"
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
 * GET all item 
 */
const _getItems = async () => {
    
  try {
    // Get all items
    const items = await bookmarks.find();
    
    // Return items
    if(items && items.length) {
      return {
        error: false,
        data: items,
        message: "Bookmarks found"
      };
    } else {
      return {
        error: false,
        data: null,
        message: "No bookmarks found"
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
 * UPDATE item's original URL
 * @param {String} originalURL 
 */
const _updateItem = async (id, updatedItem) => {
  
  try {
    // UPDATE item
    const item = await bookmarks.findByIdAndUpdate(id, updatedItem, {new: true});

    // Return items
    if(item) {
      return {
        error: false,
        data: item,
        message: "Bookmark updated"
      };
    } else {
      return {
        error: false,
        data: null,
        message: "No bookmark found"
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

exports.getItemByID = _getItemByID;
exports.insertNewItem = _insertNewItem;
exports.deleteItemByID = _deleteItemByID;
exports.deleteAllItems = _deleteAllItems;
exports.getItems = _getItems;
exports.updateItem = _updateItem;