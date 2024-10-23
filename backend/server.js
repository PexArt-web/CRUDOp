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
  // receiving data
  socket.on("formData", (formData) => {
    crudData.push(formData);
    socket.emit("crudData", crudData);
    //editing data received  
    socket.on("editData", (response) => {
      let currentData = crudData.findIndex(data => data.id === response.id)
      if (currentData != -1){
        crudData[currentData] ={...crudData[currentData], ...response} 
      }
    })
    // deleting data received
    socket.on("deleteData", (id) => {
      let currentData = crudData.findIndex(data => data.id === id)

      if(currentData != -1){
        crudData.splice(currentData, 1)
      }
    })
    setInterval(() => {
      socket.emit("crudData", crudData);
    }, 2000);
  });
});

httpServer.listen(port, () => {
  log("connection established successfully");
});
