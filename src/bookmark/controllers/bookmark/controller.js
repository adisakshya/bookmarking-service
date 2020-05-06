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
    const url = await dbController.getItemByLink(link);
    if(url) {
        // Return response
        return res
        .status(200)
        .json({
            "success": true,
            "error": false,
            "message": "URL code already exists",
            "data": {
              "url": url,
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
              "url": item,
              "duplicate": "Bookmark Title"
            }
        });
    } else {
        // Generate ID
        let id = uuid()
        
        // Insert into db
        const item = await dbController.insertNewItem(id, link, title, publisher, tags);

        if(item) {
        // Return response
        return res
            .status(200)
            .json({
            "success": true,
            "error": false,
            "message": "New bookmark entry created",
            "data": {
                "url": item,
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
          "url": item
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
  let itemCode = item.URLCode;

  // Delete item
  const removedItem = await dbController.deleteItemByID(id);
  
  if(removedItem) {    
    // Return response
    return res
      .status(200)
      .json({
        "success": true,
        "error": false,
        'message': "Bookmark deleted",
        "data": {
          "url": item
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
          "url": resp
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

exports.checkDBConnection = checkDBConnection;
exports.createNewItem = createNewItem;
exports.getAllItems = getAllItems;
exports.getByID = getByID;
exports.deleteByID = deleteByID;
exports.deleteAll = deleteAll;