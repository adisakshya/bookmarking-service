/**
 * Tag Controller
 */

/**
 * Require Database Controller
 */
const dbController = require('../../lib/tagInterface');

/**
 * @api {post} /api/v1/tag create new entry for tag
 * @apiVersion 1.0.0
 * @apiName create new entry for tag
 * @apiGroup tag
 * @apiPermission all
 * 
 * @apiParamExample {String} request-example
 * 
 * curl --request POST http://<domain:port>/api/v1/tag \
 *  --data-urlencode 'title=someRandomTagTitle'
 * 
 * @apiParamExample {json} response-example
 * 
 * {
 *      "success": true,
 *      "error": false,
 *      "message": "New tag created",
 *      "data": {
 *        "tags": {
 *           "_id": "5e7a33a638b79200123772a1",
 *           "title": "someRandomTagTitle",
 *           "createdAt": "2020-05-07T10:24:12.974Z",
 *           "updatedAt": "2020-05-07T10:24:12.974Z",
 *           "__v": 0
 *         }
 *       }
 * }
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
 * @api {get} /api/v1/tag get all tags
 * @apiVersion 1.0.0
 * @apiName get all shorten url entries
 * @apiGroup tag
 * @apiPermission all
 * 
 * @apiParamExample {String} request-example
 * 
 * curl --request GET http://<domain:port>/api/v1/tag
 * 
 * @apiParamExample {json} response-example
 * 
 * {
 *      "success": true,
 *      "error": false,
 *      "message": "Tags found",
 *      "data": {
 *         "tags": [
 *             {
 *                 "_id": "5e7a33a638b79200123772a1",
 *                 "title": "someRandomTagTitle",
 *                 "createdAt": "2020-05-07T10:24:12.974Z",
 *                 "updatedAt": "2020-05-07T10:24:12.974Z",
 *                 "__v": 0
 *             },
 *             {
 *                 "_id": "6f8b44b749c80311234883b2",
 *                 "title": "someAnotherRandomTagTitle",
 *                 "createdAt": "2020-05-07T10:24:12.974Z",
 *                 "updatedAt": "2020-05-07T10:24:12.974Z",
 *                 "__v": 0
 *             }
 *         ]
 *       }
 * }
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

  if(!error && data && data.length) {
    return res
      .status(200)
      .json(resp);
  } else if(!error && !data){
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
 * @api {get} /api/v1/tag/item get tag details by ID
 * @apiVersion 1.0.0
 * @apiName get tag details by ID
 * @apiGroup tag
 * @apiPermission all
 * 
 * @apiParam {String} id Tag ID
 * 
 * @apiParamExample {String} request-example
 * 
 * curl --request GET http://<domain:port>/api/v1/tag/item?id=TagID
 * 
 * @apiParamExample {json} response-example
 * 
 * {
 *      "success": true,
 *      "error": false,
 *      "message": "Tag found",
 *      "data": {
 *        "tags": {
 *           "_id": "6f8b44b749c80311234883b2",
 *           "title": "someRandomTagTitle",
 *           "createdAt": "2020-05-07T10:24:12.974Z",
 *           "updatedAt": "2020-05-07T10:24:12.974Z",
 *           "__v": 0
 *         }
 *       }
 * }
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
      .status(500)
      .json(resp);
  }
};

/**
 * @api {delete} /api/v1/tag/item delete tag by ID
 * @apiVersion 1.0.0
 * @apiName delete tag
 * @apiGroup tag
 * @apiPermission all
 * 
 * @apiParam {String} id Tag ID
 * 
 * @apiParamExample {String} request-example
 * 
 * curl --request DELETE http://<domain:port>/api/v1/tag/item \
 *  --data-urlencode 'id=5e7a33a638b79200123772a1'
 * 
 * @apiParamExample {json} response-example
 * 
 * {
 *      "success": true,
 *      "error": false,
 *      "message": "Tag deleted",
 *      "data": {
 *        "tags": {
 *           "_id": "5e7a33a638b79200123772a1",
 *           "title": "someRandomTagTitle",
 *           "createdAt": "2020-05-07T10:24:12.974Z",
 *           "updatedAt": "2020-05-07T10:24:12.974Z",
 *           "__v": 0
 *         }
 *       }
 * }
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
 * @api {delete} /api/v1/tag delete all tags
 * @apiVersion 1.0.0
 * @apiName delete all tags
 * @apiGroup tag
 * @apiPermission all
 * 
 * @apiParamExample {String} request-example
 * 
 * curl --request DELETE http://<domain:port>/api/v1/tag
 * 
 * @apiParamExample {json} response-example
 * 
 * {
 *      "success": true,
 *      "error": false,
 *      "message": "Tags deleted",
 *      "data": {
  *        "tags": {
  *           "n": 1,
  *           "ok": 1,
  *           "deletedCount": 1
 *         }
 *       }
 * }
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
  if(!error && !data) {
    return res
      .status(404)
      .json(resp);
  } else if(!error && data && data.deletedCount > 0) {    
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