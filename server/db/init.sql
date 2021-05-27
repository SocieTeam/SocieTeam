DROP TABLE IF EXISTS Reservations;
DROP TABLE IF EXISTS Events;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users(
	id SERIAL PRIMARY KEY,
	email TEXT,
	username TEXT,
	password TEXT,
	zip TEXT,
	profile_pic TEXT,
	resetCode TEXT
);

CREATE TABLE Events(
	id SERIAL PRIMARY KEY,
	title TEXT,
	user_id INT REFERENCES Users(id) ON DELETE CASCADE,
	location TEXT,
	time_start TIMESTAMP,
	time_end TIMESTAMP,
	isVirtual BOOLEAN,
	image TEXT,
	zip TEXT,
	description TEXT
);

CREATE TABLE Reservations(
	id SERIAL PRIMARY KEY,
	user_id INT REFERENCES Users(id) ON DELETE CASCADE,
	event_id INT REFERENCES Events(id) ON DELETE CASCADE
);
