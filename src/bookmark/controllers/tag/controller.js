/**
 * Tag Controller
 */

/**
 * Require Database Controller
 */
const dbController = require('../../lib/tagInterface');

/**
 * CREATE new tag
 * @param {object} req 
 * @param {object} res 
 */
const _createNewItem = async (req, res) => {

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
          });
    }

    // Check if item with this Title already exists
    const item = await dbController.getItemByTitle(title);
    if(item) {
        return res
          .status(200)
          .json({
              "success": true,
              "error": false,
              "message": "Tag already exists",
              "data": {
                "tag": item,
                "duplicate": "Tag Title"
              }
          });
    } else {
        // Insert into db
        const item = await dbController.insertNewItem(title);

        if(item) {
        return res
            .status(200)
            .json({
                "success": true,
                "error": false,
                "message": "New tag entry created",
                "data": {
                    "tag": item,
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
 * CREATE all tags
 * @param {object} req 
 * @param {object} res 
 */
const _getAllItems = async (req, res) => {
  
  // Get all tags
  const items = await dbController.getItems();

  if(items.length) {
    return res
      .status(200)
      .json({
          "success": true,
          "error": false,
          'message': "Tags found",
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
          "message": 'No tags found',
          "data": null
      });
  }
};

/**
 * GET tag by ID
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
  const item = await dbController.getItemByID(id);
  
  if(item) {
    return res
      .status(200)
      .json({
          "success": true,
          "error": false,
          'message': "Tag found",
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

/**
 * DELETE tag by ID
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

  // Get item by ID
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
          "message": "No such tag found",
          "data": null
      });
  }
};

/**
 * DELETE all tags
 * @param {object} req 
 * @param {object} res 
 */
const _deleteAll = async (req, res) => {
  
  // Delete all tags
  const resp = await dbController.deleteAllItems();
  
  // Check if no items were present
  if(!resp.deletedCount) {
    return res
      .status(404)
      .json({
          "success": false,
          "error": true,
          "message": "No tags found",
          "data": null
      });
  }

  if(resp) {    
    return res
      .status(200)
      .json({
          "success": true,
          "error": false,
          'message': "Tags deleted",
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

exports.createNewItem = _createNewItem;
exports.getAllItems = _getAllItems;
exports.getByID = _getByID;
exports.deleteByID = _deleteByID;
exports.deleteAll = _deleteAll;