var sqlite3 = require('sqlite3').verbose();
const crypto = require('crypto');
var db = new sqlite3.Database('main.db');

db.serialize(function () {
	db.run(
		'CREATE TABLE IF NOT EXISTS Users (id TEXT PRIMARY KEY, username TEXT NOT NULL UNIQUE, password TEXT NOT NULL)'
	);
});
function signup(username, password) {
	const id = crypto.randomUUID();
	try {
		db.query('INSERT INTO Users VALUES (?, ?, ?)', [id, username, password]);
		return id;
	} catch (e) {
		return null;
	}
}
function login(username, password) {
	const record = db
		.run('SELECT * FROM Users WHERE username = ? AND password = ?', [username, password])
		.next();
	return record.value ? record.value[0] : null;
}

// This function takes user id and returns the username from database
function getUsername(id) {
	const record = db.run('SELECT * FROM Users WHERE id = ?', [id]).next();
	// ["id", "username", "password"]
	//  0     1          2
	return record.value[1];
}
