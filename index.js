const express = require("express");
const { createServer } = require("node:http");
const socket = require("./socket/socket");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/game", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "game.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});


const io = require("socket.io")(server);

socket(io);

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
