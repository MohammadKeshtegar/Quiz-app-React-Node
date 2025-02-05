import express from "express";

import { createChat, deleteChat, getAllChats, getChat, updateChat } from "../controller/chatController.js";
import { protect } from "../controller/authController.js";

const router = express.Router();

router.route("/user-chats").post(getAllChats);

router.route("/").get(getAllChats).post(protect, createChat);
router.route("/:id").get(getChat).patch(updateChat).delete(deleteChat);

export default router;
