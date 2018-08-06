const express = require('express');
const globalvar = require('./globalvar.js')
const app =express();
const server = require('http').Server(app);
const io =require('socket.io')(server);

var listUser = [];
var listMessage =[];
io.on('connection',socket=>{
	
	socket.on('new-user',data=>{
		socket.name=data;
		listUser.push(socket.name);
		io.sockets.emit('get_list_user', listUser);
	})

	socket.on('send_message', data=>{
		listMessage.push(data);
		io.sockets.emit('get_message', listMessage);
	})
	socket.on('disconnect', ()=>{
		let i=listUser.indexOf(socket.name);
		if(i>=0){
			listUser.splice(i,1);
		}
		socket.broadcast.emit('get_list_user', listUser);
	})

})

server.listen(3000,()=>{
	console.log('server is running on...')
})