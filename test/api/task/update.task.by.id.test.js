const t = require("../../test.helper");
const request = require('supertest');
const should = require('should');
const constants = require('../../../src/constants');

describe('update.task.by.id.test', () => {
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
            .put('/api/tasks/1')
            .expect(401);

        should(response.body).deepEqual({
            message: 'token_not_provided',
        });
        should(response.status).deepEqual(401);
    });

    it('invalid token (auth)', async () => {
        const response = await request(app)
            .put('/api/tasks/1')
            .set('Authorization', 'invalid_token')
            .expect(401);

        should(response.body).deepEqual({
            message: 'invalid_token',
        });
        should(response.status).deepEqual(401);
    });

    it('id is not a number', async () => {
        const response = await request(app)
            .put('/api/tasks/true')
            .set('Authorization', token)
            .send({
                title: true,
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'task_id_not_number',
        });
        should(response.status).deepEqual(400);
    });

    it('empty request body', async () => {
        const response = await request(app)
            .put('/api/tasks/1')
            .set('Authorization', token)
            .expect(400);

        should(response.body).deepEqual({
            message: 'empty_request_body',
        });
        should(response.status).deepEqual(400);
    });

    it('title not string', async () => {
        const response = await request(app)
            .put('/api/tasks/1')
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
            .put('/api/tasks/1')
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

    it('title length more than max required symbols', async () => {
       const title = 'a'.repeat(constants.TASK.MAX_TITLE_LENGTH + 1);
       const response = await request(app)
           .put('/api/tasks/1')
           .set('Authorization', token)
           .send({title})
           .expect(400);

       should(response.body).deepEqual({
           message: 'invalid_title_length',
       });
       should(response.status).deepEqual(400);
    });

    it('description not string', async () => {
        const response = await request(app)
            .put('/api/tasks/1')
            .set('Authorization', token)
            .send({
                description: true,
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'description_not_string',
        });
        should(response.status).deepEqual(400);
    });

    it('empty description', async () => {
        const response = await request(app)
            .put('/api/tasks/1')
            .set('Authorization', token)
            .send({
                description: '',
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'description_not_string',
        });
        should(response.status).deepEqual(400);
    });

    it('description less than min required symbols', async () => {
       const description = 'a'.repeat(constants.TASK.MIN_DESCRIPTION_LENGTH - 1);
        const response = await request(app)
            .put('/api/tasks/1')
            .set('Authorization', token)
            .send({description})
            .expect(400);

        should(response.body).deepEqual({
            message: 'invalid_description_length',
        });
        should(response.status).deepEqual(400);
    });

    it('description more than max required symbols', async () => {
        const description = 'a'.repeat(constants.TASK.MAX_DESCRIPTION_LENGTH + 1);
        const response = await request(app)
            .put('/api/tasks/1')
            .set('Authorization', token)
            .send({description})
            .expect(400);

        should(response.body).deepEqual({
            message: 'invalid_description_length',
        });
        should(response.status).deepEqual(400);
    });

    it('task is not owned', async () => {
        const response = await request(app)
            .put('/api/tasks/1')
            .set('Authorization', token)
            .send({title: t.validTask.title})
            .expect(400);

        should(response.body).deepEqual({
            message: 'task_is_not_owned',
        });
        should(response.status).deepEqual(400);
    });

    it('success with only title', async () => {
        await t.setValidTasks();
        const title = 'a'.repeat(constants.TASK.MAX_TITLE_LENGTH);
        const response = await request(app)
            .put('/api/tasks/1')
            .set('Authorization', token)
            .send({title})
            .expect(200);

        should(response.body).deepEqual({
            ...t.validTasks[0],
            id: 1,
            userId: 1,
            title,
        });
        should(response.status).deepEqual(200);
    });

    it('success with only description', async () => {
        await t.setValidTasks();
       const description = 'a'.repeat(constants.TASK.MIN_DESCRIPTION_LENGTH);
       const response = await request(app)
           .put('/api/tasks/1')
           .set('Authorization', token)
           .send({description})
           .expect(200);

       should(response.body).deepEqual({
           ...t.validTasks[0],
           id: 1,
           userId: 1,
           description,
       });
       should(response.status).deepEqual(200);
    });

    it('success with only isCompleted', async () => {
       await t.setValidTasks();
       const isCompleted = true;
       const response = await request(app)
           .put('/api/tasks/1')
           .set('Authorization', token)
           .send({isCompleted})
           .expect(200);

       should(response.body).deepEqual({
           ...t.validTasks[0],
           id: 1,
           userId: 1,
           isCompleted,
       });
       should(response.status).deepEqual(200);
    });

    it('success with title and description', async () => {
        await t.setValidTasks();
        const title = 'a'.repeat(constants.TASK.MAX_TITLE_LENGTH);
        const description = 'a'.repeat(constants.TASK.MIN_DESCRIPTION_LENGTH);
        const response = await request(app)
            .put('/api/tasks/1')
            .set('Authorization', token)
            .send({title, description})
            .expect(200);

        should(response.body).deepEqual({
            ...t.validTasks[0],
            id: 1,
            userId: 1,
            title,
            description,
        });

        should(response.status).deepEqual(200);
    });

    it('success with all fields', async () => {
        await t.setValidTasks();
        const title = 'a'.repeat(constants.TASK.MAX_TITLE_LENGTH);
        const description = 'a'.repeat(constants.TASK.MIN_DESCRIPTION_LENGTH);
        const isCompleted = true;
        const response = await request(app)
           .put('/api/tasks/1')
           .set('Authorization', token)
           .send({title, description, isCompleted})
           .expect(200);

        should(response.body).deepEqual({
           userId: 1,
           id: 1,
           title, description, isCompleted,
       });

        should(response.status).deepEqual(200);
    });
});
