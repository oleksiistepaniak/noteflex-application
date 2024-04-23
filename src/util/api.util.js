const messages = require("./api.messages");
const constants = require("../constants");

//#region GENERAL FUNCTIONS FOR VALIDATION

function isString(input)
{
    if (typeof input !== "string")
    {
        throw Error(messages.apiFunctionMessages.VALUE_IS_NOT_STRING(input));
    }
}

function isOptionalString(input)
{
    if (input) {
        isString(input);
    }
}

function isNumber(input)
{
    const number = parseInt(input);

    if (isNaN(number))
    {
        throw Error(messages.apiFunctionMessages.VALUE_IS_NOT_NUMBER(input));
    }
}

function apiCheck(condition, message) {
    if (!condition) {
        throw Error(message);
    }
}

//#endregion

//#region NOTE_CREATING_UPDATING_VALIDATION

function isTitleValid(input)
{
    if (input.length === 0 || input.length > constants.MAX_TITLE_LENGTH)
    {
        throw Error(messages.apiFunctionMessages.NOTE_CREATING.INVALID_TITLE(input));
    }
}

function isOptionalTitleValid(input) {
    if (input) {
        isTitleValid(input);
    }
}

function isDescriptionValid(input)
{
    if (input.length < constants.MIN_DESCRIPTION_LENGTH || input.length > constants.MAX_DESCRIPTION_LENGTH)
    {
        throw Error(messages.apiFunctionMessages.NOTE_CREATING.INVALID_DESCRIPTION(input));
    }
}

function isOptionalDescriptionValid(input) {
    if (input) {
        isDescriptionValid(input);
    }
}

//#endregion

//#region USER_REGISTRATION_VALIDATION

function isEmailValid(input)
{
    if (!constants.EMAIL_REGEXP.test(input))
    {
        throw Error(messages.apiMessages.REGISTRATION.INVALID_EMAIL);
    }
}

function isPasswordValid(input)
{
    if (!constants.PASSWORD_REGEXP.test(input))
    {
        throw Error(messages.apiMessages.REGISTRATION.INVALID_PASSWORD);
    }
}

function isFirstnameOrLastnameValid(input)
{
    if (!input || input.length < constants.MIN_NAME_LENGTH || input.length > constants.MAX_NAME_LENGTH)
    {
        throw Error(messages.apiMessages.REGISTRATION.INVALID_CREDENTIALS);
    }
}

function isUserAgeValid(input)
{
    if (input < constants.MIN_USER_AGE_VALUE || input > constants.MAX_USER_AGE_VALUE)
    {
        throw Error(messages.apiFunctionMessages.USER_REGISTER.INVALID_AGE(input));
    }
}

//#endregion

module.exports = {
    apiCheck,
    isString,
    isOptionalString,
    isNumber,
    isTitleValid,
    isOptionalTitleValid,
    isDescriptionValid,
    isOptionalDescriptionValid,
    isEmailValid,
    isPasswordValid,
    isFirstnameOrLastnameValid,
    isUserAgeValid,
}