const sql = require('../database');

const Note = function (newNote)
{
    this.title = newNote.title;
    this.description = newNote.description;
    this.isCompleted = newNote.isCompleted;
};

Note.create = (newNote, result) =>
{
    sql.query("INSERT INTO notes SET ?", newNote, (error, response) =>
    {
        if (error)
        {
            console.log(error);
            result(error, null);
            return;
        }

        console.log("created note: ", { id: response.insertId, ...newNote });
        result(null, { id: response.insertId, ...newNote });
    });
};

Note.findAll = (title, result) =>
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

module.exports = Note;