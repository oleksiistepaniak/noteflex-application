const sql = require('../database');
const bcrypt = require("bcryptjs");

const User = function (newUser)
{
    this.email = newUser.email;
    this.firstName = newUser.firstName;
    this.lastName = newUser.lastName;
    this.password = newUser.password;
    this.age = newUser.age;
}

User.create = async (newUser, result) =>
{
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;

    sql.query("INSERT INTO users SET ?", newUser, (error, response) =>
    {
        if (error)
        {
            console.log(error);
            result(error, null);
            return;
        }

        console.log("new user registered: ", { id: response.insertId });
        result(null, { id: response.insertId });
    });
};

User.findOneByEmail = email =>
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

module.exports = User;