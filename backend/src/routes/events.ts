import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  addEventToUserList,
  removeEventFromUserList,
  attend,
  unattend,
  getEventsByQuery,
} from "../controllers/eventcontroller";

const eventRouter = Router();

eventRouter.get("/", getAllEvents); // http://localhost:3000/api/events
eventRouter.get("/query", getEventsByQuery); // query string example:http://localhost:3000/api/events/query?gender=Femal&venue=Online
eventRouter.post("/", createEvent); // http://localhost:3000/api/events
eventRouter.get("/:id", getEventById); // http://localhost:3000/api/events/eventId
eventRouter.put("/:id", updateEvent); // http://localhost:3000/api/events/eventId
eventRouter.delete("/:id", deleteEvent); // http://localhost:3000/api/events/eventId
eventRouter.post("/:userId/add/:eventId", addEventToUserList); // http://localhost:3000/api/events/userId/add/eventId
eventRouter.delete("/:userId/remove/:eventId", removeEventFromUserList); // http://localhost:3000/api/events/userId/remove/eventId
eventRouter.post("/:userId/attend/:eventId", attend); // http://localhost:3000/api/events/userId/attend/eventId
eventRouter.post("/:userId/unattend/:eventId", unattend); // http://localhost:3000/api/events/userId/unattend/eventId

export default eventRouter;
