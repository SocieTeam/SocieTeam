DROP TABLE IF EXISTS Reservations;
DROP TABLE IF EXISTS Events;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users(
	id SERIAL PRIMARY KEY,
	email TEXT,
	username TEXT,
	password TEXT,
	zip TEXT,
	profile_pic BYTEA
);

CREATE TABLE Events(
	id SERIAL PRIMARY KEY,
	title TEXT,
	user_id INT REFERENCES Users(id),
	location TEXT,
	time_start TIMESTAMP,
	time_end TIMESTAMP,
	isVirtual BOOLEAN
);

CREATE TABLE Reservations(
	id SERIAL PRIMARY KEY,
	user_id INT REFERENCES Users(id),
	event_id INT REFERENCES Events(id)
);
