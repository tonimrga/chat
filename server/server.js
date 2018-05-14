const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
var publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) =>{

      console.log('New user connected');

      socket.on('disconnect' , () =>{
        console.log('User disconnected.');
      });

});

server.listen(port, () => {
  console.log("Server started");
});