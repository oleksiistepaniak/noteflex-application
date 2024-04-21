const sql = require("../database");

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
    findUserByEmail,
}
