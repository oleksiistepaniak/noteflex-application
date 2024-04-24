const t = require("../../test.helper");
const request = require('supertest');
const should = require('should');

describe('find.all.tasks.test', () => {
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
            .get('/api/tasks')
            .expect(401);

        should(response.body).deepEqual({
            message: 'token_not_provided',
        })
        should(response.status).deepEqual(401);
    });

    it('invalid token (auth)', async () => {
       const response = await request(app)
           .get('/api/tasks')
           .set('Authorization', 'invalid_token')
           .expect(401);

       should(response.body).deepEqual({
           message: 'invalid_token',
       });
       should(response.status).deepEqual(401);
    });

    it('tasks no found', async () => {
       const response = await request(app)
           .get('/api/tasks')
           .set('Authorization', token)
           .expect('Content-Type', /json/)
           .expect(200);

       should(response.body).deepEqual([]);
       should(response.status).deepEqual(200);
    });

    it('success', async () => {
        await t.setValidTask();
        const response = await request(app)
            .get('/api/tasks')
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200);

        should(response.body).deepEqual([
            {
                ...t.validTask,
                id: 1,
                userId: 1,
            }
        ]);
        should(response.status).deepEqual(200);
    });

    it('success by title', async () => {
        const title = t.validTask.title.substring(0, 3);
        const response = await request(app)
            .get(`/api/tasks?title=${title}`)
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200);

        should(response.body).deepEqual([
            {
                ...t.validTask,
                id: 1,
                userId: 1,
            }
        ]);
        should(response.status).deepEqual(200);
    });
});
