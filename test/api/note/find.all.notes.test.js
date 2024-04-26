const t = require("../../test.helper");
const request = require('supertest');
const should = require('should');

describe('find.all.notes.test', () => {
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
            .get('/api/notes')
            .expect(401);

        should(response.body).deepEqual({
            message: 'token_not_provided',
        });
        should(response.status).deepEqual(401);
    });

    it('invalid token (auth)', async () => {
        const response = await request(app)
            .get('/api/notes')
            .set('Authorization', 'invalid_token')
            .expect(401);

        should(response.body).deepEqual({
            message: 'invalid_token',
        });
        should(response.status).deepEqual(401);
    });

    it('notes no found', async () => {
        const response = await request(app)
            .get('/api/notes')
            .set('Authorization', token)
            .expect(200);

        should(response.body).deepEqual([]);
        should(response.status).deepEqual(200);
    });

    it('success', async () => {
        await t.setValidNote();
        const response = await request(app)
            .get('/api/notes')
            .set('Authorization', token)
            .expect(200);

        should(response.body).deepEqual([
            {
                ...t.validNote,
                userId: 1,
                id: 1,
            }
        ]);
        should(response.status).deepEqual(200);
    });

    it('success by title', async () => {
        const title = t.validNote.title.substring(1, t.validNote.title.length - 1);
        const response = await request(app)
            .get(`/api/notes?title=${title}`)
            .set('Authorization', token)
            .expect(200);

        should(response.body).deepEqual([
            {
                ...t.validNote,
                userId: 1,
                id: 1,
            }
        ]);
        should(response.status).deepEqual(200);
    });
});
