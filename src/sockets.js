module.exports = function(io) {

    let nicknames = [];

    cpl = (word) => { //funcion primera mayuscula
        return word
        .toLowerCase()
        .replace(/\w/, firstLetter => firstLetter.toUpperCase());
    }

    io.on('connection', socket => {
        console.log("New user connected!!!");

        socket.on('nuevo usuario', (data, cb) => {
            console.log(data);
            if(data in nicknames){
                cb(false);
            } else {
                cb(true);
                socket.nickname = cpl(data);
                nicknames.push(socket.nickname.trim()); //trim quitamos espacios en blanco
                updateNames();
            }
        });

        socket.on('enviando data', data => {
            io.sockets.emit('nuevo mensaje', { //enviamos la data en json dentro de un mismo objeto
                msg: data,
                nick: socket.nickname
            });
        });

        //Evento desconectar usuario
        socket.on('disconnect', data => {
            if(!socket.nickname) return;
            console.log("desconetado User");
            nicknames.splice(nicknames.indexOf(socket.nickname), 1);
            updateNames();
        });

        let updateNames= () => io.sockets.emit('nombres de usuarios', nicknames);
    });
}