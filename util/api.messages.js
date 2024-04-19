const constants = require("../constants");

const apiMessages = {
    EMPTY_REQUEST_BODY: "Request body cannot be empty!",
};

const apiFunctionMessages = {
    VALUE_IS_NOT_STRING: (value) => `The value: ${value} must have string type!`,
    VALUE_IS_NOT_NUMBER: (value) => `The value: ${value} must have number type!`,
    NOTE_CREATING: {
        INVALID_TITLE:
            (title) => `Invalid title: ${title}.`
                + ` Min length for title: ${constants.MIN_TITLE_LENGTH}.`
                + ` Max length for title: ${constants.MAX_TITLE_LENGTH}`,
        INVALID_DESCRIPTION:
            (description) => `Invalid description: ${description}.`
                + ` Min length for description: ${constants.MIN_DESCRIPTION_LENGTH}.`
                + ` Max length for description: ${constants.MAX_DESCRIPTION_LENGTH}`,
    },
    USER_REGISTER: {
        INVALID_EMAIL:
            (email) => `Invalid email: ${email}`,
        INVALID_PASSWORD:
            (password) => `Invalid password: ${password}`
                + `. Password must include at least one uppercase letter`
                + `, one lowercase letter, one digit and min number of`
                + ` characters must be 6 or equal, whereas max number of characters`
                + ` must be 20 or equal.`,
        INVALID_FIRSTNAME_OR_SURNAME:
            (nameOrSurname) => `Invalid first name or last name: ${nameOrSurname}.`
                + ` Min length for name or surname: ${constants.MIN_NAME_LENGTH}`
                + ` Max length for name or surname: ${constants.MAX_NAME_LENGTH}`,
        INVALID_AGE:
            (age) => `Invalid age: ${age}.`
                + ` Min possible age: ${constants.MIN_USER_AGE_VALUE}`
                + ` Max possible age: ${constants.MAX_USER_AGE_VALUE}`,
    }
}

module.exports = {
    apiMessages,
    apiFunctionMessages
};