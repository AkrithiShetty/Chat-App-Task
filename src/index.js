const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');

const { generateMessage } = require('./utils/messages');
const {
	rooms,
	addUser,
	addUserToExistingRoom,
	removeUser,
	getUser,
	getUsersInRoom
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));
const history = [];
const client = [];
io.on('connection', (socket) => {
	console.log('New WebSocket connection');

	socket.on('join', ({ username, room, buttonValue }, callback) => {
		if (buttonValue == 'create') {
			const { error, user } = addUser({
				id: socket.id,
				username,
				room
			});

			if (error) {
				return callback(error);
			}

			socket.join(user.room);

			console.log('Joining Room...: ' + user.room);

			socket.emit(
				'message',
				generateMessage('Admin', `Welcome! ${user.username}`)
			);

			io.to(user.room).emit('roomData', {
				room: user.room,
				users: getUsersInRoom(user.room)
			});

			callback();
		} else {
			const { error, user } = addUserToExistingRoom({
				id: socket.id,
				username,
				room
			});

			if (error) {
				return callback(error);
			}

			socket.join(user.room);

			// client.push({ id: socket.client.id });
			// console.log(client);

			// var getClientID = client.find((e) => e.id === socket.client.id);
			// console.log('the Client', getClientID);
			// if (getClientID) {
			if (history.length != 0) {
				for (const i in history) {
					socket.emit(
						'message',
						generateMessage(history[i].user['username'], history[i].message)
					);
				}
			}
			// }
			// if (!rooms.includes(user.room)) {
			// 	socket.emit('status', `Invalid Room Name: ${user.room}`);
			// }

			console.log('Joining Room...: ' + user.room);

			socket.emit(
				'message',
				generateMessage('Admin', `Welcome! ${user.username}`)
			);
			socket.broadcast
				.to(user.room)
				.emit(
					'message',
					generateMessage('Admin', `${user.username} has joined!`)
				);

			io.to(user.room).emit('roomData', {
				room: user.room,
				users: getUsersInRoom(user.room)
			});

			callback();
		}
	});

	socket.on('sendMessage', (message, callback) => {
		const user = getUser(socket.id);
		const filter = new Filter();

		if (filter.isProfane(message)) {
			return callback('Profanity is not allowed!');
		}
		history.push({ user, message });
		console.log(history);
		io.to(user.room).emit('message', generateMessage(user.username, message));
		callback();
	});

	socket.on('disconnect', () => {
		const user = removeUser(socket.id);

		if (user) {
			io.to(user.room).emit(
				'message',
				generateMessage('Admin', `${user.username} has left!`)
			);
			io.to(user.room).emit('roomData', {
				room: user.room,
				users: getUsersInRoom(user.room)
			});
		}
	});
});

server.listen(port, () => {
	console.log(`Server is up on port ${port}!`);
});
