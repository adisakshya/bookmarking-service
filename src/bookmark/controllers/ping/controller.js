/**
 * Ping Controller
 */

/**
 * Require Database Connection Test Utility
 */
const dbController = require('../../lib/checkDBConnection');

/**
 * @api {get} /api/v1/ping ping the server
 * @apiVersion 1.0.0
 * @apiName ping the server
 * @apiGroup ping
 * @apiPermission all
 * 
 * @apiParamExample {String} request-example
 * 
 * curl --request GET http://<domain:port>/api/v1/ping
 * 
 * @apiParamExample {json} response-example
 * 
 * {
 *      "message": "Pong",
 * }
 */
const _ping = async (req, res) => {

    return res
        .status(200)
        .json({
            "message": "Pong"
        });

}

/**
 * @api {get} /api/v1/ping/db check connection with database
 * @apiVersion 1.0.0
 * @apiName check connection with database
 * @apiGroup ping
 * @apiPermission admin
 * 
 * @apiParamExample {String} request-example
 * 
 * curl --request GET http://<domain:port>/api/v1/ping/db
 * 
 * @apiParamExample {json} response-example
 * 
 * {
 *      "success": true,
 *      "error": false,
 *      "message": "Connection with database is successfully established",
 *      "data": null
 * }
 */
const _checkDBConnection = async (req, res) => {

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

exports.ping = _ping;
exports.checkDBConnection = _checkDBConnection;