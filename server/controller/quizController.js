import Question from "../models/questionModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import User from "../models/userModel.js";
import Quiz from "../models/quizModel.js";

export const getAllQuizzes = catchAsync(async (req, res, next) => {
  let quizzes;
  if (req.query.confirmed) {
    const quizzesID = req.user.confirmedQuiz.map((quiz) => {
      return quiz.quizId.toString();
    });
    quizzes = await Quiz.find({ _id: { $in: quizzesID } })
      .populate("owner", "name role")
      .populate("questions");
  } else {
    quizzes = await Quiz.find().populate("owner", "name role").populate("questions");
    if (req.params.userId) {
      quizzes = quizzes.filter((quiz) => quiz.owner.equals(req.user.id));
    }
  }
  res.status(200).json({ status: "success", data: quizzes });
});

export const getQuiz = catchAsync(async (req, res, next) => {
  const quiz = await Quiz.findById(req.params.id).populate("questions");
  if (!quiz) return next(new AppError("No quiz found with this id!", 404));
  res.status(201).json({ status: "success", data: quiz });
});

export const createQuiz = catchAsync(async (req, res, next) => {
  const newQuiz = await Quiz.create({ ...req.body, owner: req.user._id });
  // Add the new quiz to the createdQuiz property of the owner
  await User.findByIdAndUpdate(req.user._id, { $push: { createdQuiz: newQuiz } }, { new: true });
  res.status(200).json({ status: "success", data: newQuiz });
});

export const updateQuiz = catchAsync(async (req, res, next) => {
  const updateQuiz = Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!updateQuiz) return next(new AppError("No quiz foudn with this id!", 404));
  res.status(200).json({ status: "success", data: updateQuiz });
});

export const deleteQuiz = catchAsync(async (req, res, next) => {
  const deleteQuiz = await Quiz.findById(req.params.id);
  await Question.deleteMany({ _id: { $in: deleteQuiz.questions } });
  await Quiz.findByIdAndDelete(req.params.id);

  if (!deleteQuiz) return next(new AppError("No quiz found with this id!", 404));

  res.status(200).json({ status: "success", data: deleteQuiz });
});
