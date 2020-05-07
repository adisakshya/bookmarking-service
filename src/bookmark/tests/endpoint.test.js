const request = require('supertest')
const app = require('../app')

/**
 * Setup Database
 */
const setupDB = require('../test-setup/setup');
setupDB();

describe('Ping the server', () => {

    it('should ping the server', async () => {
        const res = await request(app)
            .get('/api/v1/ping');
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Pong');
    });
  
});

describe('Verify connection with database', () => {

    it('should check if connection with database is ready', async () => {
        const res = await request(app)
            .get('/api/v1/ping/db');
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Connection with database is successfully established');
    });

});

describe('Failing to create a new tag because of insufficient parameter supplied', () => {

    it('do not insert due to insufficient parameter: title', async () => {
        const res = await request(app)
            .post('/api/v1/tag')
            .send({});
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Insufficient parameters');
    });

});

describe('Failing to create a new bookmark because of insufficient parameter supplied', () => {

    it('do not insert due to insufficient parameter: link', async () => {
        const res = await request(app)
            .post('/api/v1/bookmark')
            .send({
                "title": "someRandomTitle",
                "publisher": "someRandomPublisher"
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Insufficient parameters');
    });

    it('do not insert due to insufficient parameter: title', async () => {
        const res = await request(app)
            .post('/api/v1/bookmark')
            .send({
                "link": "https://example.com/acoustics.aspx?brass=act&afterthought=baby",
                "publisher": "someRandomPublisher"
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Insufficient parameters');
    });

    it('do not insert due to insufficient parameter: publisher', async () => {
        const res = await request(app)
            .post('/api/v1/bookmark')
            .send({
                "link": "http://localhost",
                "title": "someRandomTitle"
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Insufficient parameters');
    });

    it('do not insert due to insufficient parameters: link and title', async () => {
        const res = await request(app)
            .post('/api/v1/bookmark')
            .send({
                "publisher": "someRandomPublisher"
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Insufficient parameters');
    });

    it('do not insert due to insufficient parameters: title and publisher', async () => {
        const res = await request(app)
            .post('/api/v1/bookmark')
            .send({
                "link": "http://localhost"
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Insufficient parameters');
    });

    it('do not insert due to insufficient parameters: link and publisher', async () => {
        const res = await request(app)
            .post('/api/v1/bookmark')
            .send({
                "title": "someRandomTitle"
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Insufficient parameters');
    });

    it('do not insert due to no parameters supplied', async () => {
        const res = await request(app)
            .post('/api/v1/bookmark')
            .send({});
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Insufficient parameters');
    });

});

describe('Failing to create a new bookmark because of invalid link parameter supplied', () => {

    it('do not insert due to invalid parameter: link', async () => {
        const res = await request(app)
            .post('/api/v1/bookmark')
            .send({
                "title": "someRandomTitle",
                "link": "localhost",
                "publisher": "someRandomPublisher"
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Invalid Link');
    });

});

describe('Failing to create a new tag because of duplicate parameters', () => {

    it('do not insert due to duplicate parameter: title', async () => {
        const res1 = await request(app)
            .post('/api/v1/tag')
            .send({
                "title": "This is a tag title"
            });
        const res = await request(app)
            .post('/api/v1/tag')
            .send({
                "title": "This is a tag title"
            });
        expect(res.statusCode).toEqual(409);
        expect(res.body.message).toEqual('Tag already exists');
    });

});

describe('Failing to create a new bookmark because of duplicate parameters', () => {

    it('do not insert due to duplicate parameter: link', async () => {
        const res1 = await request(app)
            .post('/api/v1/bookmark')
            .send({
                "title": "someRandomTitle",
                "link": "http://localhost",
                "publisher": "someRandomPublisher"
            });
        const res = await request(app)
            .post('/api/v1/bookmark')
            .send({
                "title": "someAnotherRandomTitle",
                "link": "http://localhost",
                "publisher": "someAnotherRandomPublisher"
            });
        expect(res.statusCode).toEqual(409);
        expect(res.body.message).toEqual('Bookmark already exists');
    });

    it('do not insert due to duplicate parameter: title', async () => {
        const res1 = await request(app)
            .post('/api/v1/bookmark')
            .send({
                "title": "someRandomTitle",
                "link": "http://localhost",
                "publisher": "someRandomPublisher"
            });
        const res = await request(app)
            .post('/api/v1/bookmark')
            .send({
                "title": "someRandomTitle",
                "link": "http://localhosta",
                "publisher": "someAnotherRandomPublisher"
            });
        expect(res.statusCode).toEqual(409);
        expect(res.body.message).toEqual('Bookmark already exists');
    });

});

describe('Create a new tag', () => {

    it('should insert a new tag', async () => {
        const res = await request(app)
            .post('/api/v1/tag')
            .send({
                "title": "someRandomTagTitle",
            });
        expect(res.statusCode).toEqual(200);
    });

});

describe('Create a new bookmark', () => {

    it('should insert a new bookmark', async () => {
        const res = await request(app)
            .post('/api/v1/bookmark')
            .send({
                "title": "someRandomTitle",
                "link": "http://localhost",
                "publisher": "someRandomPublisher"
            });
        expect(res.statusCode).toEqual(200);
    });

});

describe('Failing to get tag information because insufficient parameter supplied', () => {

    it('should not get information due to insufficient parameter: ID', async () => {
        const res = await request(app)
            .get('/api/v1/tag/item')
            .query({});
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual("Insufficient parameters");
    });

});

describe('Failing to get bookmark information because insufficient parameter supplied', () => {

    it('should not get information due to insufficient parameter: ID', async () => {
        const res = await request(app)
            .get('/api/v1/bookmark/item')
            .query({});
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual("Insufficient parameters");
    });

});

describe('Failing to get tag information because invalid parameter supplied', () => {

    it('should not get information due to invalid parameter: ID', async () => {
        const res = await request(app)
            .get('/api/v1/tag/item')
            .query({
                "id": "thisIsAnInvalidId"
            });
        expect(res.statusCode).toEqual(500);
    });

});

describe('Failing to get bookmark information because invalid parameter supplied', () => {

    it('should not get information due to invalid parameter: ID', async () => {
        const res = await request(app)
            .get('/api/v1/bookmark/item')
            .query({
                "id": "thisIsAnInvalidId"
            });
        expect(res.statusCode).toEqual(500);
    });

});

describe('Get tag information', () => {

    it('should get information about a tag', async () => {
        const res1 = await request(app)
            .post('/api/v1/tag')
            .send({
                "title": "someRandomTagTitle"
            });
        expect(res1.statusCode).toEqual(200);
        const res = await request(app)
            .get('/api/v1/tag/item')
            .query({
                "id": res1.body.data.tags._id
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.tags._id).toEqual(res1.body.data.tags._id);
    });

});

describe('Get bookmark information', () => {

    it('should get information about a bookmark', async () => {
        const res1 = await request(app)
            .post('/api/v1/bookmark')
            .send({
                "title": "someRandomTitle",
                "link": "http://localhost",
                "publisher": "someRandomPublisher"
            });
        expect(res1.statusCode).toEqual(200);
        const res = await request(app)
            .get('/api/v1/bookmark/item')
            .query({
                "id": res1.body.data.bookmarks._id
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.bookmarks._id).toEqual(res1.body.data.bookmarks._id);
    });

});

describe('Get all tags information', () => {
    
    it('should get information about 2 tags', async () => {
        const res1 = await request(app)
            .post('/api/v1/tag')
            .send({
                "title": "someRandomtagTitle"
            });
        expect(res1.statusCode).toEqual(200);
        const res2 = await request(app)
            .post('/api/v1/tag')
            .send({
                "title": "someAnotherRandomtagTitle"
            });
        expect(res2.statusCode).toEqual(200);
        const res = await request(app)
            .get('/api/v1/tag');
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.tags.length).toEqual(2);
    });

});

describe('Get all bookmarks information', () => {
    
    it('should get information about 2 bookmarks', async () => {
        const res1 = await request(app)
            .post('/api/v1/bookmark')
            .send({
                "title": "someRandomTitle",
                "link": "http://localhost",
                "publisher": "someRandomPublisher"
            });
        expect(res1.statusCode).toEqual(200);
        const res2 = await request(app)
            .post('/api/v1/bookmark')
            .send({
                "title": "someAnotherRandomTitle",
                "link": "http://localhosta",
                "publisher": "someRandomPublisher"
            });
        expect(res2.statusCode).toEqual(200);
        const res = await request(app)
            .get('/api/v1/bookmark');
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.bookmarks.length).toEqual(2);
    });

});

describe('Get request on empty tag collection', () => {
    
    it('should return no item found', async () => {
        const res = await request(app)
            .get('/api/v1/tags');
        expect(res.statusCode).toEqual(404);
    });
    
});

describe('Get request on empty bookmark collection', () => {
    
    it('should return no item found', async () => {
        const res = await request(app)
            .get('/api/v1/bookmark');
        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toEqual('No bookmarks found');
    });
    
});

describe('Failing to delete tag because insufficient parameter supplied', () => {

    it('should not delete tag due to insufficient parameter: ID', async () => {
        const res = await request(app)
            .delete('/api/v1/tag/item')
            .send({});
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual("Insufficient parameters");
    });

});

describe('Failing to delete bookmark because insufficient parameter supplied', () => {

    it('should not delete tag due to insufficient parameter: ID', async () => {
        const res = await request(app)
            .delete('/api/v1/bookmark/item')
            .send({});
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual("Insufficient parameters");
    });

});

describe('Failing to delete tag because invalid parameter supplied', () => {

    it('should return item not found', async () => {
        const res = await request(app)
            .delete('/api/v1/tag/item')
            .send({
                "id": "thisIsAnInvalidId"
            });
        expect(res.statusCode).toEqual(500);
    });

});

describe('Failing to delete bookmark because invalid parameter supplied', () => {

    it('should return item not found', async () => {
        const res = await request(app)
            .delete('/api/v1/bookmark/item')
            .send({
                "id": "thisIsAnInvalidId"
            });
        expect(res.statusCode).toEqual(500);
    });

});

describe('Delete all tags', () => {

    it('should delete all tags', async () => {
        const res1 = await request(app)
            .post('/api/v1/tag')
            .send({
                "title": "someRandomTagTitle"
            });
        expect(res1.statusCode).toEqual(200);
        const res2 = await request(app)
            .post('/api/v1/tag')
            .send({
                "title": "someAnotherRandomTagTitle"
            });
        expect(res2.statusCode).toEqual(200);
        const res = await request(app)
            .delete('/api/v1/tag');
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.tags.deletedCount).toEqual(2);
        expect(res.body.data.tags.ok).toEqual(1);
    });

});

describe('Delete all bookmarks', () => {

    it('should delete all bookmarks', async () => {
        const res1 = await request(app)
            .post('/api/v1/bookmark')
            .send({
                "title": "someRandomTitle",
                "link": "http://localhost",
                "publisher": "someRandomPublisher"
            });
        expect(res1.statusCode).toEqual(200);
        const res2 = await request(app)
            .post('/api/v1/bookmark')
            .send({
                "title": "someAnotherRandomTitle",
                "link": "http://localhosta",
                "publisher": "someRandomPublisher"
            });
        expect(res2.statusCode).toEqual(200);
        const res = await request(app)
            .delete('/api/v1/bookmark');
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.bookmarks.deletedCount).toEqual(2);
        expect(res.body.data.bookmarks.ok).toEqual(1);
    });

});

describe('Delete request on empty tag collection', () => {
    
    it('should return no tags found', async () => {
        const res = await request(app)
            .delete('/api/v1/tag');
        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toEqual('No tags found');
    });
    
});

describe('Delete request on empty bookmarks collection', () => {
    
    it('should return no items found', async () => {
        const res = await request(app)
            .delete('/api/v1/bookmark');
        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toEqual('No bookmarks found');
    });
    
});