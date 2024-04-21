const Task = require('../models/task.model');
const taskRepository = require('../repositories/task.repo');
const taskDtoMapper = require('../dto/task.dto.mapper');
const util = require('../util/api.util');
const {apiMessages} = require("../util/api.messages");

// params consist of params.userId, params.title, params.description, params.isCompleted
async function createTask(params) {
    const task = new Task({
        title: params.title,
        description: params.description,
        isCompleted: params.isCompleted,
        userId: params.userId,
    });

    const result = await taskRepository.createTask(task);
    return taskDtoMapper.mapTaskToDto({
        id: result.insertId,
        task,
    });
}

// params consist of optional value params.title and required value params.userId
async function findAllTasks(params) {
    const result = await taskRepository.findAllTasks(params);
    return result;
}

// params consist of optional value params.title and required values params.isCompleted to TRUE and params.userId
async function findAllCompletedTasks(params) {
    const result = await taskRepository.findAllTasks(params);
    return result;
}

// params consist of optional value params.title and required values params.isActive to TRUE and params.userId
async function findAllActiveTasks(params) {
    const result = await taskRepository.findAllTasks(params);
    return result;
}

// params consist of required values params.userId and params.id (which is task id)
async function findTaskById(params) {
    const result = await taskRepository.findTaskById(params);
    return result;
}

// params consist of required values params.userId, params.id (which is task id)
// , params.title and params.description
async function updateTaskById(params) {
    const tasks = await taskRepository.findTaskById(params);

    util.apiCheck(!(tasks.length === 0), apiMessages.UPDATE_TASK_BY_ID.TASK_IS_NOT_OWNED);

    await taskRepository.updateTaskById({
        ...params,
        title: params.title ?? tasks[0].title,
        description: params.description ?? tasks[0].description,
        isCompleted: params.isCompleted ?? tasks[0].isCompleted,
    });
    return {
        ...tasks[0],
        title: params.title ?? tasks[0].title,
        description: params.description ?? tasks[0].description,
        isCompleted: params.isCompleted ?? tasks[0].isCompleted,
    };
}

async function makeTaskCompletedOrActiveById(params) {
    const tasks = await taskRepository.findTaskById(params);

    util.apiCheck(!(tasks.length === 0), apiMessages.MAKE_TASK_COMPLETED.TASK_IS_NOT_OWNED);

    await updateTaskById(params);
    return {
        ...tasks[0],
        isCompleted: params.isCompleted,
    }
}

module.exports = {
    createTask,
    findAllTasks,
    findAllCompletedTasks,
    findAllActiveTasks,
    findTaskById,
    updateTaskById,
    makeTaskCompletedOrActiveById,
}
