import express from "express";
import { createInbox, deleteInbox } from "../controller/inboxController.js";

const router = express.Router();

router.route("/").post(createInbox);
router.route("/:id").delete(deleteInbox);

export default router;
