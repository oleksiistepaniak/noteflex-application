const constants = require("../constants");
const messages = require("./api.messages");

function isTitleValid(input)
{
    if (input.length === 0 || input.length > constants.TASK.MAX_TITLE_LENGTH)
    {
        throw Error(messages.apiMessages.TASK.INVALID_TITLE_LENGTH);
    }
}

function isOptionalTitleValid(input) {
    if (input) {
        isTitleValid(input);
    }
}

function isDescriptionValid(input)
{
    if (input.length < constants.TASK.MIN_DESCRIPTION_LENGTH || input.length > constants.TASK.MAX_DESCRIPTION_LENGTH)
    {
        throw Error(messages.apiMessages.TASK.INVALID_DESCRIPTION_LENGTH);
    }
}

function isOptionalDescriptionValid(input) {
    if (input) {
        isDescriptionValid(input);
    }
}

module.exports = {
    isTitleValid,
    isOptionalTitleValid,
    isDescriptionValid,
    isOptionalDescriptionValid,
}