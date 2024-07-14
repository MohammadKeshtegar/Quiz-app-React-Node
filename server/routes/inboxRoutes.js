import express from "express";

import { createInbox, deleteInbox, getAllInboxes, readInbox } from "../controller/inboxController.js";
import { protect } from "../controller/authController.js";

const router = express.Router();

router.route("/").get(protect, getAllInboxes).post(createInbox);
router.route("/:id").patch(readInbox).delete(deleteInbox);

export default router;
