const authMiddleware = require('../middlewares/auth.middleware');

module.exports = app => {
    const tasks = require("../controllers/task.controller");
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
    router.post("/", tasks.create);
    router.get("/", tasks.findAll);
    router.get("/completed", tasks.findAllCompleted);
    router.get("/active", tasks.findAllActive);
    router.get("/:id", tasks.findOneById);
    router.put("/:id", tasks.updateById);
    router.delete("/:id", tasks.removeById);

    app.use("/api/tasks", router);
}
