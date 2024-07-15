import express from "express";
import { changePassword, forgotPassword, login, logout, protect, resetPassowrd, signup } from "../controller/authController.js";
import {
  getNotTeammateUsers,
  updateUserFriends,
  uploadUserPhoto,
  userQuizResult,
  getAllUsers,
  updateUser,
  deleteUser,
  getUser,
} from "../controller/userController.js";
import quizRouter from "./quizRoutes.js";

const router = express.Router();

router.use("/:userId/quizzes", quizRouter);

router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/logout").get(logout);

router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").put(resetPassowrd);

router.route("/update-me").put(protect, uploadUserPhoto, updateUser);
router.route("/change-password").post(protect, changePassword);
router.route("/user-quiz-result").patch(protect, userQuizResult);

router.route("/update-friends/:id").patch(protect, updateUserFriends);
router.route("/not-teammate-users/:id").get(getNotTeammateUsers);

router.route("/").get(getAllUsers);
router.route("/:id").get(getUser).delete(deleteUser);

export default router;
