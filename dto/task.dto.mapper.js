// params consist of params.id and params.task which is nested object with properties
// task.title, task.description, task.isCompleted, task.userId
function mapTaskToDto(params) {
    const dto = {
        id: params.id,
        title: params.task.title,
        description: params.task.description,
        isCompleted: params.task.isCompleted,
        userId: params.task.userId,
    };
    return dto;
}

module.exports = {
    mapTaskToDto,
}
