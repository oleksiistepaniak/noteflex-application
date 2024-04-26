const t = require("../../test.helper");
const request = require('supertest');
const should = require('should');

describe('delete.note.by.id.test', () => {
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
            .delete('/api/notes/1')
            .expect(401);

        should(response.body).deepEqual({
            message: 'token_not_provided',
        });
        should(response.status).deepEqual(401);
    });

    it('invalid token (auth)', async () => {
        const response = await request(app)
            .delete('/api/notes/1')
            .set('Authorization', 'invalid_token')
            .expect(401);

        should(response.body).deepEqual({
            message: 'invalid_token',
        });
        should(response.status).deepEqual(401);
    });

    it('id is not a number', async () => {
        const response = await request(app)
            .delete('/api/notes/true')
            .set('Authorization', token)
            .expect(400);

        should(response.body).deepEqual({
            message: 'note_id_not_number',
        });
        should(response.status).deepEqual(400);
    });

    it('note is not owned', async () => {
        const response = await request(app)
            .delete('/api/notes/1')
            .set('Authorization', token)
            .expect(400);

        should(response.body).deepEqual({
            message: 'note_is_not_owned',
        });
        should(response.status).deepEqual(400);
    });

    it('success', async () => {
        await t.setValidNotes();
        const response = await request(app)
            .delete('/api/notes/1')
            .set('Authorization', token)
            .expect(200);

        should(response.body).deepEqual({
            ...t.validNotes[0],
            userId: 1,
            id: 1,
        });
        should(response.status).deepEqual(200);
    });
});
