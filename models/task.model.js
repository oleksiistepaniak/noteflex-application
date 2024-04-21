const sql = require('../db/database');

const Task = function (newTask)
{
    this.title = newTask.title;
    this.description = newTask.description;
    this.isCompleted = newTask.isCompleted;
    this.userId = newTask.userId;
};

Task.makeCompleted = (id, result) =>
{
    const query = `UPDATE notes SET isCompleted = TRUE WHERE id = ${id}`;

    sql.query(query, (error, response) =>
    {
        if (error)
        {
            console.error(error);
            result(error, null);
            return;
        }

        if (response.affectedRows === 0)
        {
            result({kind: "not_found"}, null);
            return;
        }

        console.log(`completed note by id: ${id}. data: ${response}`);
        result(null, {id: id, ...response});
    })
}

Task.removeById = (id, result) =>
{
    const query = `DELETE FROM notes WHERE id = ${id}`;

    sql.query(query, (error, response) =>
    {
        if (error)
        {
            console.error(error);
            result(error, null);
            return;
        }

        if (response.affectedRows === 0)
        {
            result({kind: "not_found"}, null);
            return;
        }

        console.log(`deleted note by id: ${id}. data: ${response}`);
        result(null, {id: id, message: `You have successfully removed note by id ${id}`});
    })
}

module.exports = Task;
