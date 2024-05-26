import { Router } from "express";
import {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
} from "../controllers/friendcontroller";
import { auth } from "../middleware/auth";

const friendRouter = Router();

friendRouter.post("/request/:friendId", auth, sendFriendRequest);
friendRouter.post("/accept/:friendId", auth, acceptFriendRequest);
friendRouter.post("/reject/:friendId", auth, rejectFriendRequest);
friendRouter.delete("/:friendId", auth, removeFriend);

export default friendRouter;
