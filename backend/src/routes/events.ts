import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  addEventToUserList,
  removeEventFromUserList,
} from "../controllers/eventcontroller";

const eventRouter = Router();

eventRouter.get("/", getAllEvents);
eventRouter.post("/", createEvent);
eventRouter.get("/:id", getEventById);
eventRouter.put("/:id", updateEvent);
eventRouter.delete("/:id", deleteEvent);
eventRouter.post("/:userId/add/:eventId", addEventToUserList);
eventRouter.delete("/:userId/remove/:eventId", removeEventFromUserList);

export default eventRouter;
