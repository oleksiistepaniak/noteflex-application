const User = require('../models/user.model');
const util = require('../util/api.util');
const messages = require('../util/api.messages');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (request, response) =>
{
    // VALIDATING REQUEST BODY - IS NOT EMPTY
    if (!request.body)
    {
        response.status(400).send({
            message: messages.apiMessages.EMPTY_REQUEST_BODY,
        });
        return;
    }

    // VALIDATING REQUEST BODY REQUIRED FIELDS

    try
    {
        util.isEmailValid(request.body.email);
        util.isPasswordValid(request.body.password);
        util.isFirstnameOrLastnameValid(request.body.firstName);
        util.isFirstnameOrLastnameValid(request.body.lastName);
        util.isUserAgeValid(request.body.age);
    } catch (error)
    {
        response.status(400).send({
            message: error.message,
        });
        return;
    }

    // CREATING NEW INSTANCE OF USER VIA CONSTRUCTOR
    const user = new User({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        password: request.body.password,
        age: request.body.age,
    });

    // SAVING CREATED INSTANCE INTO DB
    await User.create(user, (err, data) =>
    {
        if (err)
        {
            response.status(500).send({
                message: err.message || "Some error occurred during registering of user!",
            });
        } else response.send(data);
    });
}

exports.login = async (request, response) =>
{
    // VALIDATING REQUEST BODY - IS NOT EMPTY
    if (!request.body)
    {
        response.status(400).send({
            message: messages.apiMessages.EMPTY_REQUEST_BODY,
        });
        return;
    }

    try {
        const user = await User.findOneByEmail(request.body.email);

        if (!user) {
            return response.status(401).send({
                message: messages.apiMessages.AUTHENTICATION.INVALID_PASSWORD_OR_EMAIL,
            });
        }

        const isPasswordMatch = await bcrypt.compare(request.body.password, user.password);
        if (!isPasswordMatch) {
            return response.status(401).send({
                message: messages.apiMessages.AUTHENTICATION.INVALID_PASSWORD_OR_EMAIL,
            });
        }

        const token = jwt.sign({ userId: user.id }, "secret_key", { expiresIn: "1d" });
        return response.status(200).send({
            token,
        });
    } catch (error) {
        console.error(error);
        return response.status(500).send({
            message: "Internal server error",
        });
    }
}