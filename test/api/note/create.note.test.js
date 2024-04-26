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

    it('invalid token (auth)', async () => {
       const response = await request(app)
           .post('/api/notes')
           .set('Authorization', 'invalid_token')
           .expect(401);

       should(response.body).deepEqual({
           message: 'invalid_token',
       });
       should(response.status).deepEqual(401);
    });

    it('empty request body', async () => {
       const response = await request(app)
           .post('/api/notes')
           .set('Authorization', token)
           .expect(400);

       should(response.body).deepEqual({
           message: 'empty_request_body',
       });
       should(response.status).deepEqual(400);
    });

    it('title not string', async () => {
        const response = await request(app)
            .post('/api/notes')
            .set('Authorization', token)
            .send({
                ...t.validNote,
                title: null,
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'title_not_string',
        });
        should(response.status).deepEqual(400);
    });

    it('empty title', async () => {
       const response = await request(app)
           .post('/api/notes')
           .set('Authorization', token)
           .send({
               ...t.validNote,
               title: '',
           })
           .expect(400);

       should(response.body).deepEqual({
           message: 'title_not_string',
       });
       should(response.status).deepEqual(400);
    });

    it('title length less than min required symbols', async () => {
       const title = 'a'.repeat(constants.NOTE.MIN_TITLE_LENGTH - 1);
       const response = await request(app)
           .post('/api/notes')
           .set('Authorization', token)
           .send({
               ...t.validNote,
               title,
           })
           .expect(400);

       should(response.body).deepEqual({
           message: 'invalid_title_length',
       });
       should(response.status).deepEqual(400);
    });

    it('title length more than max required symbols', async () => {
       const title = 'a'.repeat(constants.NOTE.MAX_TITLE_LENGTH + 1);
       const response = await request(app)
           .post('/api/notes')
           .set('Authorization', token)
           .send({
               ...t.validNote,
               title,
           })
           .expect(400);

       should(response.body).deepEqual({
           message: 'invalid_title_length',
       });
       should(response.status).deepEqual(400);
    });

    it('text not string', async () => {
       const response = await request(app)
           .post('/api/notes')
           .set('Authorization', token)
           .send({
               ...t.validNote,
               text: null,
           })
           .expect(400);

       should(response.body).deepEqual({
           message: 'text_not_string',
       });
       should(response.status).deepEqual(400);
    });

    it('empty text', async () => {
        const response = await request(app)
            .post('/api/notes')
            .set('Authorization', token)
            .send({
                ...t.validNote,
                text: '',
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'text_not_string',
        });
        should(response.status).deepEqual(400);
    });

    it('text length less than min required symbols', async () => {
        const text = 'a'.repeat(constants.NOTE.MIN_TEXT_LENGTH - 1);
        const response = await request(app)
            .post('/api/notes')
            .set('Authorization', token)
            .send({
                ...t.validNote,
                text,
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'invalid_text_length',
        });
        should(response.status).deepEqual(400);
    });

    it('success', async () => {
       const response = await request(app)
           .post('/api/notes')
           .set('Authorization', token)
           .send({...t.validNote})
           .expect(200);

       should(response.body).deepEqual({
           ...t.validNote,
           id: 1,
           userId: 1,
       });
       should(response.status).deepEqual(200);
    });
});
