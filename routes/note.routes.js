module.exports = app => {
    const notes = require("../controllers/note.controller");
    const router = require("express").Router();

    router.post("/", notes.create);

    app.use("/api/notes", router);
}