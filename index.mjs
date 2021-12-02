import SQLite from "sqlite-async";

async function getEvents() {
  const db = await SQLite.open("./db/database");
  const allEvents = await db.all(
    "SELECT * FROM events LEFT JOIN dates ON event_id = events.id LEFT JOIN attendees ON date_id = dates.id"
  );
  console.log(allEvents);

  db.close();

  return allEvents;
}

async function getEvent(id) {
  const db = await SQLite.open("./db/database");
  const allEvents = await db.all("SELECT * FROM events WHERE id=?", [id]);
  console.log(allEvents);

  db.close();

  return allEvents;
}

getEvents();

getEvent(1);
