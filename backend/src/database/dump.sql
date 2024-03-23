CREATE DATABASE new_board;

CREATE TABLE users(
    id serial primary key,
    name varchar(40) not null,
    email varchar(256) unique not null,
    password varchar(256) not null
);

CREATE TABLE boards(
    id serial primary key,
    title varchar(20) not null,
    favorited boolean,
    user_id integer references users(id) not null,
    creation_date timestamp not null,
    update_date timestamp not null
);

CREATE TABLE cards(
    id serial primary key,
    title varchar(20) not null,
    board_id integer references boards(id) not null,
    ordenation integer not null
);

CREATE TABLE tasks(
    id serial primary key,
    title varchar(50) not null,
    description varchar(1000),
    card_id integer references cards(id) not null,
    ordenation integer not null
);