const util = require("../util/api.util");
const messages = require("../util/api.messages");
const taskService = require('../services/task.service');
const {apiMessages} = require("../util/api.messages");

exports.create = async (request, response) => {
    const { title, description, isCompleted } = request.body;
    const { userId } = request.user;

    // VALIDATING REQUEST BODY - IS NOT EMPTY
    if (Object.keys(request.body).length === 0) {
        response.status(400).send({
            message: messages.apiMessages.EMPTY_REQUEST_BODY,
        });
        return;
    }

    // VALIDATING REQUEST BODY REQUIRED FIELDS
    try {
        util.isString(title, apiMessages.TASK.TITLE_NOT_STRING);
        util.isTitleValid(title);
        util.isString(description, apiMessages.TASK.DESCRIPTION_NOT_STRING);
        util.isDescriptionValid(description);
    } catch (error) {
        response.status(400).send({
            message: error.message
        });
        return;
    }

    // CREATING OBJECT PARAMS
    const params = { title, description, isCompleted: isCompleted ?? false, userId };

    try {
        const task = await taskService.createTask(params);
        response.status(200).send(task);
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
    const { userId } = request.user;
    const { title } = request.query;

    try {
        const tasks = await taskService.findAllTasks({ title, userId });
        response.status(200).send(tasks.map(it => {
           return {
               ...it,
               isCompleted: Boolean(it.isCompleted),
           }
        }));
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
    const { userId } = request.user;
    const { title } = request.query;
    try {
        const tasks = await taskService.findAllCompletedTasks({ userId, title, isCompleted: true });
        response.status(200).send(tasks.map(it => {
            return {
                ...it,
                isCompleted: Boolean(it.isCompleted),
            }
        }));
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
    const { userId } = request.user;
    const { title } = request.query;

    try {
        const tasks = await taskService.findAllActiveTasks({userId, title, isActive: true});
        response.status(200).send(tasks.map(it => {
            return {
                ...it,
                isCompleted: Boolean(it.isCompleted),
            }
        }));
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
        const task = await taskService.findTaskById({ userId, id });
        response.status(200).send({...task, isCompleted: Boolean(task.isCompleted)});
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

exports.updateById = async (request, response) => {

    const { id } = request.params;
    const { title, description, isCompleted } = request.body;
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
        util.isNumber(id);
        util.isOptionalString(title, apiMessages.TASK.TITLE_NOT_STRING);
        util.isOptionalTitleValid(title);
        util.isOptionalString(description, apiMessages.TASK.DESCRIPTION_NOT_STRING);
        util.isOptionalDescriptionValid(description);
    } catch (error) {
        response.status(400).send({
            message: error.message,
        });
        return;
    }

    try {
        const task = await taskService.updateTaskById({id, userId, title, description, isCompleted});
        response.status(200).send({...task, isCompleted: Boolean(task.isCompleted)});
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

exports.makeCompleted = async (request, response) => {
    const id = request.params.id;
    const { userId } = request.user;
    const { isCompleted } = request.body;

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
        const task = await taskService.makeTaskCompletedOrActiveById({ id, userId, isCompleted });
        response.status(200).send(task);
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

exports.removeById = async (request, response) => {
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
        const task = await taskService.deleteTaskById({ id, userId });
        response.status(200).send(task);
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
