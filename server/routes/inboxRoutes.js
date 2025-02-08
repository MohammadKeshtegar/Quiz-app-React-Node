import express from "express";

import { createInbox, deleteInbox, getAllInboxes, getInbox, updateInbox } from "../controller/inboxController.js";
import { protect } from "../controller/authController.js";

const router = express.Router();

router.route("/").get(protect, getAllInboxes).post(protect, createInbox);
router.route("/:id").get(protect, getInbox).patch(protect, updateInbox).delete(protect, deleteInbox);

export default router;
