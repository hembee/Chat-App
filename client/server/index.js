const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://hembee.github.io/Chat-App",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID:${socket.id} joined room ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.password).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen("https://hembee.github.io/Chat-App", () => {
  console.log("Server Running!!");
});
