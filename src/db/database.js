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

function executeSqlScript(sqlScript, array) {
    return new Promise((resolve, reject) => {
        pool.getConnection((error, connection) => {
            if (error) {
                reject(error);
                return;
            }
            connection.query(sqlScript, array, (error, results, _fields) => {
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


const createDbSql = fs.readFileSync('./src/db/create_db.sql', 'utf8');
const createTestDbSql = fs.readFileSync('./src/db/create_test_db.sql', 'utf8');
const useDbSql = fs.readFileSync('./src/db/use_db.sql', 'utf8');
const useTestDbSql = fs.readFileSync('./src/db/use_test_db.sql', 'utf8');
const createUsersTableSql = fs.readFileSync('./src/db/create_users_table.sql', 'utf8');
const createTasksTableSql = fs.readFileSync('./src/db/create_tasks_table.sql', 'utf8');
const createNotesTableSql = fs.readFileSync('./src/db/create_notes_table.sql', 'utf8');

async function initializeDatabase() {
    try {
        if (process.env.IS_TEST) {
            await executeSqlScript(createTestDbSql);
            await executeSqlScript(useTestDbSql);
        } else {
            await executeSqlScript(createDbSql);
            await executeSqlScript(useDbSql);
        }
        await executeSqlScript(createUsersTableSql);
        await executeSqlScript(createTasksTableSql);
        await executeSqlScript(createNotesTableSql);
        console.log('Database initialized successfully!');
    } catch (error) {
        console.error('Error during initializing database: ', error);
    }
}

module.exports = {
    sql: pool,
    initializeDatabase,
    executeSqlScript,
};
