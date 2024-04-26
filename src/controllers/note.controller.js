const {apiMessages} = require("../util/api.messages");
const util = require('../util/api.util');
const noteUtil = require('../util/note.util');
const noteService = require('../services/note.service');

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
        noteUtil.isTitleValid(title);
        util.isString(text, apiMessages.NOTE.TEXT_NOT_STRING);
        noteUtil.isTextValid(text);
    } catch (error) {
        response.status(400).send({
            message: error.message,
        });
    }

    const params = { title, text, userId };

    try {
        const note = await noteService.createNote(params);
        response.status(200).send(note);
    } catch (error) {
        if (error.message) {
            response.status(400).send({
                message: error.message,
            });
        } else {
            response.status(500).send({
                message: apiMessages.INTERNAL_SERVER_ERROR,
            });
        }
    }

}