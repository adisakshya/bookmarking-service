/**
 * Ping Controller
 */

/**
 * Require Database Connection Test Utility
 */
const dbController = require('../../lib/checkDBConnection');

/**
 * Handle Ping request
 * @param {object} req 
 * @param {object} res 
 */
const _ping = async (req, res) => {

    return res
      .status(200)
      .json({
          "message": "Pong"
      });

}

/**
 * Check Connection with Database
 * @param {object} req 
 * @param {object} res 
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