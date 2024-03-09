const Note = require("../models/note.model");
const util = require("../util/api.util");
const messages = require("../util/api.messages");

exports.create = (request, response) => {
    // VALIDATING REQUEST BODY - IS NOT EMPTY
    if (!request.body) {
        response.status(400).send({
            message: messages.apiMessages.EMPTY_REQUEST_BODY,
        });
        return;
    }

    // VALIDATING TITLE - IS STRING
    try {
        util.isString(request.body.title, response);
    } catch (error) {
        response.status(400).send({
            message: error.message
        });
        return;
    }

    // VALIDATING DESCRIPTION - IS STRING
    try {
        util.isString(request.body.description, response);
    } catch (error)
    {
        response.status(400).send({
            message: error.message,
        });
        return;
    }

    // CREATING NEW INSTANCE OF NOTE VIA CONSTRUCTOR
    const note = new Note({
        title: request.body.title,
        description: request.body.description,
        isCompleted: request.body.isCompleted,
    });

    // SAVING CREATED INSTANCE INTO MYSQL
    Note.create(note, (err, data) => {
        if (err) {
            response.status(500).send({
                message: err.message || "Some error occurred during creating a Note!",
            });
        } else response.send(data);
    });
}