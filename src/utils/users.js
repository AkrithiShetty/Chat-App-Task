const users = [];
const rooms = [];

const addUser = ({ id, username, room }) => {
	username = username.trim().toLowerCase();
	room = room.trim().toLowerCase();
	if (!username || !room) {
		return {
			error: 'Username and room are required!'
		};
	}
	if (rooms.includes(room)) {
		return {
			error: `Room ${room} already exists!!`
		};
	}
	const existingUser = users.find((user) => {
		return user.room === room && user.username === username;
	});
	if (existingUser) {
		return {
			error: 'Username is already in use!'
		};
	}
	const user = { id, username, room };
	users.push(user);
	rooms.push(room);
	console.log(rooms);
	return { user };
};

const addUserToExistingRoom = ({ id, username, room }) => {
	username = username.trim().toLowerCase();
	room = room.trim().toLowerCase();

	if (!rooms.includes(room)) {
		return {
			error: `Invalid Room Name: ${room}`
		};
	}
	if (!username || !room) {
		return {
			error: 'Username and room are required!'
		};
	}
	const existingUser = users.find((user) => {
		return user.room === room && user.username === username;
	});
	if (existingUser) {
		return {
			error: 'Username is already in use!'
		};
	}
	const user = { id, username, room };
	users.push(user);
	return { user };
};

const removeUser = (id) => {
	const index = users.findIndex((user) => user.id === id);
	if (index !== -1) {
		return users.splice(index, 1)[0];
	}
};

const getUser = (id) => {
	return users.find((user) => user.id === id);
};

const getUsersInRoom = (room) => {
	room = room.trim().toLowerCase();
	return users.filter((user) => user.room === room);
};

module.exports = {
	rooms,
	addUser,
	addUserToExistingRoom,
	removeUser,
	getUser,
	getUsersInRoom
};

// const history = [];
// const user = addUser({
// 	id: 22,
// 	username: 'Akrithi',
// 	room: 'ISE8A'
// });
// const m1 = 'hy';
// const m2 = 'Hello';
// const user1 = addUser({
// 	id: 232,
// 	username: 'Suraksha',
// 	room: 'ISE8aA'
// });
// console.log(user.toString());

// history.push({ user, m1 });

// history.push({ user1, m2 });
// console.log(history);
// console.log(history[0].user.user['username']);
