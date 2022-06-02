const http = require('http');
const path =require('path');

const express = require('express');
const socketio = require('socket.io');


const app = express();
const server = http.createServer(app); //create server
const io = socketio(server);

//settings
app.set('port', process.env.PORT || 3000);

require('./sockets')(io);

app.use(express.static(path.join(__dirname, 'public')));

server.listen(3000, "192.168.100.11", () => {  // <- Coloca la ip de tu servidor local
    console.log("Active port", app.get('port'));
});