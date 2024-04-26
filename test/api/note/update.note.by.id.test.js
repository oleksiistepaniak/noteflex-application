const t = require("../../test.helper");
const request = require('supertest');
const should = require('should');
const constants = require('../../../src/constants');

describe('update.note.by.id.test', () => {
    let app;
    let token

    beforeEach(async () => {
        app = t.init();
        await t.initDb();
        await t.setValidUsers();
        token = await t.getValidToken();
    });

    afterEach(async () => {
        t.dispose();
        await t.clearDb();
    });

    it('token not provided (auth)', async () => {
       const response = await request(app)
           .put('/api/notes/1')
           .expect(401);

       should(response.body).deepEqual({
           message: 'token_not_provided',
       });
       should(response.status).deepEqual(401);
    });

    it('invalid token (auth)', async () => {
       const response = await request(app)
           .put('/api/notes/1')
           .set('Authorization', 'invalid_token')
           .expect(401);

       should(response.body).deepEqual({
           message: 'invalid_token',
       });
       should(response.status).deepEqual(401);
    });

    it('id is not a number', async () => {
        const response = await request(app)
            .put('/api/notes/true')
            .send({
                ...t.validNote,
            })
            .set('Authorization', token)
            .expect(400);

        should(response.body).deepEqual({
            message: 'note_id_not_number',
        });
        should(response.status).deepEqual(400);
    });

    it('empty request body', async () => {
        const response = await request(app)
            .put('/api/notes/true')
            .set('Authorization', token)
            .expect(400);

        should(response.body).deepEqual({
            message: 'empty_request_body',
        });
        should(response.status).deepEqual(400);
    });

    it('title not string', async () => {
        const response = await request(app)
            .put('/api/notes/1')
            .set('Authorization', token)
            .send({
                title: true,
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'title_not_string',
        });
        should(response.status).deepEqual(400);
    });

    it('empty title', async () => {
        const response = await request(app)
            .put('/api/notes/1')
            .set('Authorization', token)
            .send({
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
            .put('/api/notes/1')
            .set('Authorization', token)
            .send({
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
            .put('/api/notes/1')
            .set('Authorization', token)
            .send({
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
            .put('/api/notes/1')
            .set('Authorization', token)
            .send({
                text: true,
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'text_not_string',
        });
        should(response.status).deepEqual(400);
    });

    it('empty text', async () => {
        const response = await request(app)
            .put('/api/notes/1')
            .set('Authorization', token)
            .send({
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
            .put('/api/notes/1')
            .set('Authorization', token)
            .send({
                text,
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'invalid_text_length',
        });
        should(response.status).deepEqual(400);
    });

    it('note is not owned', async () => {
        const response = await request(app)
            .put('/api/notes/1')
            .set('Authorization', token)
            .send({
                ...t.validNote,
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'note_is_not_owned',
        });
        should(response.status).deepEqual(400);
    });

    it('success with only title', async () => {
        await t.setValidNotes();
        const title = 'a'.repeat(constants.NOTE.MIN_TITLE_LENGTH);
        const response = await request(app)
            .put('/api/notes/1')
            .set('Authorization', token)
            .send({ title })
            .expect(200);

        should(response.body).deepEqual({
            ...t.validNotes[0],
            userId: 1,
            id: 1,
            title,
        });
        should(response.status).deepEqual(200);
    });

    it('success with only text', async () => {
        await t.setValidNotes();
        const text = 'a'.repeat(constants.NOTE.MIN_TEXT_LENGTH);
        const response = await request(app)
            .put('/api/notes/1')
            .set('Authorization', token)
            .send({ text })
            .expect(200);

        should(response.body).deepEqual({
            ...t.validNotes[0],
            userId: 1,
            id: 1,
            text,
        });
        should(response.status).deepEqual(200);
    });

    it('success with all fields', async () => {
        await t.setValidNotes();
        const title = 'a'.repeat(constants.NOTE.MIN_TITLE_LENGTH);
        const text = 'a'.repeat(constants.NOTE.MIN_TEXT_LENGTH);
        const response = await request(app)
            .put('/api/notes/1')
            .set('Authorization', token)
            .send({ text, title })
            .expect(200);

        should(response.body).deepEqual({
            ...t.validNotes[0],
            userId: 1,
            id: 1,
            text,
            title,
        });
        should(response.status).deepEqual(200);
    });
});
