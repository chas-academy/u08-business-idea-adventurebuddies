import { IEvent } from "../interfaces/IEvent";
import Event from "../models/eventModel";

const create = async (data: IEvent) => {
  await Event.create(data);
};
const readAll = async () => {

  const events = await Event.find({}).populate('user_id').exec();
  return events;
};
const read = async (id: any) => {
  return await Event.findById(id).populate('user_id').populate('participants').exec();

};
const update = async (id: any, data: IEvent) => {
  return await Event.findByIdAndUpdate(id, data, { new: true });
};
const deleteOne = async (id: any) => {
  return await Event.findByIdAndDelete(id);
};

export const createEvent = async (req: any, res: any) => {
  try {
    const newEvent = new Event(req.body);
    const savedEvent = await create(newEvent);
    res.status(201).json({ message: "Event created successfully", savedEvent });
  } catch (error) {
    res.status(500).json({ message: "Event not created" });
  }
};

export const getAllEvents = async (req: any, res: any) => {
  try {
    const events = await readAll();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "No events found" });
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

export const updateEvent = async (req: any, res: any) => {
  try {
    const id = req.params.id;
    const updatedEventData = req.body;
    const updatedEvent = await update(id, updatedEventData);
    // const updatedEvent = await update(req.body, id);
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Update succeded", updatedEvent });
  } catch (error) {
    res.status(500).json({ message: "Opps something bad happend" });
  }
};

export const deleteEvent = async (req: any, res: any) => {
  try {
    const id = req.params.id;
    const deletedEvent = await deleteOne(id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted", deletedEvent });
  } catch (error) {
    res.status(500).json({ message: "Opps something bad happend" });
  }
};
