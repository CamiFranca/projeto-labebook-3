-- Active: 1674065612185@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT UNIQUE PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME())
);
CREATE TABLE posts (
    id TEXT UNIQUE PRIMARY KEY NOT NULL,
    creator_id TEXT NOT NULL,
    content  TEXT NOT NULL,
    likes INTEGER NOT NULL,
    deslikes INTEGER NOT NULL,
    creted_at TEXT DEFAULT(DATETIME()) NOT NULL,
    update_at TEXT DEFAULT(DATETIME()) NOT NULL
);

CREATE TABLE likes_deslikes (
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL
);
INSERT INTO users (id, name, email, password,role)
VALUES ("u001", "Jose Saramago", "Jose@gmail.com", "js123", "escritor"),
("u002", "Clarisse Lispector", "clarisse@gmail.com", "cl123", "escritor");

INSERT INTO posts (id, creator_id, content, likes, deslikes)
VALUES ("p001","u001", "viagem",5,0),
("p002","u002", "programação", 9, 1);

INSERT INTO likes_deslikes (user_id, post_id, like)
VALUES("u001","p002",1);


SELECT * FROM users;
