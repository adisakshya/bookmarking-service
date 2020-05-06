const express = require('express');
const router = express.Router();

/**
 * Import controller
 */
const pingController = require('../controllers/ping/controller');

/**
 * Ping Route
 */
router.route('/')
  .get(pingController.ping)
  .post(pingController.ping);

/**
 * Database Connection Test Route
 */
router.route('/db')
  /**
   * CHECK connection with database
   */
  .get(pingController.checkDBConnection);

module.exports = router;
