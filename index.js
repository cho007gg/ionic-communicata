var port = process.env.PORT || 3000,
  app = require('express')(),
  http = require('http').Server(app),
  io = require('socket.io')(http);


// Allow CORS support and remote requests to the service
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  next();
});


// Set up route
app.get('/', (req, res) => {
  res.json({message: 'hello world'});
})
;


// Manage the Socket server event listener methods and
// how realtime chat messages are handled/broadcast
io.on('connection', (socket) => {

  /* Set up a disconnect event*/
  socket.on('disconnect', () => {
    // Broadcast the event and return a JavaScript map of values
    // for use within the Ionic app
    io.emit('user-exited', {user: socket.alias});
  })
  ;


  /**
   * Listen for when a message has been sent from the Ionic app
   */
  socket.on('add-message', (message) => {
    // Broadcast the message and return a JavaScript map of values
    // for use within the Ionic app
    io.emit('message', {
      message: message.message,
      sender: socket.alias,
      tagline: socket.handle,
      location: socket.location,
      published: new Date()
    });
  })
  ;


  /**
   * Listen for when an image has been sent from the Ionic app
   */
  socket.on('add-image', (message) => {
    // Broadcast the message and return a JavaScript map of values
    // for use within the Ionic app
    io.emit('message', {
      image: message.image,
      sender: socket.alias,
      tagline: socket.handle,
      location: socket.location,
      published: new Date()
    });
  })
  ;


  /**
   * Allows the user to join the current chat session
   */
  socket.on('set-alias', (obj) => {
    // Define socket object properties (which we can use with our other
    // Socket.io event listener methods) and return a JavaScript map of
    // values for use within the Ionic app
    socket.alias = obj.alias;
    socket.handle = obj.handle;
    socket.location = obj.location;
    io.emit('alias-added', {user: obj.alias, tagline: obj.handle, location: obj.location});
  })
  ;


})
;


// Instruct node to run the socket server on the following port
http.listen(port, function () {
  console.log('listening on port ' + port);
});
