import express from "express";
import cors from "cors";
import {
  getAllEvents,
  getEvent,
  deleteEvent,
  editEvent,
  createEvent,
  addDateToEvent,
  addAttendToDate,
} from "./index.mjs";

const PORT = 3000;
const app = express();

// These lines are for express configuration, check the docs for more info (We won't focus on these at the moment)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// This function will be called everytime we make a request to the server (It will log the requested url in the terminal)
app.use((req, res, next) => {
  console.log(req.url);
  next();
});

// ------------ ROUTER ------------
app.get("/", (req, res, next) => {
  res.status(200).send("Welcome");
});

app.get("/events", async (req, res, next) => {
  const events = await getAllEvents();
  res.send(events);
});

app.get("/:id", async (req, res, next) => {
  const event = await getEvent(req.params.id);
  res.send(event);
});

// We tell our server to remain open, and listen to every incoming request
app.listen(PORT, () =>
  console.log(`server started at http://localhost:${PORT}/`)
);
