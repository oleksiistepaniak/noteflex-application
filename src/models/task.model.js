const Task = function (newTask)
{
    this.title = newTask.title;
    this.description = newTask.description;
    this.isCompleted = newTask.isCompleted;
    this.userId = newTask.userId;
};

module.exports = Task;
