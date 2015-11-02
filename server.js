var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
//port 3000 or port given.
var port = 3000 || process.env.port;


//sets the html path, go into current __directory/public/views
app.set('views', path.join(__dirname, 'views'));
// //rendering HTML from the server to client side
app.engine('.html', require('ejs').renderFile);

//Allow for these directories to be usable on the client side
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));


//setting the view engine as html
app.set('view engine', 'html');
app.set('view options', {
	layout:false
});

app.get('/', function(req, res){
	res.render('index');
});

io.on('connection', function(socket){
	console.log('A user is connected');
	socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(port, function(){
	console.log('SERVER RUNNING.. PORT: ' + port);
});
