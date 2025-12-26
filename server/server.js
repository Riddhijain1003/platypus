const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

let clients = [];
let readyCount = 0;

io.on("connection", socket => {
  if (clients.length >= 2) {
    socket.disconnect();
    return;
  }

  clients.push(socket.id);
  console.log("User connected:", socket.id);

  socket.emit("role", clients.length === 1 ? "caller" : "callee");

  socket.on("ready", () => {
    readyCount++;
    console.log("Ready count:", readyCount);

    if (readyCount === 2) {
      io.emit("both-ready");
    }
  });

  socket.on("offer", o => socket.broadcast.emit("offer", o));
  socket.on("answer", a => socket.broadcast.emit("answer", a));
  socket.on("ice-candidate", c => socket.broadcast.emit("ice-candidate", c));

  socket.on("disconnect", () => {
    clients = clients.filter(id => id !== socket.id);
    readyCount = 0;
    console.log("User disconnected");
  });
});

server.listen(3000, () =>
  console.log("Signaling server running on port 3000")
);
