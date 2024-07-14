import mongoose, { set } from "mongoose";
import multer from "multer";

import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import User from "../models/userModel.js";
import Chat from "../models/chatModel.js";

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/chat");
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
    cb(new AppError("That's not an image! Please upload only images"));
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
export const uploadChatPhoto = upload.single("picture");

export const getAllChats = catchAsync(async (req, res, next) => {
  const chats = await Chat.find().populate("members", "photo username");
  res.status(200).json({ status: "success", data: chats });
});

export const getChat = catchAsync(async (req, res, next) => {
  const chat = await Chat.findById(req.params.id).populate("messages").populate("members", "photo username");
  if (!chat) return next(new AppError("No chat found with this id!", 404));
  res.status(200).json({ status: "success", data: chat });
});

export const createChat = catchAsync(async (req, res, next) => {
  if (req.file) req.body.picture = req.file.filename;
  req.body.admin = req.user.id;
  req.body.members = JSON.parse(req.body.members).map((member) => new mongoose.Types.ObjectId(member));

  const newChat = await Chat.create(req.body);

  await User.updateMany({ _id: { $in: req.body.members } }, { $set: { chat: newChat._id } });

  res.status(201).json({ status: "success", data: newChat });
});

export const deleteChat = catchAsync(async (req, res, next) => {
  const chat = await Chat.findById(req.params.id);
  await User.updateMany({ _id: { $in: chat.members } }, { $unset: { chat: undefined } });
  await Chat.findByIdAndDelete(req.params.id);
  if (!chat) return next(new AppError("No chat found with this id!", 404));
  res.status(200).json({ status: "success", data: chat });
});

export const updateChat = catchAsync(async (req, res, next) => {
  if (req.file) req.body.picture = req.file.filename;
  req.body.members = JSON.parse(req.body.members).map((member) => new mongoose.Types.ObjectId(member));

  const chat = await Chat.findByIdAndUpdate(
    req.params.id,
    { $set: { name: req.body.name, picture: req.body.picture }, $push: { members: req.body.members } },
    { runValidator: true }
  );

  if (!chat) return next(new AppError("No chat found with this id", 404));
  res.status(200).json({ status: "success", data: chat });
});

export const joinChat = catchAsync(async (req, res, next) => {
  const chat = await Chat.findById(req.params.id);
  const isInChatGroup = chat.members.some((member) => member.toString() === req.user.id);

  if (isInChatGroup) {
    res.status(200).json({ status: "failed", message: "You already joined this chat!" });
  } else {
    const updatedChat = await Chat.findByIdAndUpdate(req.params.id, { $push: { members: new mongoose.Types.ObjectId(req.user.id) } }, { new: true });
    if (!chat) return next(new AppError("No chat found with this id", 404));
    res.status(200).json({ status: "success", data: updatedChat });
  }
});

export const removeChatMember = catchAsync(async (req, res, next) => {
  const updatedChat = await Chat.findByIdAndUpdate(req.params.id, { $pull: { members: req.body.userId } }, { new: true, runValidator: true });
  res.status(200).json({ status: "success", data: updatedChat });
});
