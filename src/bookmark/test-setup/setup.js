/**
 * Database Connection Management
 */
const mongoose = require('mongoose');

/**
 * Database Setup
 */
module.exports = setupDB = () => {

    // Connect to MongoDB
    beforeAll(async () => {

        // Get connection url
        const config = require('../config/config');
        const url = config.mongoURI;
        
        // Connect to mongodb
        await mongoose.connect(url, { 
            keepAlive: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        // Check if connection was established successfully
        expect(mongoose.connection.readyState).toEqual(1);

    });

    // Clear test collection
    afterEach(async() => {

        // Empty the test collection
        await mongoose.connection.collections['testtags'].deleteMany({});
        await mongoose.connection.collections['testbookmarks'].deleteMany({});

    });

    // Disconnect Mongoose
    afterAll(async () => {

        // Remove test collection
        mongoose.connection.collections['testtags'].drop(function(err) {
            console.log('Test tags collection dropped');
        });
        mongoose.connection.collections['testbookmarks'].drop(function(err) {
            console.log('Test bookmarks collection dropped');
        });

        // Close connection
        await mongoose.connection.dropDatabase()
        await mongoose.connection.close();
        
        //Check if connection was closed successfully
        expect(mongoose.connection.readyState).toEqual(0);
        
    });

}