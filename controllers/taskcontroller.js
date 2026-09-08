const taskModel = require('../models/taskmodel');

// I added a title check before touching the database. Here, we reject
// missing or non-string titles with a 400 rather than letting a bad error
// happen. This is a boundary check, since req.body comes straight from the
// client and can't be trusted.
async function createTask(req, res) {
  try {
    const { title } = req.body;
    if (!title || typeof title !== 'string') {
      return res.status(400).json({ error: 'title is required' });
    }

    const id = await taskModel.createTask(title);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getAllTasks(req, res) {
  try {
    const tasks = await taskModel.getAllTasks();
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}


// I added the 404 HTTP error handling .
// Here, we return { error: 'There is no task at that id' } when the mode finds nothing.
//  This is the only outcome distinguishing a bad id from a server error, so we return 404 rather than 500.
async function getTaskById(req, res) {
  try {
    const task = await taskModel.getTaskById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'There is no task at that id' });// error message for when a task with the given id is not found
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });// returning a server error for any unexpected issues
  }
}
async function updateTask(req, res) {
  try {
    const { title, is_completed } = req.body;
    const updated = await taskModel.updateTask(req.params.id, {
      title,
      is_completed
    });

    if (!updated) {
      return res.status(404).json({ error: 'There is no task at that id' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

//deleting an id that doesn't exist should still return 204, not 404.
async function deleteTask(req, res) {
  try {
    await taskModel.deleteTask(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
};
