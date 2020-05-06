const express = require('express');
const router = express.Router();

/**
 * Tag Controller
 */
const tagController = require('../controllers/tag/controller');

/**
 * Index Route
 */
router.route('/')
  /**
   * GET all tags
   */
  .get(tagController.getAllItems)
  
  /**
   * POST new tag 
   */
  .post(tagController.createNewItem)

  /**
   * DELETE all tags
   */
  .delete(tagController.deleteAll);

/**
 * Item Route
 */
router.route('/item')
  /**
   * GET tag by ID
   */
  .get(tagController.getByID)

  /**
   * DELETE tag by ID
   */
  .delete(tagController.deleteByID);

module.exports = router;
