const t = require("../../test.helper");
const request = require('supertest');
const should = require('should');

describe('find.all.active.tasks.test', () => {
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
            .get('/api/tasks/active')
            .expect(401);

        should(response.body).deepEqual({
            message: 'token_not_provided',
        });
        should(response.status).deepEqual(401);
    });

    it('invalid token (auth)', async () => {
        const response = await request(app)
            .get('/api/tasks/active')
            .set('Authorization', 'invalid_token')
            .expect(401);

        should(response.body).deepEqual({
            message: 'invalid_token',
        });
        should(response.status).deepEqual(401);
    });

    it('active tasks no found', async () => {
        const response = await request(app)
            .get('/api/tasks/active')
            .set('Authorization', token)
            .expect(200);

        should(response.body).deepEqual([]);
        should(response.status).deepEqual(200);
    });

    it('success', async () => {
        await t.setValidTasks();
        const response = await request(app)
            .get('/api/tasks/active')
            .set('Authorization', token)
            .expect(200);

        should(response.body).deepEqual([
            {
                id: 1,
                title: 'English Homework',
                description: 'Exercise 2 Page 132',
                isCompleted: false,
                userId: 1,
            },
        ]);
        should(response.status).deepEqual(200);
    });

    it('success by title', async () => {
        const title = t.validTasks[0].title.substring(0, 3);
        const response = await request(app)
            .get(`/api/tasks/active?title=${title}`)
            .set('Authorization', token)
            .expect(200);

        should(response.body).deepEqual([
            {
                id: 1,
                title: 'English Homework',
                description: 'Exercise 2 Page 132',
                isCompleted: false,
                userId: 1,
            },
        ]);
        should(response.status).deepEqual(200);
    });
});
