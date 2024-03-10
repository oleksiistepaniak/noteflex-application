const Note = require("../models/note.model");
const util = require("../util/api.util");
const messages = require("../util/api.messages");

exports.create = (request, response) =>
{
    // VALIDATING REQUEST BODY - IS NOT EMPTY
    if (!request.body)
    {
        response.status(400).send({
            message: messages.apiMessages.EMPTY_REQUEST_BODY,
        });
        return;
    }

    // VALIDATING TITLE - IS STRING
    try
    {
        util.isString(request.body.title, response);
    } catch (error)
    {
        response.status(400).send({
            message: error.message
        });
        return;
    }

    // VALIDATING TITLE - IS CORRECT LENGTH
    try
    {
        util.isTitleValid(request.body.title);

    } catch (error)
    {
        response.status(400).send({
            message: error.message,
        });
        return;
    }

    // VALIDATING DESCRIPTION - IS STRING
    try
    {
        util.isString(request.body.description);
    } catch (error)
    {
        response.status(400).send({
            message: error.message,
        });
        return;
    }

    // VALIDATING DESCRIPTION - IS CORRECT LENGTH
    try
    {
        util.isDescriptionValid(request.body.description);
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
        isCompleted: request.body.isCompleted ?? false,
    });

    // SAVING CREATED INSTANCE INTO MYSQL
    Note.create(note, (err, data) =>
    {
        if (err)
        {
            response.status(500).send({
                message: err.message || "Some error occurred during creating a Note!",
            });
        } else response.send(data);
    });
}

exports.findAll = (request, response) =>
{
    const title = request.query.title;

    Note.findAll(title, (err, data) =>
    {
        if (err)
        {
            response.status(500).send({
                message: err.message || "Some error occurred during retrieving notes!",
            });
        }
        else response.send(data);
    })
}

exports.findAllCompleted = (request, response) =>
{
    Note.findAllCompleted((err, data) =>
    {
        if (err)
        {
            response.status(500).send({
                message: err.message || "Some error occurred during retrieving completed notes!",
            });
        }
        else response.send(data);
    })
}

exports.findAllActive = (request, response) =>
{
    Note.findAllActive((err, data) =>
    {
        if (err)
        {
            response.status(500).send({
                message: err.message || "Some error occurred during retrieving active notes!",
            });
        }
        else response.send(data);
    })
}

exports.findOneById = (request, response) =>
{
    const id = request.params.id;

    // VALIDATING IDENTIFIER - IS NUMBER
    try {
        util.isNumber(id);
    } catch (error)
    {
        response.status(400).send({
            message: error.message,
        });
        return;
    }

    Note.findOneById(id, (err, data) =>
    {
        if (err)
        {
            response.status(500).send({
                message: err.message || `Some error occurred during retrieving a note by id ${id}`,
            });
        }
        else response.send(data);
    })
}

exports.updateById = (request, response) =>
{

    const id = request.params.id;

    // VALIDATING IDENTIFIER - IS NUMBER
    try {
        util.isNumber(id);
    } catch (error)
    {
        response.status(400).send({
            message: error.message,
        });
        return;
    }

    // VALIDATING REQUEST BODY - IS NOT EMPTY
    if (!request.body)
    {
        response.status(400).send({
            message: messages.apiMessages.EMPTY_REQUEST_BODY,
        });
        return;
    }

    // VALIDATING TITLE - IS STRING
    try
    {
        util.isString(request.body.title, response);
    } catch (error)
    {
        response.status(400).send({
            message: error.message
        });
        return;
    }

    // VALIDATING TITLE - IS CORRECT LENGTH
    try
    {
        util.isTitleValid(request.body.title);

    } catch (error)
    {
        response.status(400).send({
            message: error.message,
        });
        return;
    }

    // VALIDATING DESCRIPTION - IS STRING
    try
    {
        util.isString(request.body.description);
    } catch (error)
    {
        response.status(400).send({
            message: error.message,
        });
        return;
    }

    // VALIDATING DESCRIPTION - IS CORRECT LENGTH
    try
    {
        util.isDescriptionValid(request.body.description);
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
        isCompleted: request.body.isCompleted ?? false,
    });

    Note.updateById(id, note, (err, data) =>
    {
        if (err) {
            if (err.kind === "not_found")
            {
                response.status(400).send({
                    message: `Not found Note with id ${id}`,
                });
            } else {
                response.status(500).send({
                    message: `Some error occurred while updating Note by id ${id}`,
                });
            }
        } else response.send(data);
    })

}