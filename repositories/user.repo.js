const sql = require("../database");

function createUser(newUser)
{
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO users SET ?`;
        sql.query(query, newUser, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        })
    })
}

function findUserByEmail(email)
{
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM users WHERE email = ?`;
        sql.query(query, [email], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
}

module.exports = {
    createUser,
    findUserByEmail,
}
