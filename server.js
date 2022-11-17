const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

//routing our landing page to login.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});



/*

What I'm doing below is that I'm using different addresses to identify different user. 
Notice that for both users below, I am returning the same html file. 
By getting the client to read the address, the client can parse out who the use is supposed to be. 
Note that this is a naive and unsecure way of doing it. While many websites uses the principle, 
there's a lot more network security magic that goes on in the background in thsoe cases.

*/


app.get('/ame', (req, res) => {               //user = ame
    res.sendFile(__dirname + '/index.html');
});


app.get('/gura', (req, res) => {              //user = gura
    res.sendFile(__dirname + '/index.html');
});


// connect the server to port 3000
http.listen(3000, () => {
    console.log('Connected at 3000');
});

//when a client is connected
io.on('connection', (socket) => {
    console.log('a user connected');

  
    //forward data
    socket.on('data', (msg) => {
        io.emit("data", msg);
    });


    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
  
});