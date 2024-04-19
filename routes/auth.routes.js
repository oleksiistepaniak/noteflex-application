module.exports = app =>
{
    const auth = require("../controllers/auth.controller");
    const router = require("express").Router();

    router.post("/register", auth.register);

    app.use("/api", router);
}