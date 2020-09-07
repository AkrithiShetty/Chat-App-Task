const users = [];
const rooms = ['js'];

const addUser = ({ id, username, room }) => {
	username = username.trim().toLowerCase();
	room = room.trim().toLowerCase();
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
			error: 'Username is in use!'
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
			error: `Invalid Room Name ${room}`
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
			error: 'Username is in use!'
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

// const user = addUser({
// 	id: 22,
// 	username: 'Akrithi',
// 	room: 'ise8a'
// });

// const user1 = addUserToExistingRoom({
// 	id: 25,
// 	username: 'Akriithi',
// 	room: 'g'
// });
// console.log(user);
// console.log(user1);
// console.log(users);
// console.log(rooms);
