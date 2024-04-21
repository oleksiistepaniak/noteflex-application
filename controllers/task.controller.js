const Task = require("../models/task.model");
const util = require("../util/api.util");
const messages = require("../util/api.messages");
const taskService = require('../services/task.service');

exports.create = async (request, response) => {
    // VALIDATING REQUEST BODY - IS NOT EMPTY
    if (!request.body) {
        response.status(400).send({
            message: messages.apiMessages.EMPTY_REQUEST_BODY,
        });
        return;
    }

    // VALIDATING REQUEST BODY REQUIRED FIELDS
    try {
        util.isString(request.body.title, response);
        util.isTitleValid(request.body.title);
        util.isString(request.body.description);
        util.isDescriptionValid(request.body.description);
    } catch (error) {
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

exports.findAll = async (request, response) => {
    try {
        const tasks = await taskService.findAllTasks({
            title: request.query.title ?? undefined,
            userId: request.user.userId,
        });
        response.status(200).send(tasks);
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

exports.findAllCompleted = async (request, response) => {
    try {
        const tasks = await taskService.findAllCompletedTasks({
            userId: request.user.userId,
            title: request.query.title ?? undefined,
            isCompleted: true,
        });
        response.status(200).send(tasks);
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

exports.findAllActive = async (request, response) => {
    try {
        const tasks = await taskService.findAllActiveTasks({
            userId: request.user.userId,
            title: request.query.title ?? undefined,
            isActive: true,
        });
        response.status(200).send(tasks);
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
    const id = request.params.id;

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
        const task = await taskService.findTaskById({
            userId: request.user.userId,
            id: request.params.id,
        });
        response.status(200).send(task);
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

exports.updateById = (request, response) => {

    const id = request.params.id;

    // VALIDATING REQUEST BODY - IS NOT EMPTY
    if (!request.body) {
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
    } catch (error) {
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

    Task.updateById(id, note, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
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

exports.makeCompleted = (request, response) => {
    const id = request.params.id;

    // VALIDATING IDENTIFIER - IS NUMBER
    try {
        util.isNumber(id);
    } catch (error) {
        response.status(400).send({
            message: error.message,
        });
        return;
    }

    Task.makeCompleted(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
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

exports.removeById = (request, response) => {
    const id = request.params.id;

    // VALIDATING IDENTIFIER - IS NUMBER
    try {
        util.isNumber(id);
    } catch (error) {
        response.status(400).send({
            message: error.message,
        });
        return;
    }

    Task.removeById(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
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
