CREATE DATABASE new_boards;

CREATE TABLE users(
	id serial primary key,
  name varchar(40),
  email varchar(256) unique,
  password varchar(20)
);

CREATE TABLE boards(
	id serial primary key,
  title varchar(20),
  favorited boolean,
  user_id integer references users(id),
  creation_date timestamptz,
  update_date timestamptz
);

CREATE TABLE cards(
	id serial primary key,
  title varchar(20),
  board_id integer references boards(id)
);

CREATE TABLE tasks(
	id serial primary key,
  title varchar(20),
  description varchar(1000),
  card_id integer references cards(id)
);