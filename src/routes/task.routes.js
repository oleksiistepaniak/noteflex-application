const authMiddleware = require('../middlewares/auth.middleware');

module.exports = app => {
    const notes = require("../controllers/task.controller");
    const router = require("express").Router();
    router.use(authMiddleware);

    /**
     * @swagger
     * /api/tasks:
     *   post:
     *     tags:
     *       - Task
     *     summary: Create a new task
     *     description: Create a new task with the provided information.
     *     parameters:
     *       - in: header
     *         name: Authorization
     *         required: true
     *         schema:
     *           type: string
     *           description: Access token for authentication
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *                 example: English Homework
     *               description:
     *                 type: string
     *                 example: Ex 2 page 133
     *               isCompleted:
     *                 type: boolean
     *                 example: true
     *     responses:
     *       '200':
     *         description: Task created successfully
     *       '400':
     *         description: Bad request or validation error
     *       '401':
     *         description: Unauthorized
     *       '500':
     *         description: Internal server error
     */
    router.post("/", notes.create);
    router.get("/", notes.findAll);
    router.get("/completed", notes.findAllCompleted);
    router.get("/active", notes.findAllActive);
    router.get("/:id", notes.findOneById);
    router.put("/:id", notes.updateById);
    router.delete("/:id", notes.removeById);

    app.use("/api/tasks", router);
}
