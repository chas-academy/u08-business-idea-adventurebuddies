import { Response } from "express";
import Friend from "../models/friendModel";
import { CustomRequest } from "../middleware/auth";

const sendRequest = async (requesterId: string, recipientId: string) => {
  const existingFriendRequest = await Friend.findOne({
    requester: requesterId,
    recipient: recipientId,
  });

  if (existingFriendRequest) {
    throw new Error("Friend request already sent.");
  }

  const friendRequest = new Friend({
    requester: requesterId,
    recipient: recipientId,
    status: "pending",
  });

  await friendRequest.save();
};

const acceptRequest = async (requesterId: string, recipientId: string) => {
  const friendRequest = await Friend.findOne({
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

const rejectRequest = async (requesterId: string, recipientId: string) => {
  const friendRequest = await Friend.findOne({
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

const removeFriendship = async (userId: string, friendId: string) => {
  const friend = await Friend.findOneAndUpdate(
    {
      $or: [
        { requester: userId, recipient: friendId },
        { requester: friendId, recipient: userId },
      ],
      status: "accepted",
    },
    { status: "removed" },
    { new: true } // This option returns the updated document
  );

  if (!friend) {
    throw new Error("Friend not found.");
  }
};

export const sendFriendRequest = async (req: CustomRequest, res: Response) => {
  try {
    const requesterId = req.user!._id;
    const { friendId } = req.params;
    await sendRequest(requesterId, friendId);
    res.status(200).json({ message: "Friend request sent." });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const acceptFriendRequest = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const { friendId } = req.params;
    await acceptRequest(friendId, req.user!._id);
    res.status(200).json({ message: "Friend request accepted." });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const rejectFriendRequest = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const { friendId } = req.params;
    await rejectRequest(friendId, req.user!._id);
    res.status(200).json({ message: "Friend request rejected." });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const removeFriend = async (req: CustomRequest, res: Response) => {
  try {
    const { friendId } = req.params;
    await removeFriendship(req.user!._id, friendId);
    res.status(200).json({ message: "Friend removed." });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
