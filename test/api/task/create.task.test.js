const t = require("../../test.helper");
const request = require('supertest');
const should = require('should');
const constants = require('../../../src/constants');

describe('create.task.test', () => {
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
            .post('/api/tasks')
            .expect(401);

        should(response.body).deepEqual({
            message: 'token_not_provided',
        });
        should(response.status).deepEqual(401);
    });

    it('invalid token (auth)', async () => {
       const response = await request(app)
           .post('/api/tasks')
           .set('Authorization', 'invalid_token')
           .expect(401);

       should(response.body).deepEqual({
           message: 'invalid_token',
       });
       should(response.status).deepEqual(401);
    });

    it('empty request body', async () => {
       const response = await request(app)
           .post('/api/tasks')
           .set('Authorization', token)
           .expect(400);

       should(response.body).deepEqual({
           message: 'empty_request_body',
       });
       should(response.status).deepEqual(400);
    });

    it('title not string', async () => {
        const response = await request(app)
            .post('/api/tasks')
            .set('Authorization', token)
            .send({
                ...t.validTask,
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
            .post('/api/tasks')
            .set('Authorization', token)
            .send({
                ...t.validTask,
                title: '',
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'invalid_title_length',
        });
        should(response.status).deepEqual(400);
    });

    it('title length more than max required symbols', async () => {
       const title = 'a'.repeat(constants.MAX_TITLE_LENGTH + 1);
        const response = await request(app)
            .post('/api/tasks')
            .set('Authorization', token)
            .send({
                ...t.validTask,
                title,
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'invalid_title_length',
        });
        should(response.status).deepEqual(400);
    });

    it('description not string', async () => {
        const response = await request(app)
            .post('/api/tasks')
            .set('Authorization', token)
            .send({
                ...t.validTask,
                description: null,
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'description_not_string',
        });
        should(response.status).deepEqual(400);
    });

    it('empty description', async () => {
        const response = await request(app)
            .post('/api/tasks')
            .set('Authorization', token)
            .send({
                ...t.validTask,
                description: '',
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'invalid_description_length',
        });
        should(response.status).deepEqual(400);
    });

    it('description length less than min required symbols', async () => {
        const description = 'a'.repeat(constants.MIN_DESCRIPTION_LENGTH - 1);
        const response = await request(app)
            .post('/api/tasks')
            .set('Authorization', token)
            .send({
                ...t.validTask,
                description,
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'invalid_description_length',
        });
        should(response.status).deepEqual(400);
    });

    it('description length more than max required symbols', async () => {
        const description = 'a'.repeat(constants.MAX_DESCRIPTION_LENGTH + 1);
        const response = await request(app)
            .post('/api/tasks')
            .set('Authorization', token)
            .send({
                ...t.validTask,
                description,
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'invalid_description_length',
        });
        should(response.status).deepEqual(400);
    });

    it('success', async () => {
        const response = await request(app)
            .post('/api/tasks')
            .set('Authorization', token)
            .send({...t.validTask})
            .expect(200);

        should(response.body).deepEqual({
            title: 'English Homework',
            description: 'Exercise 2 Page 132',
            isCompleted: false,
            userId: 1,
            id: 1,
        });
        should(response.status).deepEqual(200);
    });
});
