import { createChat, deleteChat, getAllChats, getChat, updateChat } from "../controller/chatController.js";
import express from "express";

const router = express.Router();

router.route("/").get(getAllChats).post(createChat);
router.route("/:id").get(getChat).patch(updateChat).delete(deleteChat);

export default router;
