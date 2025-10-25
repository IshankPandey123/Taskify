const express = require('express');
const cors = require('cors');
const path = require('path');
const conn = require('./conn/conn');
const auth = require('./routes/auth');
const list = require('./routes/list');
const app = express();

// Connect to MongoDB
conn();

// Enable CORS for frontend communication
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? false : 'http://localhost:3001',
  credentials: true
}));

app.use(express.json());

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.use("/api/v1" , auth);
app.use("/api/v2" , list);

// Catch-all handler: send back React's index.html file for any non-API routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});