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

function findAllTasks(params) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM tasks WHERE userId = ${params.userId}`;
        if (params.title) {
            query += ` AND title LIKE '%${params.title}%'`;
        }
        if (params.isCompleted) {
            query += ` AND isCompleted = TRUE`;
        }
        if (params.isActive) {
            query += ` AND isCompleted = FALSE`;
        }
        database.sql.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        })
    });
}

function findTaskById(params) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM tasks WHERE userId = ${params.userId} AND id = ${params.id}`;
        database.sql.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        })
    });
}

function updateTaskById(params) {
    return new Promise((resolve, reject) => {
        const query = `UPDATE tasks SET title = ?, description = ?, isCompleted = ? WHERE id = ? AND userId = ?`;
        database.sql.query(query,
            [params.title, params.description, params.isCompleted, params.id, params.userId],
            (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        })
    })
}

function deleteTaskById(params) {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM tasks WHERE id = ${params.id} AND userId = ${params.userId}`;
        database.sql.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        })
    })
}

module.exports = {
    createTask,
    findAllTasks,
    findTaskById,
    updateTaskById,
    deleteTaskById,
}
