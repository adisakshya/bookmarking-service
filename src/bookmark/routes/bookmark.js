const express = require('express');
const router = express.Router();

/**
 * Bookmark Controller
 */
const bookmarkController = require('../controllers/bookmark/controller');

/**
 * Index Route
 */
router.route('/')
  /**
   * GET all items
   */
  .get(bookmarkController.getAllItems)
  
  /**
   * POST new item 
   */
  .post(bookmarkController.createNewItem)

  /**
   * DELETE all items
   */
  .delete(bookmarkController.deleteAll);

/**
 * Item Route
 */
router.route('/item')
  /**
   * GET item by ID
   */
  .get(bookmarkController.getByID)

  /**
   * DELETE item by ID
   */
  .delete(bookmarkController.deleteByID);

/**
 * Tag Route
 */
router.route('/tag/add')
  /**
   * Add tag
   */
  .post(bookmarkController.addTag)
  
  /**
   * Remove tag
   */
  .delete(bookmarkController.removeTag);

/**
 * Database Connection Test Route
 */
router.route('/db/connection/test')
  /**
   * CHECK connection with database
   */
  .get(bookmarkController.checkDBConnection);

module.exports = router;
