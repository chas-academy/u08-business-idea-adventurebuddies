import { IUser } from "../interfaces/IUser";
import User from "../models/userModel";


const create = async (data: IUser) => {
    await User.create(data);
};
const readAll = async () => {
    const users = await User.find({});
    return users;
};
const read = async (id:any) => {
   return await User.findById(id);
};
const update = async (id:any, data: IUser) => {
    return await User.findByIdAndUpdate(id, data, { new: true });
};
const deleteOne = async (id:any) => {
    return await User.findByIdAndDelete(id); 
};

export const getAllUsers = async (req: any, res: any) => {
    const users = await readAll();
    res.status(200).json(users);
};
export const addUser = async (req: any, res:any) => {
    const {name, userName, password, confirmPassword, email, dateOfBirth, description} = req.body;

    const result = await create({name, userName, password, confirmPassword, email, dateOfBirth, description});

    res.status(201).json({message: "User created successfully", user: result})
};
export const getUser = async (req: any, res:any) => {
    const id = req.params.id;
    const user = await read(id);

    res.status(200).json(user);
};
export const updateUser = async (req: any, res:any) => {
    const {name, userName, password, confirmPassword, email, dateOfBirth, description} = req.body;
    const id = req.params.id;

    const updatedUser = await update(id, {name, userName, password, confirmPassword, email, dateOfBirth, description});

    res
        .status(200)
        .json({message: "Update succeded", updatedUser: updatedUser});
};
export const deleteUser = async (req: any, res:any) => {
    const id = req.params.id;

    const deletedUser = await deleteOne(id);

    res
        .status(200)
        .json({message: "User deleted", deletedUser: deletedUser});
};