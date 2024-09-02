const socket = io();

// Elements
const gameOptions = document.querySelector(".game-options");
const selectBox = document.querySelector(".select-box");
const playBoard = document.querySelector(".play-board");
const resultBox = document.querySelector(".result-box");
const createGameBtn = document.getElementById("createGame");
const startGameBtn = document.getElementById("startGame");

// Event listeners
createGameBtn.addEventListener("click", () => {
  socket.emit("createGame");
  gameOptions.style.display = "none";
  selectBox.style.display = "block";
});

startGameBtn.addEventListener("click", () => {
  socket.emit("startGame");
  gameOptions.style.display = "none";
  selectBox.style.display = "block";
});

socket.on("gameCreated", (gameId) => {
  console.log("Game created with ID:", gameId);
  playBoard.style.display = "block";
});

socket.on("gameStarted", (gameId) => {
  console.log("Game started with ID:", gameId);
  playBoard.style.display = "block";
});

// Additional code for the game logic will go here...
