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
const dbController = require('../../lib/tagInterface');

const createNewItem = async (req, res) => {

    // Get title
    const { title } = req.body;

    // Check if all parameters are given
    if(!(title)) {
        return res
        .status(400)
        .json({
            "success": false,
            "error": true,
            "message": "Insufficient parameters",
            "data": null
        })
    }

    // Check if item with this Title already exists
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
              "tag": item,
              "duplicate": "Tag Title"
            }
        });
    } else {
        // Insert into db
        const item = await dbController.insertNewItem(title);

        if(item) {
        // Return response
        return res
            .status(200)
            .json({
            "success": true,
            "error": false,
            "message": "New tag entry created",
            "data": {
                "tag": item,
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
        'message': "tag ID found",
        "data": {
          "tag": item
        }
      });
  } else {
    return res
      .status(404)
      .json({
        "success": false,
        "error": true,
        "message": "No such tag ID found",
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
        'message': "tag deleted",
        "data": {
          "tag": item
        }
      });
  } else {
    return res
      .status(404)
      .json({
        "success": false,
        "error": true,
        "message": "No such tag found",
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
        'message': "tag deleted",
        "data": {
          "tag": resp
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

exports.createNewItem = createNewItem;
exports.getAllItems = getAllItems;
exports.getByID = getByID;
exports.deleteByID = deleteByID;
exports.deleteAll = deleteAll;