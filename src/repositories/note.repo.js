const database = require('../db/database');

function createNote(newNote) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO notes SET ?';
        database.sql.query(query, newNote, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        })
    });
}

module.exports = {
    createNote,
}