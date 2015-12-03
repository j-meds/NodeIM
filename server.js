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

var users = [];
io.on('connection', function(socket){
	var username = '';
	console.log('A user is connected');

	socket.on('request-user', function(){
		socket.emit('users', {users: users});
	});
	socket.on('message', function(data){
		io.emit('message', {username: username, message: data.message})
	});

	socket.on('add-user', function(data){
		if(users.indexOf(data.username) == -1){
			io.emit('add-users', {
				username: data.username
			});
			username = data.username;
			users.push(data.username);
		}
		else{
			socket.emit('prompt-username', {
				massage: 'user already Exist'
			});
		}
	});

	socket.on('disconnect', function(){
    console.log(username + 'user disconnected');
    users.splice(users.indexOf(username), 1);
    io.emit('remove-user', {username: username});
  });
});

http.listen(port, function(){
	console.log('SERVER RUNNING.. PORT: ' + port);
});
