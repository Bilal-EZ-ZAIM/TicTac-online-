let userOline = [];
let challengeId;
const socket = (io) => {
  io.on("connection", (socket) => {
    socket.on("disconnect", () => {
      userOline = userOline.filter((id) => id !== socket.id);
      io.emit("userOnline", userOline);
      console.log(`User disconnected: ${socket.id}`);
    });

    userOline.push(socket.id);
    console.log(userOline);
    console.log("A user connected");

    io.emit("userOnline", userOline);
    socket.on("messageFromClient", (message) => {
      console.log("Received message from client:", message);

      io.emit("messageFromServer", message);
    });

    socket.on("chatapp", (msg) => {
      console.log(msg);
      io.emit("getMessager", msg);
    });

    socket.on("setUsername", (jeux) => {
      console.log("jeux");

      console.log(jeux.challengerUsername);

      console.log("jeux");

      const { challengerUsername } = jeux;

      console.log(challengerUsername);
      socket.join(challengerUsername);
      challengeId = jeux.challengeId;

      io.to(jeux.challengeId).emit("newChallenge", jeux);
    });

    socket.on("start-game", (room) => {
      console.log("Start game with ids:", room);
      socket.join(room);
      io.to(room).emit("commencer", {
        accepter: "accepter",
        room,
        currentPlayer: socket.id,
        challengr: challengeId,
      });
    });

    socket.on("getIndex", (data) => {
      console.log("User responded:", data);
      console.log(data);
      console.log("challenged id = " + challengeId);

      io.to(data.room).emit("sendIndex", {
        index: data.index,
        currentPlayer: data.challenger,
      });
    });

    socket.on("getplyer", (data) => {
      console.log("GetPlayer", data);

      io.to(data.room).emit("sendPlyer", {
        index: data.index,
        currentPlayer: data.challenger,
      });
    });



    // rooms

    socket.on("join-room", (roomName) => {
      console.log(`User ${socket.id} joined room:`, roomName);

      socket.join(roomName);

      socket.on("send-messa", (message) => {
        console.log(`Message from ${socket.id} in room ${roomName}:`, message);

        io.to(roomName).emit("receive-mes", message);
      });
    });

    // room
  });
};

module.exports = socket;

// OflEZzrFDJ96nFOLAAAk code amazone
