const t = require("../../test.helper");
const request = require('supertest');
const should = require('should');
const constants = require('../../../src/constants');

describe('create.note.test', () => {
    let app;
    let token

    before(async () => {
        app = t.init();
        await t.initDb();
        await t.setValidUser();
        token = await t.getValidToken();
    });

    after(async () => {
        t.dispose();
        await t.clearDb();
    });

    it('token not provided (auth)', async () => {
       const response = await request(app)
           .post('/api/notes')
           .expect(401);

       should(response.body).deepEqual({
           message: 'token_not_provided',
       });
       should(response.status).deepEqual(401);
    });
});