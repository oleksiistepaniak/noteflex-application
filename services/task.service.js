const Task = require('../models/task.model');
const taskRepository = require('../repositories/task.repo');
const taskDtoMapper = require('../dto/task.dto.mapper');

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

module.exports = {
    createTask,
    findAllTasks,
    findAllCompletedTasks,
    findAllActiveTasks,
    findTaskById,
}
