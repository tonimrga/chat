const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const port = process.env.PORT || 3000;
var publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('disconnect' , () => {
    console.log('User disconnected.');
  });

  socket.on('createMessage' , (newMessage, callback) => {
    console.log('New message.', newMessage);
    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
    callback();
    });

    socket.on('createLocation' , (coords) => {

      io.emit('newMessageLocation', generateLocationMessage('Admin', coords.latitude, coords.longitude));

      });

});

server.listen(port, () => {
  console.log("Server started");
});
