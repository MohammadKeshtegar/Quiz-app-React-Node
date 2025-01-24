import Question from "../models/questionModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Quiz from "../models/quizModel.js";
import User from "../models/userModel.js";

import mongoose from "mongoose";

export const getAllQuizzes = catchAsync(async (req, res, next) => {
  let query;

  if (req.query.confirmed) {
    const quizzesID = req.user.confirmedQuiz.map((quiz) => quiz.quizId.toString());
    query = Quiz.find({ _id: { $in: quizzesID } });
  } else if (req.query.category || req.query.owner) {
    const { owner, category } = req.query;

    // Getting the user for filtering based on the owner
    const searchedOwner = req.query.owner ? await User.findOne({ username: { $regex: req.query.owner } }) : null;

    // If the searchedOwner is null or undefined, don't add the owner for filtering
    let queryConditions = [];
    if (category !== "No-filter") queryConditions.push({ category: req.query.category });
    if (searchedOwner) queryConditions.push({ owner: new mongoose.Types.ObjectId(searchedOwner._id) });

    // If both owner and category exists, filter results based on both of them, else filter based one of them
    if (owner && category) query = Quiz.find({ $and: queryConditions });
    else if (queryConditions.length > 0) query = Quiz.find({ $or: queryConditions });
    else query = Quiz.find();
  } else {
    if (req.url.includes("/quizzes")) {
      query = Quiz.find().filter((quiz) => quiz.owner.equals(req.user._id));
    } else {
      query = Quiz.find();
    }
  }

  let sortObj = {};
  if (req.query.sort) {
    const [field, order] = req.query.sort.split("-");

    if (field === "questions") order === "ascending" ? (sortObj["questionNum"] = 1) : (sortObj["questionNum"] = -1);
    else sortObj[field] = order === "ascending" ? 1 : -1;

    console.log(order);

    console.log(sortObj);
  }

  const quizzes = await query.populate("owner", "name role").populate("questions").sort(sortObj);
  res.status(200).json({ status: "success", data: quizzes });
});

export const getQuiz = catchAsync(async (req, res, next) => {
  const quiz = await Quiz.findById(req.params.id).populate("questions");
  if (!quiz) return next(new AppError("No quiz found with this id!", 404));
  res.status(201).json({ status: "success", data: quiz });
});

export const createQuiz = catchAsync(async (req, res, next) => {
  // console.log(req.user);
  // console.log(req.body);
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
