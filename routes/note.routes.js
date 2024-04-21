const authMiddleware = require('../middlewares/auth.middleware');

module.exports = app => {
    const notes = require("../controllers/task.controller");
    const router = require("express").Router();
    router.use(authMiddleware);

    router.post("/", notes.create);
    router.get("/", notes.findAll);
    router.get("/completed", notes.findAllCompleted);
    router.get("/active", notes.findAllActive);
    router.get("/:id", notes.findOneById);
    router.put("/:id", notes.updateById);
    router.patch("/makeCompleted/:id", notes.makeCompleted);
    router.delete("/:id", notes.removeById);

    app.use("/api/notes", router);
}
