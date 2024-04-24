const t = require("../../test.helper");
const request = require('supertest');
const should = require('should');

describe('find.all.completed.tasks.test', () => {
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
            .get('/api/tasks/completed')
            .expect(401);

        should(response.body).deepEqual({
            message: 'token_not_provided',
        });
        should(response.status).deepEqual(401);
    });

    it('invalid token (auth)', async () => {
        const response = await request(app)
            .get('/api/tasks/completed')
            .set('Authorization', 'invalid_token')
            .expect(401);

        should(response.body).deepEqual({
            message: 'invalid_token',
        });
        should(response.status).deepEqual(401);
    });

    it('completed tasks not found', async () => {
        const response = await request(app)
            .get('/api/tasks/completed')
            .set('Authorization', token)
            .expect(200);

        should(response.body).deepEqual([]);
        should(response.status).deepEqual(200);
    });

    it('success', async () => {
        await t.setValidTasks();
        const response = await request(app)
            .get('/api/tasks/completed')
            .set('Authorization', token)
            .expect(200);

        should(response.body).deepEqual([
            {
                id: 2,
                title: 'Math Homework',
                description: 'Exercise 2, 3 Page 12',
                isCompleted: true,
                userId: 1,
            },
            {
                id: 3,
                title: 'Walking with Tom',
                description: 'tomorrow at 8 o\'clock',
                isCompleted: true,
                userId: 1,
            }
        ]);
        should(response.status).deepEqual(200);
    });

    it('success by title', async () => {
       const title = t.validTasks[t.validTasks.length - 1].title.substring(0, 3);
       const response = await request(app)
           .get(`/api/tasks/completed?title=${title}`)
           .set('Authorization', token)
           .expect(200);

       should(response.body).deepEqual([
           {
               id: 3,
               title: 'Walking with Tom',
               description: 'tomorrow at 8 o\'clock',
               isCompleted: true,
               userId: 1,
           },
       ]);
       should(response.status).deepEqual(200);
    });
});
