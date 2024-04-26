const constants = require("../constants");
const messages = require("./api.messages");

function isEmailValid(input)
{
    if (!constants.USER.EMAIL_REGEXP.test(input))
    {
        throw Error(messages.apiMessages.USER.INVALID_EMAIL);
    }
}

function isPasswordValid(input)
{
    if (!constants.USER.PASSWORD_REGEXP.test(input))
    {
        throw Error(messages.apiMessages.USER.INVALID_PASSWORD);
    }
}

function isFirstnameOrLastnameValid(input)
{
    if (typeof input !== 'string'
        || input.length < constants.USER.MIN_NAME_LENGTH || input.length > constants.USER.MAX_NAME_LENGTH)
    {
        throw Error(messages.apiMessages.USER.INVALID_CREDENTIALS);
    }
}

function isAgeValid(input)
{
    if (typeof input !== 'number' || input < constants.USER.MIN_AGE_VALUE || input > constants.USER.MAX_AGE_VALUE)
    {
        throw Error(messages.apiMessages.USER.INVALID_AGE);
    }
}

module.exports = {
    isEmailValid,
    isPasswordValid,
    isFirstnameOrLastnameValid,
    isAgeValid
}