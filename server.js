const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8888;
const SPRING_URL = process.env.SPRING_URL || 'http://localhost:7788';

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Catchall handler to send back React's index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Proxying API requests to ${SPRING_URL}`);
});
