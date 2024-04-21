const Task = require("../models/task.model");
const util = require("../util/api.util");
const messages = require("../util/api.messages");
const taskService = require('../services/task.service');

exports.create = async (request, response) =>
{
    // VALIDATING REQUEST BODY - IS NOT EMPTY
    if (!request.body)
    {
        response.status(400).send({
            message: messages.apiMessages.EMPTY_REQUEST_BODY,
        });
        return;
    }

    // VALIDATING REQUEST BODY REQUIRED FIELDS
    try
    {
        util.isString(request.body.title, response);
        util.isTitleValid(request.body.title);
        util.isString(request.body.description);
        util.isDescriptionValid(request.body.description);
    } catch (error)
    {
        response.status(400).send({
            message: error.message
        });
        return;
    }

    // CREATING OBJECT PARAMS
    const params = {
        title: request.body.title,
        description: request.body.description,
        isCompleted: request.body.isCompleted ?? false,
        userId: request.user.userId,
    };

    try {
        const task = await taskService.createTask(params);
        response.status(200).send({
            task,
        });
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

exports.findAll = (request, response) =>
{
    const title = request.query.title;

    Task.findAll(title, (err, data) =>
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
    Task.findAllCompleted((err, data) =>
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
    Task.findAllActive((err, data) =>
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

    Task.findOneById(id, (err, data) =>
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

    // VALIDATING REQUEST BODY - IS NOT EMPTY
    if (!request.body)
    {
        response.status(400).send({
            message: messages.apiMessages.EMPTY_REQUEST_BODY,
        });
        return;
    }

    // VALIDATING IDENTIFIER AND REQUEST BODY FOR REQUIRED FIELDS
    try {
        util.isNumber(id);
        util.isString(request.body.title, response);
        util.isTitleValid(request.body.title);
        util.isString(request.body.description);
        util.isDescriptionValid(request.body.description);
    } catch (error)
    {
        response.status(400).send({
            message: error.message,
        });
        return;
    }

    // CREATING NEW INSTANCE OF NOTE VIA CONSTRUCTOR
    const note = new Task({
        title: request.body.title,
        description: request.body.description,
        isCompleted: request.body.isCompleted ?? false,
    });

    Task.updateById(id, note, (err, data) =>
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

exports.makeCompleted = (request, response) =>
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

    Task.makeCompleted(id, (err, data) =>
    {
        if (err) {
            if (err.kind === "not_found")
            {
                response.status(400).send({
                    message: `Not found Note with id ${id}`,
                })
            } else {
                response.status(500).send({
                    message: `Some error occurred while making completed Note by id ${id}`,
                });
            }
        } else response.send(data);
    })
}

exports.removeById = (request, response) =>
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

    Task.removeById(id, (err, data) =>
    {
        if (err)
        {
            if (err.kind === "not_found")
            {
                response.status(400).send({
                    message: `Not found Note with id ${id}`
                })
            } else {
                response.status(500).send({
                    message: err.message || `Some error occurred during removing a note by id: ${id}`,
                });
            }
        } else response.send(data);
    })
}