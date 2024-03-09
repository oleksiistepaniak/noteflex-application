const messages = require("../util/api.messages");

function isString(input)
{
    if (typeof input !== "string")
    {
        throw Error(messages.apiFunctionMessages.VALUE_IS_NOT_STRING(input));
    }
}

module.exports = {
    isString: isString,
}