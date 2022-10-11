const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

server.listen(3001, () => {
  console.log("Server Running!!");
});
