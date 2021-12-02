CREATE TABLE events(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,

    name VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE dates(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,

    date DATE NOT NULL,

    event_id INT NOT NULL,
    FOREIGN KEY (event_id) REFERENCES events(id)

);

CREATE TABLE attendees(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,

    name VARCHAR(255) NOT NULL,
    available TINYINT(1) NOT NULL,

    date_id INT NOT NULL,
    FOREIGN KEY (date_id) REFERENCES dates(id)
); 

INSERT INTO events (name, author, description)
VALUES('Team Building Hoppers', 'Axel', 'group projects and fun');

INSERT INTO dates (event_id, date)
VALUES
(1, '01-12-2021'),
(1, '02-12-2021'),
(1, '03-12-2021');

INSERT INTO attendees (date_id, name, available)
VALUES(1, 'Victor', 1), (1, 'Axel', 0);