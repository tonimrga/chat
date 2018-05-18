const path = require('path');
const http = require('http');

const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const port = process.env.PORT || 3000;
var publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');



  socket.on('disconnect' , () => {
    var user = users.removeUser(socket.id);
    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} se odjavio.`));
    }
  });

  socket.on('join' , (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
        return callback('Ime i tema moraju biti upisani');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Dobro došli u ToniChat!'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} se pridružio.` ));


    callback();
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
