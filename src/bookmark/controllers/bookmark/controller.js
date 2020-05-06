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

    // Get link, title, publisher, tags
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

    // Check if bookmark link already exists
    const bookmarklink = await dbController.getItemByLink(link);
    if(bookmarklink) {
      return res
        .status(200)
        .json({
            "success": true,
            "error": false,
            "message": "Bookmark link already exists",
            "data": {
              "link": bookmarklink,
              "duplicate": "Link"
            }
        });
    }

    // Check if item with this title already exists
    const item = await dbController.getItemByTitle(title);
    if(item) {
      return res
        .status(200)
        .json({
            "success": true,
            "error": false,
            "message": "Bookmark title already exists",
            "data": {
              "bookmark": item,
              "duplicate": "Title"
            }
        });
    } else {
        // Insert into db
        const item = await dbController.insertNewItem(link, title, publisher, tags);
        if(item) {
          return res
            .status(200)
            .json({
                "success": true,
                "error": false,
                "message": "New bookmark entry created",
                "data": {
                    "bookmark": item,
                }
            });
        } else {
          return res
              .status(500)
              .json({
                  "success": false,
                  "error": true,
                  'message': 'Something went wrong',
                  "data": null
              });
          }
    }
};

/**
 * GET all bookmarks
 * @param {object} req 
 * @param {object} res 
 */
const _getAllItems = async (req, res) => {
  
  // Get all bookmarks
  const items = await dbController.getItems();

  if(items.length) {
    return res
      .status(200)
      .json({
          "success": true,
          "error": false,
          'message': "bookmarks found",
          "data": {
            "bookmarks": items
          }
      });
  } else {
    return res
      .status(404)
      .json({
          "success": false,
          "error": true,
          "message": 'No bookmarks found',
          "data": null
      });
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

  // Get item by id
  const item = await dbController.getItemByID(id);
  
  if(item) {
    return res
      .status(200)
      .json({
          "success": true,
          "error": false,
          'message': "Bookmark found",
          "data": {
            "bookmark": item
          }
      });
  } else {
    return res
      .status(404)
      .json({
          "success": false,
          "error": true,
          "message": "No such bookmark found",
          "data": null
      });
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

  // Get item by id
  // To check if item exists
  const item = await dbController.getItemByID(id);
  let itemID = item._id;
  if(itemID) {
    // Delete item
    const removedItem = await dbController.deleteItemByID(itemID);
    
    if(removedItem) {   
      return res
        .status(200)
        .json({
            "success": true,
            "error": false,
            'message': "Bookmark deleted",
            "data": {
              "bookmark": removedItem
            }
        });
    } else {
      return res
        .status(404)
        .json({
            "success": false,
            "error": true,
            "message": "Something went wrong",
            "data": null
        });
    }
  } else {
      return res
        .status(404)
        .json({
            "success": false,
            "error": true,
            "message": "No such Bookmark found",
            "data": null
        });
  }
};

/**
 * DELETE all bookmarks
 * @param {object} req 
 * @param {object} res 
 */
const _deleteAll = async (req, res) => {
  
  // Delete all bookmarks
  const resp = await dbController.deleteAllItems();
  
  // Check if no items were present
  if(!resp.deletedCount) {
    return res
      .status(404)
      .json({
        "success": false,
        "error": true,
        "message": "No bookmarks found",
        "data": null
      });
  }

  if(resp) {
    return res
      .status(200)
      .json({
          "success": true,
          "error": false,
          'message': "Bookmarks deleted",
          "data": {
            "bookmark": resp
          }
      });
  } else {
    return res
      .status(500)
      .json({
          "success": false,
          "error": true,
          "message": "Something went wrong",
          "data": null
      });
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
  const tag = await tagController.getItemByTitle(title);
  if(!tag) {
    return res
      .status(404)
      .json({
          "success": false,
          "error": true,
          'message': "Tag not found",
          "data": null
      });
  }

  // Get item by id
  const item = await dbController.getItemByID(id);
  
  // Return response
  if(item) {
    // Get tags
    let tags = item.tags;

    // Check if tag already assigned
    if(!(getItemFromArray(tags, title) > -1)) {
      // If not then update tags
      await tags.push(title);

      // Update item
      const updatedItem = await dbController.updateItem(id, {
        'tags': tags
      });
      
      if(updatedItem) {
        return res
          .status(200)
          .json({
              "success": true,
              "error": false,
              'message': "Bookmark updated",
              "data": {
                "bookmark": updatedItem
              }
          });
      } else {
        return res
          .status(500)
          .json({
              "success": false,
              "error": true,
              'message': "Something went wrong",
              "data": {
                "bookmark": item
              }
          });
      }
    } else {
        return res
          .status(200)
          .json({
            "success": true,
            "error": false,
            'message': "Tag already assigned",
            "data": {
              "bookmark": item
            }
          });
    }
  } else {
    return res
      .status(404)
      .json({
        "success": false,
        "error": true,
        "message": "No such bookmark found",
        "data": null
      })
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

  // Get item by ID
  // To check if item exists
  const item = await dbController.getItemByID(id);
  
  if(item) {
    // Get tag
    let tags = item.tags;
    
    // Check if tag is assigned
    if(getItemFromArray(tags, title) > -1) {
      // If yes, then remove the assigned tag
      tags = removeItemFromArray(tags, title);
    
      // Update item
      const updatedItem = await dbController.updateItem(id, {
        'tags': tags
      });

      if(updatedItem) {
        return res
          .status(200)
          .json({
            "success": true,
            "error": false,
            'message': "Bookmark updated",
            "data": {
              "bookmark": item
            }
          });
      } else {
        return res
          .status(500)
          .json({
            "success": false,
            "error": true,
            'message': "Something went wrong",
            "data": {
              "bookmark": item
            }
          });
      }
    } else {
        return res
          .status(404)
          .json({
            "success": false,
            "error": true,
            'message': "This tag is not assigend to this bookmark",
            "data": {
              "bookmark": item
            }
          });
    }
  } else {
    return res
      .status(404)
      .json({
        "success": false,
        "error": true,
        "message": "No such bookmark found",
        "data": null
      })
  }
};

exports.createNewItem = _createNewItem;
exports.getAllItems = _getAllItems;
exports.getByID = _getByID;
exports.deleteByID = _deleteByID;
exports.deleteAll = _deleteAll;
exports.addTag = _addTag;
exports.removeTag = _removeTag;