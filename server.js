const app = require("express")();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const httpServer = require("http").Server(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// io.engine.generateId = function (req) {
//   return uuidv4();
// };

// For authenticating socket
// io.use((socket, next) => {
//   // Example: Fetching token from socket
//   console.log(socket.handshake.query.token || socket.handshake.auth.token);

//   // Example: Sending error
//   const err = new Error("Unauthorized");
//   err.data = { message: "Token is invalid or revoked" };
//   next(err);
// });

io.on("connection", function (socket) {
  console.log(`User: ${socket.id} = ${socket.client.id} connected`);

  socket.on("send-message", function (data) {
    console.log(data);
    socket.broadcast.emit("new-message", data);
  });
});

const port = 3000;

httpServer.listen(port, () => console.log(`Listening on port ${port}`));
