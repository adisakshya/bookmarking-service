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

    // Insert into db
    const { error, data, message } = await dbController.insertNewItem(title);
    let resp = {
      "success": !error,
      "error": error,
      'message': message,
      "data": {
        "tags": data
      }
    }
    
    if(!error) {
      return res
        .status(200)
        .json(resp);
    } else if(error.code === 11000) {
        return res
          .status(409)
          .json({
              "success": !error,
              "error": error,
              'message': 'Tag already exists',
              "data": data
          });
      } else {
          return res
            .status(500)
            .json(resp);
      }
};

/**
 * CREATE all tags
 * @param {object} req 
 * @param {object} res 
 */
const _getAllItems = async (req, res) => {
  
  // Get all tags
  const { error, data, message } = await dbController.getItems();
  let resp = {
    "success": !error,
    "error": error,
    'message': message,
    "data": {
      "tags": data
    }
  }

  if(data.length && !error) {
    return res
      .status(200)
      .json(resp);
  } else if(!data.length && !error){
    return res
      .status(404)
      .json(resp);
  } else {
    return res
      .status(500)
      .json(resp);
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
  const { error, data, message } = await dbController.getItemByID(id);
  let resp = {
    "success": !error,
    "error": error,
    'message': message,
    "data": {
      "tags": data
    }
  }

  if(!error && data) {
    return res
      .status(200)
      .json(resp);
  } else if(!error && !data){
    return res
      .status(404)
      .json(resp);
  } else {
    return res
      .status(404)
      .json(resp);
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

  // Delete item
  const { error, data, message } = await dbController.deleteItemByID(id);
  let resp = {
    "success": !error,
    "error": error,
    'message': message,
    "data": {
      "tags": data
    }
  }

  if(!error && data) {   
    return res
      .status(200)
      .json(resp);
  } else if(!error && !data) {
    return res
      .status(404)
      .json(resp);
  } else {
    return res
      .status(500)
      .json(resp);
  }
};

/**
 * DELETE all tags
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
      "tags": data
    }
  }

  // Check if no items were present
  if(!error && !data.deletedCount) {
    return res
      .status(404)
      .json(resp);
  } else if(!error && data) {    
    return res
      .status(200)
      .json(resp);
  } else {
    return res
      .status(500)
      .json(resp);
  }
};

exports.createNewItem = _createNewItem;
exports.getAllItems = _getAllItems;
exports.getByID = _getByID;
exports.deleteByID = _deleteByID;
exports.deleteAll = _deleteAll;