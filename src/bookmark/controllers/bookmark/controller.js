/**
 * Application Controller
 * Management of Bookmarks
 */

/**
 * UUID
 */
const uuid = require('uuid').v4;

/**
 * Valid URL
 */
const validURL = require('valid-url');

/**
 * Require Database Controller
 */
const dbController = require('../../lib/dbInterface');

/**
 * Utility function
 */
function removeItemFromArray(arr, value) { 
  var index = arr.indexOf(value);
  if (index > -1) {
      arr.splice(index, 1);
  }
  return arr;
}

const checkDBConnection = async (req, res) => {

  // CHECK if connection is established
  if(await dbController.checkDB() !== 1) {
    // if not then return Status 504
    return res
      .status(504)
      .json({
        "success": false,
        "error": true,
        "message": "Failed to establish connection with database",
        "data": null
      });
  } else {
    // if yes then return Status 200 OK
    return res
      .status(200)
      .json({
        "success": true,
        "error": false,
        "message": "Connection with database is successfully established",
        "data": null
      });
  }
}

const createNewItem = async (req, res) => {

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
        })
    }

    let tags = req.body.tags;
    if(!tags) {
      tags = [];
    } else {
      // create array object
      tags = tags.split(',');  
    }

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
        // Return response
        return res
        .status(200)
        .json({
            "success": true,
            "error": false,
            "message": "Bookmark link already exists",
            "data": {
              "link": bookmarklink,
              "duplicate": "Bookmark Link"
            }
        });
    }

    // Check if item with this title already exists
    const item = await dbController.getItemByTitle(title);
    if(item) {
        // Return response
        return res
        .status(200)
        .json({
            "success": true,
            "error": false,
            "message": "Title already exists",
            "data": {
              "bookmark": item,
              "duplicate": "Bookmark Title"
            }
        });
    } else {
        // Insert into db
        const item = await dbController.insertNewItem(link, title, publisher, tags);

        if(item) {
        // Return response
        return res
            .status(200)
            .json({
            "success": true,
            "error": false,
            "message": "New bookmark entry created",
            "data": {
                "bookmark": item,
            }
            })
        } else {
        return res
            .status(500)
            .json({
            "success": false,
            "error": true,
            'message': 'Something went wrong',
            "data": null
            })
        }
    }

};

const getAllItems = async (req, res) => {
  
  // Get items
  const items = await dbController.getItems();

  // Return response
  if(items.length) {
    return res
      .status(200)
      .json({
        "success": true,
        "error": false,
        'message': "Items found",
        "data": {
          "items": items
        }
      });
  } else {
    return res
      .status(404)
      .json({
        "success": false,
        "error": true,
        "message": 'No Items found',
        "data": null
      });
  }
};

const getByID = async (req, res) => {
  
  // Get params
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
      })
  }

  // Get item
  const item = await dbController.getItemByID(id);
  
  // Return response
  if(item) {
    return res
      .status(200)
      .json({
        "success": true,
        "error": false,
        'message': "Bookmark ID found",
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
        "message": "No such Bookmark ID found",
        "data": null
      })
  }
};

const deleteByID = async (req, res) => {
  
  // Get ID
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
      })
  }

  // Get url code
  const item = await dbController.getItemByID(id);
  let itemID = item._id;

  // Delete item
  const removedItem = await dbController.deleteItemByID(itemID);
  
  if(removedItem) {    
    // Return response
    return res
      .status(200)
      .json({
        "success": true,
        "error": false,
        'message': "Bookmark deleted",
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
        "message": "No such Bookmark found",
        "data": null
      });
  }
};

const deleteAll = async (req, res) => {
  
  // Get item
  const resp = await dbController.deleteAllItems();
  
  // Check if no items were present
  if(!resp.deletedCount) {
    return res
      .status(404)
      .json({
        "success": false,
        "error": true,
        "message": "No Items found",
        "data": null
      });
  }

  if(resp) {    
    // Return response
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

const addTag = async (req, res) => {
  
  const { id, tagTitle } = req.body;

  // Check if all parameters are given
  if(!(id && tagTitle)) {
    return res
      .status(400)
      .json({
        "success": false,
        "error": true,
        "message": "Insufficient parameters",
        "data": null
      })
  }

  // Get item
  const item = await dbController.getItemByID(id);
  
  // Return response
  if(item) {
    // Add tag
    let tags = item.tags;
    await tags.push(tagTitle);
    console.log(tags)
    // Update item
    const updatedItem = await dbController.updateItem(id, {
      'tags': tags
    });
    console.log(updatedItem)
    if(updatedItem) {
      // Return response
      return res
        .status(200)
        .json({
          "success": true,
          "error": false,
          'message': "bookmark updated",
          "data": {
            "bookmark": updatedItem
          }
        });
    } else {
      // Return response
      return res
        .status(500)
        .json({
          "success": false,
          "error": true,
          'message': "something went wrong",
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
        "message": "No such Bookmark ID found",
        "data": null
      })
  }
};

const removeTag = async (req, res) => {
  
  const { id, tagTitle } = req.body;

  // Check if all parameters are given
  if(!(id && tagTitle)) {
    return res
      .status(400)
      .json({
        "success": false,
        "error": true,
        "message": "Insufficient parameters",
        "data": null
      })
  }

  // Get item
  const item = await dbController.getItemByID(id);
  
  // Return response
  if(item) {
    // Add tag
    let tags = item.tags;
    tags = removeItemFromArray(tags, tagTitle);
    
    // Update item
    const updatedItem = await dbController.updateItem(id, {
      'tags': tags
    });
    if(updatedItem) {
      // Return response
      return res
        .status(200)
        .json({
          "success": true,
          "error": false,
          'message': "bookmark updated",
          "data": {
            "bookmark": item
          }
        });
    } else {
      // Return response
      return res
        .status(500)
        .json({
          "success": false,
          "error": true,
          'message': "something went wrong",
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
        "message": "No such Bookmark ID found",
        "data": null
      })
  }
};

exports.checkDBConnection = checkDBConnection;
exports.createNewItem = createNewItem;
exports.getAllItems = getAllItems;
exports.getByID = getByID;
exports.deleteByID = deleteByID;
exports.deleteAll = deleteAll;
exports.addTag = addTag;
exports.removeTag = removeTag;