import catchAsync from "../utils/catchAsync.js";
import appError from "../utils/appError.js";
import Quiz from "../models/quizModel.js";
import User from "../models/userModel.js";

import multer from "multer";
import mongoose from "mongoose";

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/users");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `photo-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new appError("That's not an image! Please upload only images"));
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
export const uploadUserPhoto = upload.single("photo");

export const getAllUsers = catchAsync(async (req, res, next) => {
  let filters = {};
  let maxUsersValue = 0;

  if (req.user.role !== "admin") filters["role"] = { $ne: "admin" };
  if (req.query.username || req.query.username) {
    const { maxUsers, username } = req.query;

    if (username) filters["username"] = { $regex: username };
    if (maxUsers) maxUsersValue = maxUsers;
  }

  const users = await User.find(filters)
    .limit(maxUsersValue)
    .sort({ points: -1 })
    .select(req.query.isAdmin ? "+role" : "");

  res.status(200).json({ status: "success", results: users.length, data: users });
});

export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new appError("No user found with this id!", 404));
  res.status(200).json({ status: "success", data: user.name });
});

export const updateUser = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword) return next(new appError("This route is not for password update!"));

  if (req.file) req.body.photo = req.file.filename;
  else req.body.photo = undefined;

  const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, { new: true, runValidators: true });
  if (!updatedUser) return next(new appError("No user found with this id!", 404));
  res.status(200).json({ status: 200, data: updatedUser });
});

export const updateUserFriends = catchAsync(async (req, res, next) => {
  let updateOperation = {};

  if (req.body.newData.increase) {
    updateOperation = { $push: { friends: new mongoose.Types.ObjectId(req.body.user) } };
  } else if (req.body.newData.decrease) {
    updateOperation = { $pull: { friends: new mongoose.Types.ObjectId(req.body.user) } };
  }

  const updatedUser = await User.findByIdAndUpdate(req.body.userID, updateOperation, { new: true, runValidators: true });

  if (!updatedUser) return next(new appError("No user found with this id!", 404));

  res.status(200).json({ status: 200, data: updatedUser });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);

  if (!deletedUser) return next(new appError("No user found with this id!", 404));
  const userQuizzes = await Quiz.deleteMany({ owner: deletedUser._id });

  res.status(200).json({ status: "success", data: deletedUser });
});

export const userQuizResult = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $push: { confirmedQuiz: req.body }, $set: { points: req.body.totalPoint + req.user.points } },
    { new: true, runValidators: true }
  );
  if (!user) return next(new appError("No user found with this id!", 404));
  res.status(200).json({ status: "success", data: user });
});
