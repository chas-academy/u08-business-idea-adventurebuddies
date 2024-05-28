import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  updateEvent,
} from "../controllers/eventcontroller";

const eventRouter = Router();

eventRouter.get("/", getAllEvents);
eventRouter.post("/", createEvent);
eventRouter.get("/:id", getEventById);
eventRouter.put("/:id", updateEvent);
eventRouter.delete("/:id", deleteEvent);

export default eventRouter;
