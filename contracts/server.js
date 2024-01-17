// server.js

const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, Ethereum Node App!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on https://platform-poap.vercel.app:${port}`);
});
