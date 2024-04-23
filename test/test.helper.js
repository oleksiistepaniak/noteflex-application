const express = require("express");

let app;
let server;

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
    app = express();
    app.use(express.json());

    app.use(express.urlencoded({extended: true}))

    require("../src/routes/task.routes")(app);
    require("../src/routes/auth.routes")(app);

    server = app.listen(process.env.APP_PORT, async () => {
        await database.initializeDatabase();
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

module.exports = {
    init,
    dispose,
    validUser,
}