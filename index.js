const express = require("express");
const socket = require("socket.io");

// App setup
const PORT = process.env.PORT || 3000;
const app = express();
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
  console.log(`ws://localhost:${PORT}`);
});

// Static files
// app.use(express.static("public"));

// Socket setup
const io = socket(server);

io.on("connection", function (socket) {
  console.log("Made socket connection");

  socket.on('currentSketch', function (data) {
    console.log(`currentSketch ${data}`);
    io.emit('currentSketch', `${data}`)
  });

  socket.on('allSketches', function (data) {
    console.log(`allSketches ${data}`);
    io.emit('allSketches', `${data}`)
  });

   //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
      console.log('A user disconnected');
  });
});