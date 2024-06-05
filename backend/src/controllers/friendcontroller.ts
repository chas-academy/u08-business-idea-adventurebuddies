import { Response } from "express";
import Friend from "../models/friendModel";
import { CustomRequest } from "../middleware/auth";
import User from "../models/userModel";

const sendRequest = async (requesterId: string, recipientId: string) => {
  const recipientUser = await User.findById(recipientId);
  if (!recipientUser) {
    throw new Error("Recipient user not found.");
  }

  const existingFriendRequest = await Friend.findOne({
    requester: requesterId,
    recipient: recipientId,
  });

  if (existingFriendRequest) {
    throw new Error("Friend request already sent.");
  }

  const existingRemovedFriendship = await Friend.findOne({
    $or: [
      { requester: requesterId, recipient: recipientId },
      { requester: recipientId, recipient: requesterId },
    ],
    status: "removed",
  });

  if (existingRemovedFriendship) {
    throw new Error("Friendship removed. Cannot send request.");
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
    { new: true }
  );

  if (!friend) {
    throw new Error("Friend not found.");
  }
};

export const sendFriendRequest = async (req: CustomRequest, res: Response) => {
  try {
    const requesterId = req.user!._id;
    const { friendId } = req.params;

    if (requesterId === friendId) {
      throw new Error("Cannot send friend request to yourself.");
    }

    console.log("Sending friend request:", requesterId, friendId);
    await sendRequest(requesterId, friendId);
    res.status(200).json({ message: "Friend request sent." });
  } catch (error: any) {
    console.error("Error sending friend request:", error.message);
    if (error.message === "Recipient user not found.") {
      res.status(404).json({ error: error.message });
    } else if (error.message === "Friend request already sent.") {
      res.status(409).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const getSentRequests = async (req: CustomRequest, res: Response) => {
  try {
    const requests = await Friend.find({ requester: req.user!._id });
    res.status(200).json({ requests });
  } catch (error: any) {
    console.error("Error fetching sent requests:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getReceivedRequests = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const requests = await Friend.find({
      recipient: req.user!._id,
      status: "pending",
    }).populate("requester", { userName: 0 });
    res.status(200).json({ requests });
  } catch (error: any) {
    console.error("Error fetching received requests:", error.message);
    res.status(500).json({ error: "Internal server error" });
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
  } catch (error: any) {
    if (error.message === "Friend request not found.") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
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
  } catch (error: any) {
    if (error.message === "Friend request not found.") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const removeFriend = async (req: CustomRequest, res: Response) => {
  try {
    const { friendId } = req.params;
    await removeFriendship(req.user!._id, friendId);
    res.status(200).json({ message: "Friend removed." });
  } catch (error: any) {
    if (error.message === "Friend not found.") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
