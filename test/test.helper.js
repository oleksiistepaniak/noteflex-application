const express = require('express');
const bcrypt = require('bcryptjs');
const request = require('supertest');

let app;
let server;
let db;

const validUsers = [
    {
        email: 'alex@gmail.com',
        password: 'alexALEX228',
        firstName: 'Alex',
        lastName: 'Stepaniak',
        age: 22,
    },
    {
        email: 'bob@gmail.com',
        password: 'bobBOB228',
        firstName: 'Bob',
        lastName: 'Bobson',
        age: 30,
    },
]

const validUser = {
    email: 'alex@gmail.com',
    password: 'alexALEX228',
    firstName: 'Alex',
    lastName: 'Stepaniak',
    age: 22,
};

const validTasks = [
    {
        title: 'English Homework',
        description: 'Exercise 2 Page 132',
        isCompleted: false,
    },
    {
        title: 'Math Homework',
        description: 'Exercise 2, 3 Page 12',
        isCompleted: true,
    },
    {
        title: 'Walking with Tom',
        description: 'tomorrow at 8 o\'clock',
        isCompleted: true,
    },
]

const validTask = {
    title: 'English Homework',
    description: 'Exercise 2 Page 132',
    isCompleted: false,
};

const validNote = {
    title: 'My goals',
    text: `1. Receive an identifier
    2. Move abroad
    3. Buy a house
    4. Buy a car`,
};

const validCredentialsForLogin = {
    email: 'alex@gmail.com',
    password: 'alexALEX228',
};

function init() {
    require('dotenv').config({ path: './.test.env' });
    const database = require('../src/db/database');
    db = database;
    app = express();
    app.use(express.json());

    app.use(express.urlencoded({extended: true}))

    require('../src/routes/auth.routes')(app);
    require('../src/routes/task.routes')(app);
    require('../src/routes/note.routes')(app);

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

async function getValidToken() {
    const response = await request(app)
        .post('/api/login')
        .send({...validCredentialsForLogin});
    return response.body.token;
}

async function setValidUser() {
    const hashedPassword = await bcrypt.hash(validUser.password, parseInt(process.env.SALT));
    await db.executeSqlScript(`INSERT INTO users (email, password, age, firstName, lastName)
    VALUES (?, ?, ?, ?, ?);`, [validUser.email, hashedPassword, validUser.age, validUser.firstName, validUser.lastName]);
}

async function setValidUsers() {
    for (const it of validUsers) {
        const hashedPassword = await bcrypt.hash(it.password, parseInt(process.env.SALT));
        await db.executeSqlScript(`INSERT INTO users (email, password, age, firstName, lastName)
    VALUES (?, ?, ?, ?, ?);`, [it.email, hashedPassword, it.age, it.firstName, it.lastName]);
    }
}

async function setValidTask() {
    await db.executeSqlScript(`INSERT INTO tasks (title, description, isCompleted, userId)
    VALUES (?, ?, ?, ?);`, [validTask.title, validTask.description, validTask.isCompleted, 1]);
}

async function setValidTasks() {
    for (const it of validTasks) {
        await db.executeSqlScript(`INSERT INTO tasks (title, description, isCompleted, userId)
    VALUES (?, ?, ?, ?);`, [it.title, it.description, it.isCompleted, 1]);
    }
}

async function setValidNote() {
    await db.executeSqlScript(`INSERT INTO notes (title, text, userId) VALUES (?, ?, ?)`,
        [validNote.title, validNote.text, 1]);
}

async function initDb() {
    await db.initializeDatabase();
}

async function clearDb() {
    await db.executeSqlScript('DROP TABLE notes;');
    await db.executeSqlScript('DROP TABLE tasks;');
    await db.executeSqlScript('DROP TABLE users;');
}

module.exports = {
    init,
    dispose,
    validUser,
    validUsers,
    validCredentialsForLogin,
    validTask,
    validTasks,
    validNote,
    clearDb,
    initDb,
    setValidUser,
    setValidUsers,
    setValidTask,
    setValidTasks,
    getValidToken,
    setValidNote,
}
