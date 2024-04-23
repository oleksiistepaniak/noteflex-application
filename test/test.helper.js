const express = require("express");

const validUser = {
    email: 'alex@gmail.com',
    password: 'alexALEX228',
    firstName: 'Alex',
    lastName: 'Stepaniak',
    age: 22,
};

function init() {
    require("dotenv").config({ path: './.test.env' });
    const database = require("../src/db/database");
    const app = express();
    app.use(express.json());

    app.use(express.urlencoded({extended: true}))

    require("../src/routes/task.routes")(app);
    require("../src/routes/auth.routes")(app);

    const server = app.listen(process.env.APP_PORT, async () => {
        await database.initializeDatabase();
        console.log(`Server has started its work successfully on port: ${process.env.APP_PORT}`);
    });
    return {
        app,
        server,
    };
}

module.exports = {
    init,
    validUser,
}