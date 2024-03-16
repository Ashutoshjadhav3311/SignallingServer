const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Middleware to enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.header('Access-Control-Allow-Methods', 'GET, POST'); // Allow GET and POST requests
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specified headers
  next();
});

// Handle WebSocket connections
io.on('connection', socket => {
  console.log('A user connected');

  // Handle signaling messages
  socket.on('message', message => {
    console.log('Received message:', message);
    // Broadcast the message to all connected clients except the sender
    socket.broadcast.emit('message', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
