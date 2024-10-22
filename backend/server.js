require("dotenv").config();
const { log } = console;
const port = process.env.PORT || 4000;
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let crudData = [];

io.on("connection", (socket) => {
  socket.on("formdata", (formData) => {
    log(formData)
  })
  socket.emit("message", "hello world!");
});

httpServer.listen(port, () => {
  log("connection established successfully");
});
