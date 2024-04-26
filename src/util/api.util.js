function isString(input, message)
{
    if (typeof input !== "string" || input.length === 0)
    {
        throw Error(message);
    }
}

function isOptionalString(input, message)
{
    if (input || typeof input === 'string') {
        isString(input, message);
    }
}

function isNumber(input, message)
{
    const number = parseInt(input);

    if (isNaN(number))
    {
        throw Error(message);
    }
}

function apiCheck(condition, message) {
    if (!condition) {
        throw Error(message);
    }
}

module.exports = {
    apiCheck,
    isString,
    isOptionalString,
    isNumber,
}
