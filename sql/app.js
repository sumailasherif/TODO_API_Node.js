require('dotenv').config();
const express = require('express');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// I added this root route as a quick health check. Here, we just confirm
// the server is up without touching the database. This is useful for
// verifying the API is running before testing the /v1/tasks endpoints.
app.get('/', (req, res) => {
  res.send('API is running!');
});
