const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

let clients = [];

io.on("connection", socket => {
  if (clients.length >= 2) {
    console.log("Extra user rejected");
    socket.disconnect();
    return;
  }

  clients.push(socket.id);
  console.log("User connected:", socket.id, "Total:", clients.length);

  // Send role
  socket.emit("role", clients.length === 1 ? "caller" : "callee");

  socket.on("offer", offer => socket.broadcast.emit("offer", offer));
  socket.on("answer", answer => socket.broadcast.emit("answer", answer));
  socket.on("ice-candidate", c => socket.broadcast.emit("ice-candidate", c));

  socket.on("disconnect", () => {
    clients = clients.filter(id => id !== socket.id);
    console.log("User disconnected. Total:", clients.length);
  });
});

server.listen(3000, () =>
  console.log("Signaling server running on port 3000")
);
