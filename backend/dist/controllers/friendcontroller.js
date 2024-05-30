"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFriend = exports.rejectFriendRequest = exports.acceptFriendRequest = exports.sendFriendRequest = void 0;
const friendModel_1 = __importDefault(require("../models/friendModel"));
const sendRequest = async (requesterId, recipientId) => {
    const existingFriendRequest = await friendModel_1.default.findOne({
        requester: requesterId,
        recipient: recipientId,
    });
    if (existingFriendRequest) {
        throw new Error("Friend request already sent.");
    }
    const friendRequest = new friendModel_1.default({
        requester: requesterId,
        recipient: recipientId,
        status: "pending",
    });
    await friendRequest.save();
};
const acceptRequest = async (requesterId, recipientId) => {
    const friendRequest = await friendModel_1.default.findOne({
        requester: requesterId,
        recipient: recipientId,
        status: "pending",
    });
    if (!friendRequest) {
        throw new Error("Friend request not found.");
    }
    friendRequest.status = "accepted";
    await friendRequest.save();
};
const rejectRequest = async (requesterId, recipientId) => {
    const friendRequest = await friendModel_1.default.findOne({
        requester: requesterId,
        recipient: recipientId,
        status: "pending",
    });
    if (!friendRequest) {
        throw new Error("Friend request not found.");
    }
    friendRequest.status = "rejected";
    await friendRequest.save();
};
const removeFriendship = async (userId, friendId) => {
    const friend = await friendModel_1.default.findOneAndUpdate({
        $or: [
            { requester: userId, recipient: friendId },
            { requester: friendId, recipient: userId },
        ],
        status: "accepted",
    }, { status: "removed" }, { new: true } // This option returns the updated document
    );
    if (!friend) {
        throw new Error("Friend not found.");
    }
};
const sendFriendRequest = async (req, res) => {
    try {
        const requesterId = req.user._id;
        const { friendId } = req.params;
        await sendRequest(requesterId, friendId);
        res.status(200).json({ message: "Friend request sent." });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
exports.sendFriendRequest = sendFriendRequest;
const acceptFriendRequest = async (req, res) => {
    try {
        const { friendId } = req.params;
        await acceptRequest(friendId, req.user._id);
        res.status(200).json({ message: "Friend request accepted." });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
exports.acceptFriendRequest = acceptFriendRequest;
const rejectFriendRequest = async (req, res) => {
    try {
        const { friendId } = req.params;
        await rejectRequest(friendId, req.user._id);
        res.status(200).json({ message: "Friend request rejected." });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
exports.rejectFriendRequest = rejectFriendRequest;
const removeFriend = async (req, res) => {
    try {
        const { friendId } = req.params;
        await removeFriendship(req.user._id, friendId);
        res.status(200).json({ message: "Friend removed." });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
exports.removeFriend = removeFriend;
