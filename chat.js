const express = require('express'); // include this just like a php include
const chat = express();
const io = require('socket.io')(); // active the chat plugin
//add routes
chat.use(require('./files/index'));

// server up static files
chat.use(express.static('links'));

//chat.get('/', (req, res)=>{
//    res.sendFile(__dirname+ '/index.html');
//
//});
//chat.get('/contact', (req, res)=>{
//    res.sendFile(__dirname+ '/contact.html');
//
//});
//chat.get('/portfolio', (req, res)=>{
//    res.sendFile(__dirname+ '/portfolio.html');
//
//});



const server = chat.listen(3000, () => {
    console.log('You are now on port 3000');
});



io.attach(server);

io.on('connection', socket => {
    console.log('user has connected');

    // io.emit('chat Message', {for : 'everyone', message : `${socket.id} is here!`});


    socket.on('typing', function(data){
            socket.emit('typing', data)
        });

    //handle message send from the client
    socket.on('chat message', msg => {
      io.emit('chat Message', {for : 'everyone', message : msg});
    });




    // socket.on('typing', msg => {
    //   io.emit('typing', {for : 'everyone', username : msg});
    // });



    // socket.on('is typing', function(data){
    //   socket.broadcast.emit('typing', {username: data.username});
    // });



    socket.on('disconnect', () => {
        console.log('a user has disconnected');

    io.emit('disconnect message', `${socket.id} has left the building!`);
    });
});
