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
   * GET all items
   */
  .get(tagController.getAllItems)
  
  /**
   * POST new item 
   */
  .post(tagController.createNewItem)

  /**
   * DELETE all items
   */
  .delete(tagController.deleteAll);

/**
 * Item Route
 */
router.route('/item')
  /**
   * GET item by ID
   */
  .get(tagController.getByID)

  /**
   * DELETE item by ID
   */
  .delete(tagController.deleteByID);

module.exports = router;
