const pool = require('../db/db');


function toTask(row) {
  return {
    id: row.id,
    title: row.title,
    is_completed: !!row.is_completed
  };
}

// I added parameterized queries (the ? placeholders) throughout this model
// instead of building SQL strings by hand. Here, we let mysql2 escape the
// values for us. This is what prevents SQL injection from user input.
async function createTask(title) {
  const [result] = await pool.query(
    'INSERT INTO tasks (title, is_completed) VALUES (?, ?)',
    [title, false]
  );
  return result.insertId;
}

async function getAllTasks() {
  const [rows] = await pool.query('SELECT id, title, is_completed FROM tasks');
  return rows.map(toTask);
}

async function getTaskById(id) {
  const [rows] = await pool.query(
    'SELECT id, title, is_completed FROM tasks WHERE id = ?',
    [id]
  );
  return rows.length ? toTask(rows[0]) : null;
}

async function updateTask(id, { title, is_completed }) {
  const existing = await getTaskById(id);
  if (!existing) return false;

  const newTitle = title !== undefined ? title : existing.title;
  const newIsCompleted =
    is_completed !== undefined ? is_completed : existing.is_completed;

  await pool.query(
    'UPDATE tasks SET title = ?, is_completed = ? WHERE id = ?',
    [newTitle, newIsCompleted, id]
  );
  return true;
}

async function deleteTask(id) {
  await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
}

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
};
