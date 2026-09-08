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
