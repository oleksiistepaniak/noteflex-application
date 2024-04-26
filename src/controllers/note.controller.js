const {apiMessages} = require("../util/api.messages");
const util = require('../util/api.util');


exports.create = async (request, response) => {
    const { title, text } = request.body;
    const { userId } = request.user;

    // VALIDATING REQUEST BODY - IS NOT EMPTY
    if (Object.keys(request.body).length === 0) {
        response.status(400).send({
            message: apiMessages.EMPTY_REQUEST_BODY,
        });
        return;
    }

    // VALIDATING REQUEST BODY REQUIRED FIELDS
    try {
        util.isString(title, apiMessages.NOTE.TITLE_NOT_STRING);

    } catch (error) {

    }
}