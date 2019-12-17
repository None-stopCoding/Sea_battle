const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

server.listen(8080);

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

connections = [];

io.sockets.on('connection', function(socket) {
    console.log("Успешное соединение");
    connections.push(socket);

    socket.on('disconnect', function() {
        connections.splice(connections.indexOf(socket), 1);
        console.log("Отключились");
    });

    socket.on('send mess', function(data) {
        io.sockets.emit('add mess', {mess: data.mess, name: data.name});
    });
});