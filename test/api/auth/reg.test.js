const t = require('../../test.helper');
const request = require('supertest');
const should = require('should');
const constants = require('../../../src/constants');

describe('reg.test', () => {
    let app;

    before(async () => {
        app = t.init();
        await t.initDb();
    })

    after(async () => {
        t.dispose();
        await t.clearDb();
    })

    it('empty request body', async () => {
        const response = await request(app)
            .post('/api/register')
            .expect(400);

        should(response.body).deepEqual({
            message: 'empty_request_body',
        });
        should(response.status).deepEqual(400);
    });

    it('empty email', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({
                ...t.validUser,
                email: "",
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'email_not_string',
        });
        should(response.status).deepEqual(400);
    });

    it('null email', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({
                ...t.validUser,
                email: null,
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'email_not_string',
        });
        should(response.status).deepEqual(400);
    });

    it('invalid email', async () => {
        const response = await request(app)
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
       const response = await request(app)
           .post('/api/register')
           .send({
               ...t.validUser,
               password: '',
           })
           .expect(400);

       should(response.body).deepEqual({
           message: 'password_not_string',
       });
       should(response.status).deepEqual(400);
    });

    it('null password', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({
                ...t.validUser,
                password: null,
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'password_not_string',
        });
        should(response.status).deepEqual(400);
    });

    it('password less than min required characters', async () => {
        const password = 'a'.repeat(constants.USER.MIN_PASSWORD_LENGTH - 1);
        const response = await request(app)
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
        const password = 'a'.repeat(constants.USER.MAX_PASSWORD_LENGTH);
        const response = await request(app)
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
        const password = "A".repeat(constants.USER.MIN_PASSWORD_LENGTH);
        const response = await request(app)
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
       const password = 'a'.repeat(constants.USER.MIN_PASSWORD_LENGTH);
       const response = await request(app)
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
       const password = '2'.repeat(constants.USER.MIN_PASSWORD_LENGTH);
       const response = await request(app)
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
       const password = 'a'.repeat(constants.USER.MIN_PASSWORD_LENGTH / 2) +
           'A'.repeat(constants.USER.MIN_PASSWORD_LENGTH / 2);
       const response = await request(app)
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
       const password = 'a'.repeat(constants.USER.MIN_PASSWORD_LENGTH / 2) +
           '2'.repeat(constants.USER.MIN_PASSWORD_LENGTH / 2);
       const response = await request(app)
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
        const password = 'A'.repeat(constants.USER.MIN_PASSWORD_LENGTH / 2) +
            '2'.repeat(constants.USER.MIN_PASSWORD_LENGTH / 2);
        const response = await request(app)
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
       const response = await request(app)
           .post('/api/register')
           .send({
               ...t.validUser,
               firstName: '',
           })
           .expect(400);

       should(response.body).deepEqual({
           message: 'first_name_not_string',
       });
       should(response.status).deepEqual(400);
    });

    it('null firstName', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({
                ...t.validUser,
                firstName: null,
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'first_name_not_string',
        });
        should(response.status).deepEqual(400);
    });

    it('firstName less than min required symbols', async () => {
       const firstName = 'a'.repeat(constants.USER.MIN_NAME_LENGTH - 1);
       const response = await request(app)
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
        const firstName = 'a'.repeat(constants.USER.MAX_NAME_LENGTH + 1);
        const response = await request(app)
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

    it('empty lastName', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({
                ...t.validUser,
                lastName: '',
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'last_name_not_string',
        });
        should(response.status).deepEqual(400);
    });

    it('null lastName', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({
                ...t.validUser,
                firstName: null,
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'first_name_not_string',
        });
        should(response.status).deepEqual(400);
    });

    it('bool lastName', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({
                ...t.validUser,
                firstName: true,
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'first_name_not_string',
        });
        should(response.status).deepEqual(400);
    });

    it('lastName less than min required symbols', async () => {
        const lastName = 'a'.repeat(constants.USER.MIN_NAME_LENGTH - 1);
        const response = await request(app)
            .post('/api/register')
            .send({
                ...t.validUser,
                lastName,
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'invalid_credentials',
        });
        should(response.status).deepEqual(400);
    });

    it('lastName more than max required symbols', async () => {
        const lastName = 'a'.repeat(constants.USER.MAX_NAME_LENGTH + 1);
        const response = await request(app)
            .post('/api/register')
            .send({
                ...t.validUser,
                lastName,
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'invalid_credentials',
        });
        should(response.status).deepEqual(400);
    });

    it('bool age', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({
                ...t.validUser,
                age: true,
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'age_not_number',
        });
        should(response.status).deepEqual(400);
    });

    it ('null age', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({
                ...t.validUser,
                age: null,
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'age_not_number',
        });
        should(response.status).deepEqual(400);
    });

    it('age less than min required', async () => {
        const age = constants.USER.MIN_AGE_VALUE - 1;
        const response = await request(app)
            .post('/api/register')
            .send({
                ...t.validUser,
                age,
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'invalid_age',
        });
        should(response.status).deepEqual(400);
    });

    it('age more than max required', async () => {
        const age = constants.USER.MAX_AGE_VALUE + 1;
        const response = await request(app)
            .post('/api/register')
            .send({
                ...t.validUser,
                age,
            })
            .expect(400);

        should(response.body).deepEqual({
            message: 'invalid_age',
        });
        should(response.status).deepEqual(400);
    });

    it('success', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({...t.validUser})
            .expect(200);

        should(response.body).deepEqual({
            id: 1,
            email: 'alex@gmail.com',
            age: 22,
            firstName: 'Alex',
            lastName: 'Stepaniak',
        });
        should(response.status).deepEqual(200);
    });

    it('users exists', async () => {
       const response = await request(app)
           .post('/api/register')
           .send({
               ...t.validUser,
           })
           .expect(400);

       should(response.body).deepEqual({
           message: 'user_exists',
       });
       should(response.status).deepEqual(400);
    });
});
