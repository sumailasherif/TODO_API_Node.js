require('dotenv').config();
// Import Express
const express = require("express");
//imports the  routes
const taskRoutes = require('./routes/taskRoutes');

// Creates Express application
const app = express();

// verifying the API is running before testing the /v1/tasks endpoints.
app.get('/', (req, res) => {
  res.send('API is running!');
});

// Allows Express to read JSON data
app.use(express.json());


app.use('/v1/tasks', taskRoutes);

// This port is used by the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Task API is ready and listening on port ${PORT}`);
});

module.exports = app;






