-- Active: 1675094188763@@127.0.0.1@3306

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
    likes INTEGER DEFAULT (0) NOT NULL,
    deslikes INTEGER DEFAULT(0) NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    update_at TEXT DEFAULT(DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE likes_deslikes (
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
INSERT INTO users (id, name, email, password,role)
VALUES ("u001", "Jose Saramago", "Jose@gmail.com", "js123", "escritor"),
("u002", "Clarisse Lispector", "clarisse@gmail.com", "cl123", "escritor");

INSERT INTO posts (id, creator_id, content, likes)
VALUES ("p001","u001", "viagem",1),
("p002","u002", "programação", 1),
("p003","u002", "balada",1),
("p004","u001", "pedalar",0);

INSERT INTO likes_deslikes (user_id, post_id, like)
VALUES("u001","p002",1),
("u001","p003",1),
("u002","p001",1);


DROP TABLE likes_deslikes;

UPDATE posts 
SET deslikes = 1
WHERE id = "p004";

SELECT 
posts.id,
posts.creator_id,
posts.content,
posts.likes,
posts.deslikes,
posts.created_at,
posts.update_at,
users.name AS creator_name
FROM posts
JOIN users
ON posts.creator_id = users.id;

SELECT * from users;