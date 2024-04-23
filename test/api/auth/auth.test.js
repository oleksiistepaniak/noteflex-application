const t = require('../../test.helper');
const request = require('supertest');
const should = require('should');
const constants = require('../../../src/constants');

describe('auth.test', () => {
    let application;
    let testServer;

    before(() => {
        const { app, server } = t.init();
        application = app;
        testServer = server;
    })

    after(() => {
        testServer.close();
    })

    it('empty request body', async () => {
        const response = await request(application)
            .post('/api/register')
            .expect(400);

        should(response.body).deepEqual({
            message: 'empty_request_body',
        });
        should(response.status).deepEqual(400);
    });

    it('empty email', async () => {
        const response = await request(application)
            .post('/api/register')
            .send({
                email: "",
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'invalid_email',
        });
        should(response.status).deepEqual(400);
    });

    it('invalid email', async () => {
        const response = await request(application)
            .post('/api/register')
            .send({
                email: 'invalidemail',
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'invalid_email',
        });
        should(response.status).deepEqual(400);
    });

    it('empty password', async () => {
       const response = await request(application)
           .post('/api/register')
           .send({
               email: 'alex@gmail.com',
               password: '',
           })
           .expect(400);

       should(response.body).deepEqual({
           message: 'invalid_password'
       });
       should(response.status).deepEqual(400);
    });

    it('password less than min required characters', async () => {
        const password = t.generateInvalidPassword('a', constants.MIN_PASSWORD_LENGTH - 1);
        const response = await request(application)
            .post('/api/register')
            .send({
                email: "alex@gmail.com",
                password,
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'invalid_password',
        });
        should(response.status).deepEqual(400);
    });

    it('password more than max required characters', async () => {
        const password = t.generateInvalidPassword('a', constants.MAX_PASSWORD_LENGTH + 1);
        const response = await request(application)
            .post('/api/register')
            .send({
                email: 'alex@gmail.com',
                password,
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'invalid_password',
        });
        should(response.status).deepEqual(400);
    });
});