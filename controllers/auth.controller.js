const util = require('../util/api.util');
const messages = require('../util/api.messages');
const authenticationService = require('../services/auth.service');

exports.register = async (request, response) => {
    // VALIDATING REQUEST BODY - IS NOT EMPTY
    if (!request.body) {
        response.status(400).send({
            message: messages.apiMessages.EMPTY_REQUEST_BODY,
        });
        return;
    }

    // VALIDATING REQUEST BODY REQUIRED PARAMS
    try {
        util.isEmailValid(request.body.email);
        util.isPasswordValid(request.body.password);
        util.isFirstnameOrLastnameValid(request.body.firstName);
        util.isFirstnameOrLastnameValid(request.body.lastName);
        util.isUserAgeValid(request.body.age);
    } catch (error) {
        response.status(400).send({
            message: error.message,
        });
        return;
    }

    // CREATING OBJECT PARAMS
    const params = {
        email: request.body.email,
        password: request.body.password,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        age: request.body.age,
    };

    try {
        const user = await authenticationService.signup(params);
        response.status(200).send(user);
    } catch (error) {
        if (error.message) {
            response.status(400).send({
                message: error.message,
            });
        } else {
            response.status(500).send({
                message: messages.apiMessages.INTERNAL_SERVER_ERROR,
            });
        }
    }
}

exports.login = async (request, response) => {
    // VALIDATING REQUEST BODY - IS NOT EMPTY
    if (!request.body) {
        response.status(400).send({
            message: messages.apiMessages.EMPTY_REQUEST_BODY,
        });
        return;
    }

    // CREATING OBJECT PARAMS
    const params = {
        email: request.body.email,
        password: request.body.password,
    };

    try {
        const token = await authenticationService.authenticate(params);
        response.status(200).send({
            token,
        });
    } catch (error) {
        if (error.message) {
            response.status(401).send({
                message: error.message,
            });
        } else {
            response.status(500).send({
                message: messages.apiMessages.INTERNAL_SERVER_ERROR
            });
        }
    }
}

