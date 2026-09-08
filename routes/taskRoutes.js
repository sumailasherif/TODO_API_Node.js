const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskcontroller');

// I added this router to a controller function, with no logic of its own. Here, we mount it at /v1/tasks in app.js, so these paths are relative to that prefix.
router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
