import { ISport } from "../interfaces/ISport";
import Sport from "../models/sportModel";

const create = async (data: ISport) => {
  await Sport.create(data);
};
const readAll = async () => {
  const sports = await Sport.find({});
  return sports;
};
const read = async (id: any) => {
  return await Sport.findById(id);
};
const update = async (id: any, data: ISport) => {
  return await Sport.findByIdAndUpdate(id, data, { new: true });
};
const deleteOne = async (id: any) => {
  return await Sport.findByIdAndDelete(id);
};

export const getAllSports = async (req: any, res: any) => {
  const sports = await readAll();
  res.status(200).json(sports);
};
export const addSport = async (req: any, res: any) => {
  const { name, rules, time, player } = req.body;

  const result = await create({ name, rules, time, player });

  res
    .status(201)
    .json({ message: "Sport created successfully", sport: result });
};
export const getSport = async (req: any, res: any) => {
  // const sport = await read(req.params.id);
  const id = req.params.id;
  const sport = await read(id);

  res.status(200).json(sport);
};
export const updateSport = async (req: any, res: any) => {
  const { name, rules, time, player } = req.body;
  const id = req.params.id;

  const updatedSport = await update(id, { name, rules, time, player });

  res
    .status(200)
    .json({ message: "Update succeded", updatedSport: updatedSport });
};
export const deleteSport = async (req: any, res: any) => {
  const id = req.params.id;

  const deletedSport = await deleteOne(id);

  res
    .status(200)
    .json({ message: "Sport deleted", deletedSport: deletedSport });
};
