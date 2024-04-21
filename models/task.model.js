const sql = require('../db/database');

const Task = function (newTask)
{
    this.title = newTask.title;
    this.description = newTask.description;
    this.isCompleted = newTask.isCompleted;
    this.userId = newTask.userId;
};

Task.findAll = (title, result) =>
{
    let query = "SELECT * FROM notes";

    if (title)
        query += ` WHERE title LIKE '%${title}%'`;

    sql.query(query, (error, response) =>
    {
        if (error)
        {
            console.log(error);
            result(error, null);
            return;
        }

        console.log("notes: ", response);
        result(null, response);
    })
}

Task.findOneById = (id, result) =>
{
    const query = `SELECT * FROM notes WHERE id = ${id}`;

    sql.query(query, (error, response) =>
    {
        if (error)
        {
            console.log(error);
            result(error, null);
            return;
        }

        console.log(`note by id: ${id} ${response}`);
        result(null, response);
    })
}

Task.findAllCompleted = result =>
{
    let query = "SELECT * FROM notes WHERE isCompleted = TRUE";

    sql.query(query, (error, response) =>
    {
        if (error)
        {
            console.log(error);
            result(error, null);
            return;
        }

        console.log("completed notes: ", response);
        result(null, response);
    })
}

Task.findAllActive = result =>
{
    let query = "SELECT * FROM notes WHERE isCompleted = FALSE";

    sql.query(query, (error, response) =>
    {
        if (error)
        {
            console.error(error);
            result(error, null);
            return;
        }

        console.log("active notes: ", response);
        result(null, response);
    })
}

Task.updateById = (id, note, result) =>
{
    const query = "UPDATE notes SET title = ?, description = ?, isCompleted = ? WHERE id = ?";

    sql.query(query, [note.title, note.description, note.isCompleted, id], (error, response) => {
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

        console.log("updated note: ", {id: id, ...note});
        result(null, {id: id, ...note});
    })
}

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
