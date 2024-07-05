import express from "express";
import { changePassword, login, logout, protect, signup } from "../controller/authController.js";
import { deleteUser, getAllUsers, getUser, updateUser, uploadUserPhoto, userQuizResult } from "../controller/userController.js";
import quizRouter from "./quizRoutes.js";

const router = express.Router();

router.use("/:userId/quizzes", quizRouter);

router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/logout").get(logout);

router.route("/update-me").put(protect, uploadUserPhoto, updateUser);
router.route("/change-password").post(protect, changePassword);
router.route("/user-quiz-result").patch(protect, userQuizResult);

router.route("/").get(protect, getAllUsers);
router.route("/:id").get(protect, getUser).delete(protect, deleteUser);

export default router;
