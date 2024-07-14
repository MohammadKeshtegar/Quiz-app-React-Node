import { protect } from "../controller/authController.js";
import {
  createChat,
  deleteChat,
  getAllChats,
  getChat,
  joinChat,
  removeChatMember,
  updateChat,
  uploadChatPhoto,
} from "../controller/chatController.js";
import express from "express";

const router = express.Router();

router.route("/join-chat/:id").patch(protect, joinChat);
router.route("/:id/remove-member").patch(protect, removeChatMember);
router.route("/").get(getAllChats).post(protect, uploadChatPhoto, createChat);
router.route("/:id").get(getChat).patch(protect, uploadChatPhoto, updateChat).delete(deleteChat);

export default router;
