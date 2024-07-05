import express from "express";
import { createQuestion, deleteQuestion, getAllQuestions, getQuestion, getQuizQuestions, updateQuestion } from "../controller/questionController.js";
import { protect } from "../controller/authController.js";

const router = express.Router();

router.route("/quiz-questions").get(protect, getQuizQuestions);
router.route("/").get(getAllQuestions).post(createQuestion);
router.route("/:id").get(getQuestion).put(updateQuestion).delete(deleteQuestion);

export default router;
