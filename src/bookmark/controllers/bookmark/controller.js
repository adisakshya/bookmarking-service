/**
 * Bookmark Controller
 */

/**
 * Valid URL
 */
const validURL = require('valid-url');

/**
 * Require Database Controller
 */
const dbController = require('../../lib/dbInterface');
const tagController = require('../../lib/tagInterface');

/**
 * Utility function
 * Find and remove item from an array
 */
function removeItemFromArray(arr, value) { 
  var index = arr.indexOf(value);
  if (index > -1) {
      arr.splice(index, 1);
  }
  return arr;
}

/**
 * Utility function
 * Find item in an array
 */
function getItemFromArray(arr, value) { 
  var index = arr.indexOf(value);
  return index;
}

/**
 * CREATE new bookmark
 * @param {object} req 
 * @param {object} res 
 */
const _createNewItem = async (req, res) => {

    // Get link, title, publisher
    const { link, title, publisher } = req.body;

    // Check if all parameters are given
    if(!(link && title && publisher)) {
      return res
        .status(400)
        .json({
            "success": false,
            "error": true,
            "message": "Insufficient parameters",
            "data": null
        });
    }

    // Define empty bookmark tags list
    let tags = [];

    // Check if valid link
    if(!validURL.isUri(link)) {
      return res
        .status(400)
        .json({
            "success": false,
            "error": true,
            "message": "Invalid Link",
            "data": null
        });
    }

    // Insert into db
    const { error, data, message } = await dbController.insertNewItem(link, title, publisher, tags);
    let resp = {
      "success": !error,
      "error": error,
      'message': message,
      "data": {
        "bookmark": data
      }
    }
    
    if(!error && data) {
      // Insert successful
      return res
        .status(200)
        .json(resp);
    } else if(error.code === 11000) {
      // Duplicate entry
      return res
        .status(409)
        .json({
              "success": !error,
              "error": error,
              'message': 'Bookmark already exists',
              "data": data
          });
    } else {
      // Other failure
      return res
          .status(500)
          .json(resp);
    }
};

/**
 * GET all bookmarks
 * @param {object} req 
 * @param {object} res 
 */
const _getAllItems = async (req, res) => {
  
  // Get all bookmarks
  const { error, data, message } = await dbController.getItems();
  let resp = {
    "success": !error,
    "error": error,
    'message': message,
    "data": {
      "bookmarks": data
    }
  }

  if(!error && data && data.length) {
    // Bookmarks found
    return res
      .status(200)
      .json(resp);
  } else if(!error && !data){
    // No bookmarks found
    return res
      .status(404)
      .json(resp);
  } else {
    // Other failure
    return res
      .status(500)
      .json(resp);
  }
};

/**
 * GET bookmark by ID
 * @param {object} req 
 * @param {object} res 
 */
const _getByID = async (req, res) => {
  
  // Get id
  const id = req.query.id;

  // Check if all parameters are given
  if(!id) {
    return res
      .status(400)
      .json({
          "success": false,
          "error": true,
          'message': 'Insufficient parameters',
          "data": null
      });
  }

  // Get item by ID
  const { error, data, message } = await dbController.getItemByID(id);
  let resp = {
    "success": !error,
    "error": error,
    'message': message,
    "data": {
      "bookmark": data
    }
  }

  if(!error && data) {
    // Bookmark found
    return res
      .status(200)
      .json(resp);
  } else if(!error && !data){
    // Bookmark not found
    return res
      .status(404)
      .json(resp);
  } else {
    // Other failure
    return res
      .status(500)
      .json(resp);
  }
};

/**
 * DELETE bookmark by ID
 * @param {object} req 
 * @param {object} res 
 */
const _deleteByID = async (req, res) => {
  
  // Get id
  const { id } = req.body;

  // Check if all parameters are given
  if(!id) {
    return res
      .status(400)
      .json({
        "success": false,
        "error": true,
        "message": "Insufficient parameters",
        "data": null
      });
  }

  // Delete item
  const { error, data, message } = await dbController.deleteItemByID(id);
  let resp = {
    "success": !error,
    "error": error,
    'message': message,
    "data": {
      "bookmark": data
    }
  }

  if(!error && data) {  
    // Bookmark deleted
    return res
      .status(200)
      .json(resp);
  } else if(!error && !data) {
    // Bookmark not found
    return res
      .status(404)
      .json(resp);
  } else {
    // Other failure
    return res
      .status(500)
      .json(resp);
  }
};

/**
 * DELETE all bookmarks
 * @param {object} req 
 * @param {object} res 
 */
