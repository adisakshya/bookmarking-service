/**
 * Interface - Database Connection Test
 */

/**
 * Check if connection with database if established
 */
const _checkDB = async() => {
    // Load database connection test
    const dbTest = require('../db/db').connectionTest;
  
    // RETURN connection test result
    return dbTest();
};

exports.checkDB = _checkDB;