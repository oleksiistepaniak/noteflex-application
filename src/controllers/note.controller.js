const {apiMessages} = require("../util/api.messages");
const util = require('../util/api.util');
const noteUtil = require('../util/note.util');
const noteService = require('../services/note.service');
const messages = require("../util/api.messages");

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
        return;
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

exports.findAll = async (request, response) => {
    const { userId } = request.user;
    const { title } = request.query;

    try {
        const notes = await noteService.findAllNotes({ title, userId });
        response.status(200).send(notes);
    } catch (error) {
        if (error.message) {
            response.status(400).send({
                message: error.message,
            });
        } else {
            response.status(500).send({
                message: messages.apiMessages.INTERNAL_SERVER_ERROR,
            });
        }
    }
}

exports.findOneById = async (request, response) => {
    const { id } = request.params;
    const { userId } = request.user;

    // VALIDATING IDENTIFIER - IS NUMBER
    try {
        util.isNumber(id);
    } catch (error) {
        response.status(400).send({
            message: error.message,
        });
        return;
    }

    try {
        const note = await noteService.findNoteById({ userId, id });
        response.status(200).send(note);
    } catch (error) {
        if (error.message) {
            response.status(400).send({
                message: error.message,
            });
        } else {
            response.status(500).send({
                message: messages.apiMessages.INTERNAL_SERVER_ERROR,
            })
        }
    }
}

exports.updateOneById = async (request, response) => {

    const { id } = request.params;
    const { title, text } = request.body;
    const { userId } = request.user;

    // VALIDATING REQUEST BODY - IS NOT EMPTY
    if (Object.keys(request.body).length === 0) {
        response.status(400).send({
            message: messages.apiMessages.EMPTY_REQUEST_BODY,
        });
        return;
    }

    // VALIDATING IDENTIFIER AND REQUEST BODY FOR REQUIRED FIELDS
    try {
        util.isNumber(id, apiMessages.NOTE.NOTE_ID_NOT_NUMBER);
        util.isOptionalString(title, apiMessages.NOTE.TITLE_NOT_STRING);
        noteUtil.isOptionalTitleValid(title);
        util.isOptionalString(text, apiMessages.NOTE.TEXT_NOT_STRING);
        noteUtil.isOptionalTextValid(text);
    } catch (error) {
        response.status(400).send({
            message: error.message,
        });
        return;
    }

    try {
        const note = await noteService.updateNoteById({ id, userId, title, text });
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
