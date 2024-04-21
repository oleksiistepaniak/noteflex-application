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

module.exports = {
    createTask,
}