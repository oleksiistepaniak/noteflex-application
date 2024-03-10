const messages = require("../util/api.messages");
const constants = require("../constants");

function isString(input)
{
    if (typeof input !== "string")
    {
        throw Error(messages.apiFunctionMessages.VALUE_IS_NOT_STRING(input));
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

function isTitleValid(input)
{
    if (input.length === 0 || input.length > constants.MAX_TITLE_LENGTH)
    {
        throw Error(messages.apiFunctionMessages.NOTE_CREATING.INVALID_TITLE(input));
    }
}

function isDescriptionValid(input)
{
    if (input.length < constants.MIN_DESCRIPTION_LENGTH || input.length > constants.MAX_DESCRIPTION_LENGTH)
    {
        throw Error(messages.apiFunctionMessages.NOTE_CREATING.INVALID_DESCRIPTION(input));
    }
}

module.exports = {
    isString,
    isNumber,
    isTitleValid,
    isDescriptionValid
}