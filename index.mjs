import SQLite from "sqlite-async";

// ------------ GET ALL EVENTS (& DATES & ATTENDEES) ------------
async function getAllEvents() {
  const db = await SQLite.open("./db/database");
  const allEvents = await db.all(
    "SELECT * FROM events LEFT JOIN dates ON event_id = events.ev_id LEFT JOIN attendees ON date_id = dates.da_id"
  );

  const ret = allEvents.reduce((ac, cv) => {
    if (cv.attend_name === null) return ac;

    const _event = ac.find((x) => x.id === cv.ev_id);

    const newAttendee = {
      name: cv.attend_name,
      available: cv.available,
    };

    const newDate = {
      date: cv.date,
      attendees: [newAttendee],
    };

    if (!_event) {
      ac.push({
        id: cv.ev_id,
        event_name: cv.ev_name,
        event_author: cv.author,
        event_description: cv.description,
        dates: [newDate],
      });
    } else {
      const _date = _event.dates.find((x) => x.date === cv.date);
      if (!_date) _event.dates.push(newDate);
      else _date.attendees.push(newAttendee);
    }

    return ac;
  }, []);

  console.log(JSON.stringify(ret, null, 2));

  db.close();

  return allEvents;
}
// getAllEvents();

// ------------ GET ONE EVENT (SELECTED BY EV_ID) ------------
async function getEvent(ev_id) {
  const db = await SQLite.open("./db/database");
  const allEvents = await db.all("SELECT * FROM events WHERE ev_id=?", [ev_id]);
  console.log(allEvents);

  db.close();

  return allEvents;
}
// getEvent(1);

// ------------ DELETE ONE EVENT (SELECTED BY EV_ID) ------------
async function deleteEvent(ev_id) {
  const db = await SQLite.open("./db/database");
  const allEvents = await db.all("DELETE FROM events WHERE ev_id=?", [ev_id]);
  console.log(allEvents);

  db.close();

  return allEvents;
}
// deleteEvent(1);

// ------------ EDIT EVENT NAME & AUTHOR & DESCRIPTION (SELECTED BY EV_ID) ------------
async function editEvent(ev_id, ev_name, author, descri) {
  const db = await SQLite.open("./db/database");
  const allEvents = await db.all(
    `UPDATE events SET ev_name = '${ev_name}', author = '${author}', description = '${descri}'  WHERE ev_id=?`,
    [ev_id]
  );
  console.log(allEvents);

  db.close();

  return allEvents;
}
// editEvent(1, "new event name", "viviLaMachine", "new description so cool");

// ------------ CREATE NEW EVENT (NAME & AUTHOR & DESCRIPTION) ------------
async function createEvent(ev_name, author, descri) {
  const db = await SQLite.open("./db/database");
  const allEvents = await db.all(
    `INSERT INTO events (ev_name, author, description)
    VALUES ('${ev_name}', '${author}', '${descri}')`
  );
  console.log(allEvents);

  db.close();

  return allEvents;
}
// createEvent("victor testing", "vivivi", "pic nic dans la forêt");

// ------------ ADD DATE(S) TO EVENT (DATE) (SELECTED BY EVENT_ID) ------------
async function addDateToEvent(event_id, date) {
  const db = await SQLite.open("./db/database");
  const allEvents = await db.all(
    `INSERT INTO dates (event_id, date)
    VALUES ('${event_id}', '${date}')`
  );
  console.log(allEvents);

  db.close();

  return allEvents;
}
// addDateToEvent(1, "11-11-2422");

// arrayDates.forEach((date) => {
//   addDateToEvent(1, date);
// });

// ------------ ADD ATTEND TO DATE(S) (ATTEND_NAME, AVAILABILITY) (SELECTED BY DATE_ID) ------------
async function addAttendToDate(date_id, attend_name, available) {
  const db = await SQLite.open("./db/database");
  const allEvents = await db.all(
    `INSERT INTO attendees (date_id, attend_name, available)
    VALUES ('${date_id}', '${attend_name}', ${available})`
  );
  console.log(allEvents);

  db.close();

  return allEvents;
}
// addAttendToDate(3, "John Cena", 1);
