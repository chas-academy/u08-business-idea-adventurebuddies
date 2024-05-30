"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSport = exports.updateSport = exports.getSport = exports.addSport = exports.getAllSports = void 0;
const sportModel_1 = __importDefault(require("../models/sportModel"));
const create = async (data) => {
    await sportModel_1.default.create(data);
};
const readAll = async () => {
    const sports = await sportModel_1.default.find({});
    return sports;
};
const read = async (id) => {
    return await sportModel_1.default.findById(id);
};
const update = async (id, data) => {
    return await sportModel_1.default.findByIdAndUpdate(id, data, { new: true });
};
const deleteOne = async (id) => {
    return await sportModel_1.default.findByIdAndDelete(id);
};
const getAllSports = async (req, res) => {
    const sports = await readAll();
    res.status(200).json(sports);
};
exports.getAllSports = getAllSports;
const addSport = async (req, res) => {
    const { name, rules, time, player } = req.body;
    const result = await create({ name, rules, time, player });
    res
        .status(201)
        .json({ message: "Sport created successfully", sport: result });
};
exports.addSport = addSport;
const getSport = async (req, res) => {
    // const sport = await read(req.params.id);
    const id = req.params.id;
    const sport = await read(id);
    res.status(200).json(sport);
};
exports.getSport = getSport;
const updateSport = async (req, res) => {
    const { name, rules, time, player } = req.body;
    const id = req.params.id;
    const updatedSport = await update(id, { name, rules, time, player });
    res
        .status(200)
        .json({ message: "Update succeded", updatedSport: updatedSport });
};
exports.updateSport = updateSport;
const deleteSport = async (req, res) => {
    const id = req.params.id;
    const deletedSport = await deleteOne(id);
    res
        .status(200)
        .json({ message: "Sport deleted", deletedSport: deletedSport });
};
exports.deleteSport = deleteSport;
