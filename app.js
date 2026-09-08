// Import Express
const express = require("express");


// Creates Express application
const app = express();


// Allows Express to read JSON data
app.use(express.json());


// This port is used by the server
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});