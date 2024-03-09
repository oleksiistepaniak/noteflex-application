const apiMessages = {
    EMPTY_REQUEST_BODY: "Request body cannot be empty!",
};

const apiFunctionMessages = {
    VALUE_IS_NOT_STRING: (value) => `The value: ${value} must have string type!`,
}

module.exports = {
    apiMessages,
    apiFunctionMessages
};