const _deleteAll = async (req, res) => {
  
  // Delete all tags
  const { error, data, message } = await dbController.deleteAllItems();
  let resp = {
    "success": !error,
    "error": error,
    'message': message,
    "data": {
      "bookmarks": data
    }
  }

  // Check if no items were present
  if(!error && !data) {
    // No bookmarks found
    return res
      .status(404)
      .json(resp);
  } else if(!error && data && data.deletedCount > 0) {    
    // All bookmarks deleted
    return res
      .status(200)
      .json(resp);
  } else {
    // Other failure
    return res
      .status(500)
      .json(resp);
  }
};

/**
 * ADD tag to bookmark by ID
 * @param {object} req 
 * @param {object} res 
 */
const _addTag = async (req, res) => {
  
  // Get id, title
  const { id, title } = req.body;

  // Check if all parameters are given
  if(!(id && title)) {
    return res
      .status(400)
      .json({
          "success": false,
          "error": true,
          "message": "Insufficient parameters",
          "data": null
      });
  }

  // Check if tag exists
  var { error, data, message } = await tagController.getItemByTitle(title);
  var resp1 = {
    "success": !error,
    "error": error,
    'message': message,
    "data": {
      "bookmarks": data
    }
  }
  if(!error && !data) {
    // Tag doesn't exists
    return res
      .status(404)
      .json(resp1);
  } else if(error) {
    // Other failure
    return res
      .status(500)
      .json(resp1);
  }

  // Get item by id
  var { error, data, message } = await dbController.getItemByID(id);
  var resp2 = {
    "success": !error,
    "error": error,
    'message': message,
    "data": {
      "bookmarks": data
    }
  }

  if(!error && data) {
    // Get tags
    let tags = data.tags;

    // Check if tag already assigned
    if(!(getItemFromArray(tags, title) > -1)) {
      // If not then update tags
      await tags.push(title);
      // Update item
      var { error, data, message } = await dbController.updateItem(id, {
        'tags': tags
      });
      var resp3 = {
        "success": !error,
        "error": error,
        'message': message,
        "data": {
          "bookmarks": data
        }
      }
      if(!error && data) {
        // Tag assigned
        return res
          .status(200)
          .json(resp3);
      } else {
        // Other failure
        return res
          .status(500)
          .json(resp3);
      }
    } else {
        // Tag already assigned
        return res
          .status(200)
          .json({
            "success": !error,
            "error": error,
            'message': "Tag already assigned",
            "data": {
              "bookmarks": data
            }
          });
    }
  } else if(!error && !data) {
    // Bookmark not found
    return res
      .status(404)
      .json(resp2)
  } else {
    // Other failure
    return res
      .status(500)
      .json(resp2)
  }
};

/**
 * REMOVE tag from bookmark by ID
 * @param {object} req 
 * @param {object} res 
 */
const _removeTag = async (req, res) => {
  
  // Get id, title
  const { id, title } = req.body;

  // Check if all parameters are given
  if(!(id && title)) {
    return res
      .status(400)
      .json({
        "success": false,
        "error": true,
        "message": "Insufficient parameters",
        "data": null
      })
  }

  // Get item by id
  var { error, data, message } = await dbController.getItemByID(id);
  var resp2 = {
    "success": !error,
    "error": error,
    'message': message,
    "data": {
      "bookmarks": data
    }
  }

  if(!error && data) {
    // Get tags
    let tags = data.tags;

    // Check if tag is assigned
    if(getItemFromArray(tags, title) > -1) {
      // If yes, then remove the assigned tag
      tags = removeItemFromArray(tags, title);
      // Update item
      var { error, data, message } = await dbController.updateItem(id, {
        'tags': tags
      });
      var resp3 = {
        "success": !error,
        "error": error,
        'message': message,
        "data": {
          "bookmarks": data
        }
      }
      if(!error && data) {
        // Tag removed
        return res
          .status(200)
          .json(resp3);
      } else {
        // Other failure
        return res
          .status(500)
          .json(resp3);
      }
    } else {
        // Tag not assigned to this bookmark
        return res
          .status(200)
          .json({
            "success": !error,
            "error": error,
            'message': "Tag not assigned to this bookmark",
            "data": {
              "bookmarks": data
            }
          });
    }
  } else if(!error && !data) {
    // Bookmark not found
    return res
      .status(404)
      .json(resp2)
  } else {
    // Other failure
    return res
      .status(500)
      .json(resp2)
  }
};

exports.createNewItem = _createNewItem;
exports.getAllItems = _getAllItems;
exports.getByID = _getByID;
exports.deleteByID = _deleteByID;
exports.deleteAll = _deleteAll;
exports.addTag = _addTag;
exports.removeTag = _removeTag;