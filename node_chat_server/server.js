let express = require('express');
let http = require('http');
let socketIo = require('socket.io');

let app = express();
let server = http.Server(app);
let socketIOStatic = socketIo(server);

socketIOStatic.on('connection', (socket) => {
  console.log('New user connected: ', socket.id);
  socket.on('new-message', (message) => {
    console.log('New message from: ', socket.id, ' Message: ', message);
    socketIOStatic.emit('new-message', 'emit:' + message);
  });
});

server.listen(3000, 'localhost', -1, () => {
  console.log('Server listening on port 3000');
  console.log('Ctrl + C to stop the server.');
});