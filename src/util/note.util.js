const constants = require("../constants");
const messages = require("./api.messages");

function isTitleValid(input) {
    if (input.length < constants.NOTE.MIN_TITLE_LENGTH || input.length > constants.NOTE.MAX_TITLE_LENGTH) {
        throw Error(messages.apiMessages.NOTE.INVALID_TITLE_LENGTH);
    }
}

function isOptionalTitleValid(input) {
    if (input) {
        isTitleValid(input);
    }
}

function isTextValid(input) {
    if (input.length < constants.NOTE.MIN_TEXT_LENGTH) {
        throw Error(messages.apiMessages.NOTE.INVALID_TEXT_LENGTH);
    }
}

function isOptionalTextValid(input) {
    if (input) {
        isTextValid(input);
    }
}

module.exports = {
    isTitleValid,
    isOptionalTitleValid,
    isTextValid,
    isOptionalTextValid,
}