"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.getEventById = exports.getAllEvents = exports.createEvent = void 0;
const eventModel_1 = __importDefault(require("../models/eventModel"));
const create = async (data) => {
    await eventModel_1.default.create(data);
};
const readAll = async () => {
    const events = await eventModel_1.default.find({}).populate('user_id');
    return events;
};
const read = async (id) => {
    return await eventModel_1.default.findById(id).populate('user_id').populate('participants');
};
const update = async (id, data) => {
    return await eventModel_1.default.findByIdAndUpdate(id, data, { new: true });
};
const deleteOne = async (id) => {
    return await eventModel_1.default.findByIdAndDelete(id);
};
const createEvent = async (req, res) => {
    try {
        const newEvent = new eventModel_1.default(req.body);
        const savedEvent = await create(newEvent);
        res.status(201).json({ message: "Event created successfully", savedEvent });
    }
    catch (error) {
        res.status(500).json({ message: "Event not created" });
    }
};
exports.createEvent = createEvent;
const getAllEvents = async (req, res) => {
    try {
        const events = await readAll();
        res.status(200).json(events);
    }
    catch (error) {
        res.status(500).json({ message: "No events found" });
    }
};
exports.getAllEvents = getAllEvents;
const getEventById = async (req, res) => {
    try {
        const id = req.params.id;
        const event = await read(id);
        if (!event) {
            return res.status(400).json({ message: "Event not found" });
        }
        res.status(200).json(event);
    }
    catch (error) {
        res.status(500).json({ message: "Event not found" });
    }
};
exports.getEventById = getEventById;
const updateEvent = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedEvent = await update(req.body, id);
        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json({ message: "Update succeded", updatedEvent });
    }
    catch (error) {
        res.status(500).json({ message: "Opps something bad happend" });
    }
};
exports.updateEvent = updateEvent;
const deleteEvent = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedEvent = await deleteOne(id);
        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        res
            .status(200)
            .json({ message: "Event deleted", deletedEvent });
    }
    catch (error) {
        res.status(500).json({ message: "Opps something bad happend" });
    }
};
exports.deleteEvent = deleteEvent;
