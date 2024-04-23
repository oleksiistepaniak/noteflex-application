const express = require("express");
const bcrypt = require('bcryptjs');

let app;
let server;
let db;

const validUser = {
    email: 'alex@gmail.com',
    password: 'alexALEX228',
    firstName: 'Alex',
    lastName: 'Stepaniak',
    age: 22,
};

const validCredentialsForLogin = {
    email: 'alex@gmail.com',
    password: 'alexALEX228',
};

function init() {
    require("dotenv").config({ path: './.test.env' });
    const database = require("../src/db/database");
    db = database;
    app = express();
    app.use(express.json());

    app.use(express.urlencoded({extended: true}))

    require("../src/routes/task.routes")(app);
    require("../src/routes/auth.routes")(app);

    server = app.listen(process.env.APP_PORT, async () => {
        // await database.initializeDatabase();
        console.log(`Server has started its work successfully on port: ${process.env.APP_PORT}`);
    });
    return app;
}

function dispose() {
    if (server) {
        server.close();
        console.log('Server has finished its work successfully!');
    }
}

async function setValidUser() {
    const hashedPassword = await bcrypt.hash(validUser.password, 10);
    await db.executeSqlScript(`INSERT INTO users (email, password, age, firstName, lastName)
    VALUES (?, ?, ?, ?, ?);`, [validUser.email, hashedPassword, validUser.age, validUser.firstName, validUser.lastName]);
}

async function initDb() {
    await db.initializeDatabase();
}

async function clearDb() {
    await db.executeSqlScript('DROP TABLE tasks;');
    await db.executeSqlScript('DROP TABLE users;');
}

module.exports = {
    init,
    dispose,
    validUser,
    validCredentialsForLogin,
    clearDb,
    initDb,
    setValidUser,
}