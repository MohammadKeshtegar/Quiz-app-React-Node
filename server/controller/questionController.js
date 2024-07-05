import catchAsync from "../utils/catchAsync.js";
import Question from "../models/questionModel.js";
import AppError from "../utils/appError.js";

export const getAllQuestions = catchAsync(async (req, res, next) => {
  const questions = await Question.find();

  res.status(200).json({ status: "success", data: questions });
});

export const getQuestion = catchAsync(async (req, res, next) => {
  const question = await Question.findById(req.params.id);
  if (!question) return next(new AppError("No question found with this id!", 404));
  res.status(200).json({ status: "success", data: question });
});

export const getQuizQuestions = catchAsync(async (req, res, next) => {
  const quizQuestions = await Question.find({ owner: req.user.id, isCreatingQuiz: true });
  res.status(200).json({ status: "success", data: quizQuestions });
});

export const createQuestion = catchAsync(async (req, res, next) => {
  const newQuestion = await Question.create(req.body);
  res.status(201).json({ status: "success", data: newQuestion });
});

export const updateQuestion = catchAsync(async (req, res, next) => {
  const editedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!editedQuestion) return next(new AppError("No Question found with this id!", 404));
  res.status(200).json({ status: "success", data: editedQuestion });
});

export const deleteQuestion = catchAsync(async (req, res, next) => {
  const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
  if (!deletedQuestion) return next(new AppError("No question found with this id!", 404));
  res.status(200).json({ status: "success", data: deletedQuestion });
});
