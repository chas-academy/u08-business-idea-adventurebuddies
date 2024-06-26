import User from "../models/userModel";
// import User from "../models/userSchema";
import { IEvent } from "../interfaces/IEvent";
import Event from "../models/eventModel";
import { Request, Response } from "express";
import { CustomRequest } from "middleware/auth";

const create = async (data: IEvent) => {
  const event = await Event.create(data);
  return event;
};

const attendEvent = async (userId: string, eventId: string) => {
  await User.findByIdAndUpdate(userId, {
    $push: { attendingEvents: eventId },
  });

  const event = await Event.findByIdAndUpdate(
    eventId,
    {
      $addToSet: { participants: userId },
      $inc: { totalParticipant: 1 },
    },
    { new: true }
  );
  return event;
};

const unattendEvent = async (userId: string, eventId: string) => {
  await User.findByIdAndUpdate(userId, {
    $pull: { attendingEvents: eventId },
  });
  const event = await Event.findByIdAndUpdate(
    eventId,
    {
      $pull: { participants: userId },
      $inc: { totalParticipant: -1 },
    },
    { new: true }
  );
  return event;
};

const readByQuery = async (query: any) => {
  return await Event.find(query);
};

const readAll = async () => {
  const events = await Event.find({}).populate("user_id").exec();
  return events;
};
const read = async (id: any) => {
  const event = await Event.findById(id)
    .populate("user_id", "_id")
    .populate("participants")
    .exec();

  if (!event) {
    return null;
  }

  return {
    ...event.toObject(),
    user_id: event.user_id._id.toString(),
  };
};

const update = async (id: any, data: IEvent) => {
  return await Event.findByIdAndUpdate(id, data, { new: true });
};
const deleteOne = async (id: any) => {
  return await Event.findByIdAndDelete(id);
};
// Save Events
const addToUserList = async (userId: any, eventId: any) => {
  await User.findByIdAndUpdate(userId, { $addToSet: { savedEvents: eventId } });
};
// Unsave Events
const removeFromUserList = async (userId: any, eventId: any) => {
  await User.findByIdAndUpdate(userId, { $pull: { savedEvents: eventId } });
};

export const createEvent = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const newEvent = {
      ...req.body,
      user_id: req.user._id,
    };

    const savedEvent = await create(newEvent);

    // this will update the created events feild in the user schema
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.createdEvents.push(savedEvent._id);
    await user.save();

    res.status(201).json({ message: "Event created successfully", savedEvent });
  } catch (error) {
    console.log("Error creating event:", error);
    res.status(500).json({ message: "Event not created", error });
  }
};

export const getAllEvents = async (req: any, res: any): Promise<void> => {
  try {
    const events = await readAll();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "No events found" });
  }
};

export const getEventsByQuery = async (req: any, res: any): Promise<void> => {
  try {
    const { venue, gender, language, experience, age, price } = req.query;

    let query: { [key: string]: string | undefined } = {};

    if (venue) {
      query.venue = venue;
    }

    if (price) {
      query.price = price;
    }

    if (age) {
      query.age = age;
    }

    if (gender) {
      query.gender = gender;
    }

    if (language) {
      query.language = language;
    }

    if (experience) {
      query.experience = experience;
    }

    const events = await readByQuery(query);

    console.log(query);

    if (events.length === 0) {
      res
        .status(404)
        .json({ message: "No events found matching your query.", query });
    } else {
      res.status(200).json({ events, query });
    }
  } catch (error) {
    res.status(500).json({ message: `Failed to retrieve events: ${error}` });
  }
};

export const getEventById = async (req: any, res: any) => {
  try {
    const id = req.params.id;
    const event = await read(id);
    if (!event) {
      return res.status(400).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Event not found" });
  }
};

export const updateEvent = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const id = req.params.id;
    const updatedEventData = req.body;

    // Log user ID extracted from the token
    console.log("User ID from token:", req.user._id);
    console.log("Type of User ID from token:", typeof req.user._id);

    // Ensure that the user owns the event being updated
    const existingEvent = await read(id);
    console.log("Existing event:", existingEvent); // Log the existing event

    if (!existingEvent) {
      console.log("Event not found");
      return res.status(404).json({ message: "Event not found" });
    }

    console.log("User ID associated with the event:", existingEvent.user_id);
    console.log(
      "Type of User ID associated with the event:",
      typeof existingEvent.user_id
    );

    if (
      !existingEvent ||
      existingEvent.user_id.trim() !== req.user._id.toString().trim()
    ) {
      // Log user ID associated with the event being updated
      // console.log("User ID associated with the event:", existingEvent?.user_id);
      return res
        .status(403)
        .json({ message: "You are not authorized to update this event" });
    }

    const updatedEvent = await update(id, updatedEventData);
    // const updatedEvent = await update(req.body, id);
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Update succeded", updatedEvent });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Opps something bad happend", error });
  }
};

export const deleteEvent = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const id = req.params.id;

    // Ensure that the user owns the event being deleted
    const existingEvent = await read(id);

    if (!existingEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (
      !existingEvent ||
      existingEvent.user_id.trim() !== req.user._id.toString().trim()
    ) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this event" });
    }
    const deletedEvent = await deleteOne(id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted", deletedEvent });
  } catch (error) {
    res.status(500).json({ message: "Opps something bad happend" });
  }
};

// Save Events
export const addEventToUserList = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const userId = req.params.userId;
    const eventId = req.params.eventId;
    await addToUserList(userId, eventId);
    res
      .status(200)
      .json({ message: "Event added to user's list successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add event to user's list" });
  }
};
// Unsave Events
export const removeEventFromUserList = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const userId = req.params.userId;
    const eventId = req.params.eventId;
    await removeFromUserList(userId, eventId);
    res
      .status(200)
      .json({ message: "Event removed from user's list successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to remove event from user's list" });
  }
};

export const attend = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const { userId, eventId } = req.params as {
      userId: string;
      eventId: string;
    };

    const event = await attendEvent(userId, eventId);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "User is going to attend the event", event });
  } catch (error) {
    res.status(500).json({ message: `Failed to attend event: ${error}` });
  }
};

export const unattend = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const { userId, eventId } = req.params as {
      userId: string;
      eventId: string;
    };
    const event = await unattendEvent(userId, eventId);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    res.status(200).json({ message: "User has unattended the event", event });
  } catch (error) {
    res.status(500).json({ message: `Failed to unattend event: ${error}` });
  }
};
