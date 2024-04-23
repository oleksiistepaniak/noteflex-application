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
                ...t.validUser,
                email: "",
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'invalid_email',
        });
        should(response.status).deepEqual(400);
    });

    it('null email', async () => {
        const response = await request(application)
            .post('/api/register')
            .send({
                ...t.validUser,
                email: null,
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
                ...t.validUser,
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
               ...t.validUser,
               password: '',
           })
           .expect(400);

       should(response.body).deepEqual({
           message: 'invalid_password'
       });
       should(response.status).deepEqual(400);
    });

    it('null password', async () => {
        const response = await request(application)
            .post('/api/register')
            .send({
                ...t.validUser,
                password: null,
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'invalid_password'
        });
        should(response.status).deepEqual(400);
    });

    it('password less than min required characters', async () => {
        const password = 'a'.repeat(constants.MIN_PASSWORD_LENGTH - 1);
        const response = await request(application)
            .post('/api/register')
            .send({
                ...t.validUser,
                password,
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'invalid_password',
        });
        should(response.status).deepEqual(400);
    });

    it('password more than max required characters', async () => {
        const password = 'a'.repeat(constants.MAX_PASSWORD_LENGTH);
        const response = await request(application)
            .post('/api/register')
            .send({
                ...t.validUser,
                password,
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'invalid_password',
        });
        should(response.status).deepEqual(400);
    });

    it('password includes only uppercase letters', async () => {
        const password = "A".repeat(constants.MIN_PASSWORD_LENGTH);
        const response = await request(application)
            .post('/api/register')
            .send({
                ...t.validUser,
                password,
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'invalid_password',
        });
        should(response.status).deepEqual(400);
    });

    it('password includes only lowercase letters', async () => {
       const password = 'a'.repeat(constants.MIN_PASSWORD_LENGTH);
       const response = await request(application)
           .post('/api/register')
           .send({
               ...t.validUser,
               password,
           })
           .expect(400);

       should(response.body).deepEqual({
           message: 'invalid_password',
       });
       should(response.status).deepEqual(400);
    });

    it('password includes only digits', async () => {
       const password = '2'.repeat(constants.MIN_PASSWORD_LENGTH);
       const response = await request(application)
           .post('/api/register')
           .send({
               ...t.validUser,
               password,
           })
           .expect(400);

       should(response.body).deepEqual({
           message: 'invalid_password',
       });
       should(response.status).deepEqual(400);
    });

    it('password includes only uppercase and lowercase letters', async () => {
       const password = 'a'.repeat(constants.MIN_PASSWORD_LENGTH / 2) + 'A'.repeat(constants.MIN_PASSWORD_LENGTH / 2);
       const response = await request(application)
           .post('/api/register')
           .send({
               ...t.validUser,
               password,
           })
           .expect(400);

       should(response.body).deepEqual({
           message: 'invalid_password',
       });
       should(response.status).deepEqual(400);
    });

    it('password includes only lowercase letters and digits', async () => {
       const password = 'a'.repeat(constants.MIN_PASSWORD_LENGTH / 2) + '2'.repeat(constants.MIN_PASSWORD_LENGTH / 2);
       const response = await request(application)
           .post('/api/register')
           .send({
               ...t.validUser,
               password,
           })
           .expect(400);

       should(response.body).deepEqual({
           message: 'invalid_password',
       });
       should(response.status).deepEqual(400);
    });

    it('password includes only uppercase letters and digits', async () => {
        const password = 'A'.repeat(constants.MIN_PASSWORD_LENGTH / 2) + '2'.repeat(constants.MIN_PASSWORD_LENGTH / 2);
        const response = await request(application)
            .post('/api/register')
            .send({
                ...t.validUser,
                password,
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'invalid_password',
        });
        should(response.status).deepEqual(400);
    });

    it('empty firstName', async () => {
       const response = await request(application)
           .post('/api/register')
           .send({
               ...t.validUser,
               firstName: '',
           })
           .expect(400);

       should(response.body).deepEqual({
           message: 'invalid_credentials',
       });
       should(response.status).deepEqual(400);
    });

    it('null firstName', async () => {
        const response = await request(application)
            .post('/api/register')
            .send({
                ...t.validUser,
                firstName: null,
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'invalid_credentials',
        });
        should(response.status).deepEqual(400);
    });

    it('firstName less than min required symbols', async () => {
       const firstName = 'a'.repeat(constants.MIN_NAME_LENGTH - 1);
       const response = await request(application)
           .post('/api/register')
           .send({
               ...t.validUser,
               firstName,
           })
           .expect(400);

       should(response.body).deepEqual({
           message: 'invalid_credentials',
       });
       should(response.status).deepEqual(400);
    });

    it('firstName more than max required symbols', async () => {
        const firstName = 'a'.repeat(constants.MAX_NAME_LENGTH + 1);
        const response = await request(application)
            .post('/api/register')
            .send({
                ...t.validUser,
                firstName,
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'invalid_credentials',
        });
        should(response.status).deepEqual(400);
    });
});