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
   * GET all bookmarks
   */
  .get(bookmarkController.getAllItems)
  
  /**
   * POST new bookmark 
   */
  .post(bookmarkController.createNewItem)

  /**
   * DELETE all bookmarks
   */
  .delete(bookmarkController.deleteAll);

/**
 * Item Route
 */
router.route('/item')
  /**
   * GET bookmark by ID
   */
  .get(bookmarkController.getByID)

  /**
   * DELETE bookmark by ID
   */
  .delete(bookmarkController.deleteByID);

/**
 * Tag Route
 */
router.route('/tag/add')
  /**
   * Add tag to bookmark
   */
  .post(bookmarkController.addTag)
  
  /**
   * Remove tag from bookmark
   */
  .delete(bookmarkController.removeTag);

module.exports = router;
