const database = require('../db/database');

function createTask(newTask) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO tasks SET ?';
        database.sql.query(query, newTask, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        })
    });
}

module.exports = {
    createTask,
}