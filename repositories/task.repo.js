const sql = require('../db/database');

function createTask(newTask) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO tasks SET ?';
        sql.query(query, newTask, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        })
    });
}