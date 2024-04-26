const util = require('../util/api.util');
const userUtil = require('../util/user.util');
const messages = require('../util/api.messages');
const authenticationService = require('../services/auth.service');
const {apiMessages} = require("../util/api.messages");

exports.register = async (request, response) => {
    const { email, password, firstName, lastName, age } = request.body;

    // VALIDATING REQUEST BODY - IS NOT EMPTY
    if (Object.keys(request.body).length === 0) {
        response.status(400).send({
            message: messages.apiMessages.EMPTY_REQUEST_BODY,
        });
        return;
    }

    // VALIDATING REQUEST BODY REQUIRED PARAMS
    try {
        util.isString(email, apiMessages.USER.EMAIL_NOT_STRING);
        userUtil.isEmailValid(email);
        util.isString(password, apiMessages.USER.PASSWORD_NOT_STRING);
        userUtil.isPasswordValid(password);
        util.isString(firstName, apiMessages.USER.FIRSTNAME_NOT_STRING);
        util.isString(lastName, apiMessages.USER.LASTNAME_NOT_STRING);
        userUtil.isFirstnameOrLastnameValid(firstName);
        userUtil.isFirstnameOrLastnameValid(lastName);
        util.isNumber(age, apiMessages.USER.AGE_NOT_NUMBER);
        userUtil.isAgeValid(age);
    } catch (error) {
        response.status(400).send({
            message: error.message,
        });
        return;
    }

    // CREATING OBJECT PARAMS
    const params = { email, password, firstName, lastName, age };

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
    const { email, password } = request.body;

    // VALIDATING REQUEST BODY - IS NOT EMPTY
    if (Object.keys(request.body).length === 0) {
        response.status(400).send({
            message: messages.apiMessages.EMPTY_REQUEST_BODY,
        });
        return;
    }

    // CREATING OBJECT PARAMS
    const params = { email, password };

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
