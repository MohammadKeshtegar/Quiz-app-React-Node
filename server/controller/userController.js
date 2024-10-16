import catchAsync from "../utils/catchAsync.js";
import appError from "../utils/appError.js";
import Chat from "../models/chatModel.js";
import User from "../models/userModel.js";

import multer from "multer";

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
  let users;
  if (req.query.admin) {
    users = await User.find({ role: { $ne: "admin" } });
  } else {
    users = await User.find();
  }
  res.status(200).json({ status: "success", results: users.length, data: users });
});

export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate("inbox").populate("friends", "username photo points");
  if (!user) return next(new appError("No user found with this id!", 404));
  res.status(200).json({ status: "success", data: user.name });
});

export const getNotTeammateUsers = catchAsync(async (req, res, next) => {
  const chat = await Chat.findById(req.params.id);
  const users = await User.find({ _id: { $nin: chat.members } });
  res.status(200).json({ status: "success", data: users });
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
  const updatedUser = await User.findByIdAndUpdate(req.params.id, { $push: { friends: req.user.id } });
  await User.findByIdAndUpdate(req.user.id, { $push: { friends: req.params.id } });
  if (!updatedUser) return next(new appError("No user found with this id!", 404));
  res.status(200).json({ status: 200, data: updatedUser });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser) return next(new appError("No user found with this id!", 404));
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
