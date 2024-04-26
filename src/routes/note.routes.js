const authMiddleware = require('../middlewares/auth.middleware');

module.exports = app => {
    const notes = require('../controllers/note.controller');
    const router = require('express').Router();
    router.use(authMiddleware);

    router.post('/', notes.create);
    router.get('/', notes.findAll);

    app.use('/api/notes', router);
}
