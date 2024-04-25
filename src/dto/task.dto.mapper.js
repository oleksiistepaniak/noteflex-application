// params consist of params.id and params.task which is nested object with properties
// task.title, task.description, task.isCompleted, task.userId
function mapCreatedTaskToDto(params) {
    const dto = {
        id: params.id,
        title: params.task.title,
        description: params.task.description,
        isCompleted: params.task.isCompleted,
        userId: params.task.userId,
    };
    return dto;
}

// params consist of task.id, task.title, task.description, task.isCompleted and task.userId
function mapTaskToDto(task) {
    const dto = {
        id: task.id,
        title: task.title,
        description: task.description,
        isCompleted: Boolean(task.isCompleted),
        userId: task.userId,
    };
    return dto;
}

module.exports = {
    mapCreatedTaskToDto,
    mapTaskToDto,
}
