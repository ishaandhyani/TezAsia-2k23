
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const port = 8000;
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(cors({
	origin: "*",
	credentials: true
}))

const io = socketIO(server, {
  cors: {
    origin: '*',
  }
});
server.listen(port, function () {
  console.log('listening on *:' + port);
});

const rooms = {}; // Store rooms and their respective players

io.on('connection', function (socket) {
  console.log('New connection');

  socket.on('createRoom', function (room) {
    socket.join(room);
    rooms[room] = [socket.id];
    console.log(`Room ${room} created by ${socket.id}`);
  });

  socket.on('joinRoom', function (room) {
    const players = rooms[room];
    if (players && players.length === 1) {
      socket.join(room);
      players.push(socket.id);
      io.to(room).emit('move', { fen: "start" }); // Start the game
      console.log(`${socket.id} joined room ${room}`);
    } else {
      console.log(`Room ${room} is full or doesn't exist`);
    }
  });

  socket.on('move', function (msg) {
    socket.to(msg.room).emit('move', msg);
  });
});
