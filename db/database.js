const mysql = require("mysql2");
const fs = require('fs');

const pool = mysql.createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
});

function executeSqlScript(sqlScript) {
    return new Promise((resolve, reject) => {
        pool.getConnection((error, connection) => {
            if (error) {
                reject(error);
                return;
            }
            connection.query(sqlScript, (error, results, _fields) => {
                connection.release();
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    })
}

const createUsersTableSql = fs.readFileSync('./db/create_users_table.sql', 'utf8');
const createTasksTableSql = fs.readFileSync('./db/create_tasks_table.sql', 'utf8');

async function initializeDatabase() {
    try {
        await executeSqlScript(createUsersTableSql);
        await executeSqlScript(createTasksTableSql);
        console.log('Database initialized successfully!');
    } catch (error) {
        console.error('Error during initializing database: ', error);
    }
}

module.exports = {
    sql: pool,
    initializeDatabase,
};
