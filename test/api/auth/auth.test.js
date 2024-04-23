const t = require("../../test.helper");
const request = require('supertest');
const should = require('should');

describe('auth.test', () => {
    let app;

    before(async () => {
        app = t.init();
        await t.initDb();
        await t.setValidUser();
    });

    after(async () => {
        t.dispose();
        await t.clearDb();
    });

    it('invalid password', async () => {
        const response = await request(app)
            .post('/api/login')
            .send({
                ...t.validCredentialsForLogin,
                password: 'oleoleole',
            })
            .expect(401);

        should(response.body).deepEqual({
            message: 'invalid_password_or_email',
        });
        should(response.status).deepEqual(401);
    });

    it('invalid email', async () => {
       const response = await request(app)
           .post('/api/login')
           .send({
               ...t.validCredentialsForLogin,
               email: 'emailemail',
           })
           .expect(401);

       should(response.body).deepEqual({
           message: 'invalid_password_or_email',
       });
       should(response.status).deepEqual(401);
    });

    it('empty request body', async () => {
       const response = await request(app)
           .post('/api/login')
           .expect(400);

       should(response.body).deepEqual({
           message: 'empty_request_body',
       });
       should(response.status).deepEqual(400);
    });

    it('not existing user', async () => {
       const response = await request(app)
           .post('/api/login')
           .send({
               email: 'notexisting@gmail.com',
               password: 'notNOT228',
           })
           .expect(401);

       should(response.body).deepEqual({
           message: 'invalid_password_or_email',
       });
       should(response.status).deepEqual(401);
    });

    it('success', async () => {
       const response = await request(app)
           .post('/api/login')
           .send({
               ...t.validCredentialsForLogin,
           })
           .expect(200);

       should(typeof response.body.token).be.exactly("string");
       should(response.status).deepEqual(200);
    });
});
