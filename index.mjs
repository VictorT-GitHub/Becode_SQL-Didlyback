import SQLite from "sqlite-async";

// GET ALL EVENTS & DATES & ATTENDEES
async function getEvents() {
  const db = await SQLite.open("./db/database");
  const allEvents = await db.all(
    "SELECT * FROM events LEFT JOIN dates ON event_id = events.id LEFT JOIN attendees ON date_id = dates.id"
  );
  console.log(allEvents);

  db.close();

  return allEvents;
}

// GET ONE EVENT (SELECTED BY ID)
async function getEvent(id) {
  const db = await SQLite.open("./db/database");
  const allEvents = await db.all("SELECT * FROM events WHERE id=?", [id]);
  console.log(allEvents);

  db.close();

  return allEvents;
}

// DELETE ONE EVENT (SELECTED BY ID)
async function deleteEvent(id) {
  const db = await SQLite.open("./db/database");
  const allEvents = await db.all("DELETE FROM events WHERE id=?", [id]);
  console.log(allEvents);

  db.close();

  return allEvents;
}

// deleteEvent(1);

getEvents();

// getEvent(1);
