const constants = require("../constants");

const apiMessages = {
    EMPTY_REQUEST_BODY: "Request body cannot be empty!",
};

const apiFunctionMessages = {
    VALUE_IS_NOT_STRING: (value) => `The value: ${value} must have string type!`,
    NOTE_CREATING: {
        INVALID_TITLE:
            (title) => `Invalid title: ${title}.`
                + ` Min length for title: ${constants.MIN_TITLE_LENGTH}.`
                + ` Max length for title: ${constants.MAX_TITLE_LENGTH}`,
        INVALID_DESCRIPTION:
            (description) => `Invalid description: ${description}.`
                + ` Min length for description: ${constants.MIN_DESCRIPTION_LENGTH}.`
                + ` Max length for description: ${constants.MAX_DESCRIPTION_LENGTH}`,
    }
}

module.exports = {
    apiMessages,
    apiFunctionMessages
};