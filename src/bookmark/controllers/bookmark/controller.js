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
 * @api {post} /api/v1/bookmark create new entry for bookmark
 * @apiVersion 1.0.0
 * @apiName create new entry for bookmark
 * @apiGroup bookmark
 * @apiPermission all
 * 
 * @apiParamExample {String} request-example
 * 
 * curl --request POST http://<domain:port>/api/v1/bookmark \
 *  --data-urlencode 'link=http://localhost' \
 *  --data-urlencode 'title=someRandomTitle' \
 *  --data-urlencode 'publisher=someRandomPublisher'
 * 
 * @apiParamExample {json} response-example
 * 
 * {
 *      "success": true,
 *      "error": false,
 *      "message": "New bookmark created",
 *      "data": {
 *        "bookmarks": {
 *           "tags": [],
 *           "_id": "5eb3e44ccbd3184b040e08c5",
 *           "link": "http://localhost",
 *           "title": "someRandomTitle",
 *           "publisher": "someRandomPublisher",
 *           "createdAt": "2020-05-07T10:34:52.490Z",
 *           "updatedAt": "2020-05-07T10:34:52.490Z",
 *           "__v": 0
 *         }
 *       }
 * }
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
        "bookmarks": data
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
 * @api {get} /api/v1/bookmark get all bookmarks
 * @apiVersion 1.0.0
 * @apiName get all bookmarks
 * @apiGroup bookmark
 * @apiPermission all
 * 
 * @apiParamExample {String} request-example
 * 
 * curl --request GET http://<domain:port>/api/v1/bookmark
 * 
 * @apiParamExample {json} response-example
 * 
 * {
 *      "success": true,
 *      "error": false,
 *      "message": "Bookmarks found",
 *      "data": {
 *        "bookmarks": [
 *             {
 *                 "tags": [],
 *                 "_id": "5eb3e44ccbd3184b040e08c5",
 *                 "link": "http://localhost",
 *                 "title": "someRandomTitle",
 *                 "publisher": "someRandomPublisher",
 *                 "createdAt": "2020-05-07T10:34:52.490Z",
 *                 "updatedAt": "2020-05-07T10:34:52.490Z",
 *                 "__v": 0
 *             },
 *             {
 *                 "tags": [],
 *                 "_id": "5eb3e44ccbd3184b040e08c5",
 *                 "link": "http://localhosta",
 *                 "title": "someAnotherRandomTitle",
 *                 "publisher": "someRandomPublisher",
 *                 "createdAt": "2020-05-07T10:42:33.490Z",
 *                 "updatedAt": "2020-05-07T10:42:33.490Z",
 *                 "__v": 0
 *             }
 *         ]
 *       }
 * }
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
 * @api {get} /api/v1/tag/bookmark get bookmark details by ID
 * @apiVersion 1.0.0
 * @apiName get bookmark details by ID
 * @apiGroup bookmark
 * @apiPermission all
 * 
 * @apiParam {String} id Bookmark ID
 * 
 * @apiParamExample {String} request-example
 * 
 * curl --request GET http://<domain:port>/api/v1/bookmark/item?id=BookmarkID
 * 
 * @apiParamExample {json} response-example
 * 
 * {
 *      "success": true,
 *      "error": false,
 *      "message": "Bookmark found",
 *      "data": {
 *        "bookmarks": {
 *           "tags": [],
 *           "_id": "5eb3e44ccbd3184b040e08c5",
 *           "link": "http://localhost",
 *           "title": "someAnotherRandomTitle",
 *           "publisher": "someRandomPublisher",
 *           "createdAt": "2020-05-07T10:34:52.490Z",
 *           "updatedAt": "2020-05-07T10:34:52.491Z",
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
      "bookmarks": data
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
 * @api {delete} /api/v1/bookmark/item delete bookmark by ID
 * @apiVersion 1.0.0
 * @apiName delete bookmark
 * @apiGroup bookmark
 * @apiPermission all
 * 
 * @apiParam {String} id Bookmark ID
 * 
 * @apiParamExample {String} request-example
 * 
 * curl --request DELETE http://<domain:port>/api/v1/bookmark/item \
 *  --data-urlencode 'id=5eb3e44ccbd3184b040e08c5'
 * 
 * @apiParamExample {json} response-example
 * 
 * {
 *      "success": true,
 *      "error": false,
 *      "message": "Bookmark deleted",
 *      "data": {
 *        "bookmarks": {
 *           "tags": [],
 *           "_id": "5eb3e44ccbd3184b040e08c5",
 *           "link": "http://localhost",
 *           "title": "someRandomTitle",
 *           "publisher": "someRandomPublisher",
 *           "createdAt": "2020-05-07T10:34:52.490Z",
 *           "updatedAt": "2020-05-07T10:34:52.491Z",
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
      "bookmarks": data
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
 * @api {delete} /api/v1/bookmark delete all bookmarks
 * @apiVersion 1.0.0
 * @apiName delete all bookmarks
 * @apiGroup bookmark
 * @apiPermission all
 * 
 * @apiParamExample {String} request-example
 * 
 * curl --request DELETE http://<domain:port>/api/v1/bookmark
 * 
 * @apiParamExample {json} response-example
 * 
 * {
 *      "success": true,
 *      "error": false,
 *      "message": "Bookmarks deleted",
 *      "data": {
  *        "bookmarks": {
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
 * @api {put} /api/v1/bookmark/tag add tag to bookmark
 * @apiVersion 1.0.0
 * @apiName add tag to bookmark
 * @apiGroup bookmark
 * @apiPermission all
 * 
 * @apiParam {String} id Bookmark ID
 * @apiParam {String} title Tag Title
 * 
 * @apiParamExample {String} request-example
 * 
 * curl --request PUT http://<domain:port>/api/v1/bookmark/tag \
 *  --data-urlencode 'id=6f8b44b749c80311234883b2' \
 *  --data-urlencode 'title=someRandomTagTitle'
 * 
 * @apiParamExample {json} response-example
 * 
 * {
 *      "success": true,
 *      "error": false,
 *      "message": "Bookmark updated",
 *      "data": {
 *        "bookmarks": {
 *           "tags": [
 *             "someRandomTagTitle"
 *           ],
 *           "_id": "5eb3ea9fb901e715145808f5",
 *           "link": "http://localhost",
 *           "title": "someRandomTitle",
 *           "publisher": "someRandomPublisher",
 *           "createdAt": "2020-05-07T11:01:51.675Z",
 *           "updatedAt": "2020-05-07T11:01:51.676Z",
 *           "__v": 0
 *        }
 *      }
 * }
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
          .status(403)
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
 * @api {put} /api/v1/bookmark/tag remove tag from bookmark
 * @apiVersion 1.0.0
 * @apiName remove tag from bookmark
 * @apiGroup bookmark
 * @apiPermission all
 * 
 * @apiParam {String} id Bookmark ID
 * @apiParam {String} title Tag Title
 * 
 * @apiParamExample {String} request-example
 * 
 * curl --request DELETE http://<domain:port>/api/v1/bookmark/tag \
 *  --data-urlencode 'id=6f8b44b749c80311234883b2' \
 *  --data-urlencode 'title=someRandomTagTitle'
 * 
 * @apiParamExample {json} response-example
 * 
 * {
 *      "success": true,
 *      "error": false,
 *      "message": "Bookmark updated",
 *      "data": {
 *        "bookmarks": {
 *           "tags": [
 *             "someAlreadyExisitingRandomTagTitle"
 *           ],
 *           "_id": "5eb3ea9fb901e715145808f5",
 *           "link": "http://localhost",
 *           "title": "someRandomTitle",
 *           "publisher": "someRandomPublisher",
 *           "createdAt": "2020-05-07T11:01:51.675Z",
 *           "updatedAt": "2020-05-07T11:01:51.676Z",
 *           "__v": 0
 *        }
 *      }
 * }
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
          .status(404)
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