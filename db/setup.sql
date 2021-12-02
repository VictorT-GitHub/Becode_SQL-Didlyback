CREATE TABLE events(
    ev_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,

    ev_name VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE dates(
    da_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,

    date DATE NOT NULL,

    event_id INT NOT NULL,
    FOREIGN KEY (event_id) REFERENCES events(ev_id)

);

CREATE TABLE attendees(
    at_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,

    attend_name VARCHAR(255) NOT NULL,
    available TINYINT(1) NOT NULL,

    date_id INT NOT NULL,
    FOREIGN KEY (date_id) REFERENCES dates(da_id)
); 

INSERT INTO events (ev_name, author, description)
VALUES('Team Building Hoppers', 'Axel', 'group projects and fun');

INSERT INTO dates (event_id, date)
VALUES
(1, '01-12-2021'),
(1, '02-12-2021'),
(1, '03-12-2021');

INSERT INTO attendees (date_id, attend_name, available)
VALUES(1, 'Victor', 1), (1, 'Axel', 0);