module.exports = app => {
    const auth = require("../controllers/auth.controller");
    const router = require("express").Router();

    /**
     * @swagger
     * /api/register:
     *   post:
     *     tags:
     *       - Auth
     *     summary: Register a new user
     *     description: Register a new user with the provided information.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 example: alex@gmail.com
     *               password:
     *                 type: string
     *                 example: alexALEX228
     *               firstName:
     *                 type: string
     *                 example: Alex
     *               lastName:
     *                 type: string
     *                 example: Stepaniak
     *               age:
     *                 type: integer
     *                 example: 22
     *     responses:
     *       '200':
     *         description: User registered successfully
     *       '400':
     *         description: Bad request or validation error
     *       '500':
     *         description: Internal server error
     */
    router.post("/register", auth.register);

    /**
     * @swagger
     * /api/login:
     *   post:
     *     tags:
     *       - Auth
     *     summary: Authenticate a user
     *     description: Authenticate a user with the provided email and password.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 example: alex@gmail.com
     *               password:
     *                 type: string
     *                 example: alexALEX228
     *     responses:
     *       '200':
     *         description: User authenticated successfully
     *       '401':
     *         description: Unauthorized - invalid email or password
     *       '500':
     *         description: Internal server error
     */
    router.post("/login", auth.login);

    app.use("/api", router);
}
