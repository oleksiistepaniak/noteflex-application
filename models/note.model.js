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

module.exports = Note;