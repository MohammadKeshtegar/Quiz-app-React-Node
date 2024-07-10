import { protect } from "../controller/authController.js";
import { createChat, deleteChat, getAllChats, getChat, removeChatMember, updateChat, uploadChatPhoto } from "../controller/chatController.js";
import express from "express";

const router = express.Router();

router.route("/:id/remove-member").patch(protect, removeChatMember);
router.route("/").get(getAllChats).post(protect, uploadChatPhoto, createChat);
router.route("/:id").get(getChat).patch(protect, uploadChatPhoto, updateChat).delete(deleteChat);

export default router;
