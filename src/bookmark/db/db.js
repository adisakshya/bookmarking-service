/**
 * Establish connection
 * with MongoDB Atlas Cluster
 * using connection string
 */

const mongoose = require("mongoose");

/**
 * Get connection string
 */
const config = require("../config/config.json");
const dbURI = config.mongoURI;

/**
 * Connection Options
 */
const connectOptions = {
  keepAlive: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

mongoose.Promise = global.Promise;

/**
 * Connect to DB
 */
const connect = async() => {
  mongoose.connect(dbURI, connectOptions, (err, db) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('>', 'Connected to MongoDB');
    }
  });
};

/**
 * Check if connection is established
 * readyState values:
 * 0: Disconnected
 * 1: Connected
 * 2: Connecting
 * 3: Disconnecting
 * 4: Authentication Failed
 */
const connectionTest = async() => {
  return mongoose.connection.readyState;
};

exports.connectionTest = connectionTest;
exports.connect = connect;