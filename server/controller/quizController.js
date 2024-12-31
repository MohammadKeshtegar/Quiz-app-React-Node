import Question from "../models/questionModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Quiz from "../models/quizModel.js";
import User from "../models/userModel.js";

export const getAllQuizzes = catchAsync(async (req, res, next) => {
  let quizzes;

  // start
  // const queryObj = { ...req.query };
  // const excludedFields = ["sort", "filter"];
  // excludedFields.forEach((el) => delete queryObj[el]);

  // // filtering
  // let queryStr = JSON.stringify(queryObj);
  // queryStr = queryStr.replace(/\b(gre|gt|lte|lt)\b/g, (match) => `$${match}`);

  // let query = Quiz.find(JSON.parse(queryStr));

  // // sorting
  // if (req.query.sort) {
  //   const sortBy = req.query.sort.split(",").join(" ");
  //   query = query.sort(sortBy);
  // } else {
  //   query = query.sort("-createdAt");
  // }
  // end

  if (req.query.confirmed) {
    const quizzesID = req.user.confirmedQuiz.map((quiz) => {
      return quiz.quizId.toString();
    });
    quizzes = await Quiz.find({ _id: { $in: quizzesID } })
      .populate("owner", "name role")
      .populate("questions");
  } else if (req.query.sort) {
  } else {
    quizzes = await Quiz.find().populate("owner", "name role").populate("questions");
    if (req.url.includes("/quizzes")) {
      quizzes = quizzes.filter((quiz) => quiz.owner.equals(req.user._id));
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
  console.log(req.user);
  console.log(req.body);
  await User.findByIdAndUpdate(req.user._id, { $inc: { createdQuiz: 1 } }, { new: true });
  const newQuiz = await Quiz.create({ ...req.body, owner: req.user._id });
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
