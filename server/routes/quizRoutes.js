import express from "express";
import { createQuiz, deleteQuiz, getAllQuizzes, getQuiz, updateQuiz } from "../controller/quizController.js";
import { protect, restrickTo } from "../controller/authController.js";

const router = express.Router({ mergeParams: true });

router.route("/").get(protect, getAllQuizzes).post(protect, restrickTo("user"), createQuiz);
router.route("/:id").get(getQuiz).patch(updateQuiz).delete(deleteQuiz);

export default router;
