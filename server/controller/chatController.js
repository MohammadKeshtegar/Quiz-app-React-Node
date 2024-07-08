import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Chat from "../models/chatModel.js";
import multer from "multer";
import mongoose, { set } from "mongoose";

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
  const chat = await Chat.findById(req.params.id).populate("messages");
  if (!chat) return next(new AppError("No chat found with this id!", 404));
  res.status(200).json({ status: "success", data: chat });
});

export const createChat = catchAsync(async (req, res, next) => {
  if (req.file) req.body.picture = req.file.filename;
  req.body.admin = req.user.id;
  req.body.members = JSON.parse(req.body.members).map((member) => new mongoose.Types.ObjectId(member));

  const newChat = await Chat.create(req.body);
  res.status(201).json({ status: "success", data: newChat });
});

export const deleteChat = catchAsync(async (req, res, next) => {
  const chat = await Chat.findByIdAndDelete(req.params.chatId);
  if (!chat) return next(new AppError("No chat found with this id!", 404));
  res.status(200).json({ status: "success", data: chat });
});

export const updateChat = catchAsync(async (req, res, next) => {
  if (req.file) req.body.picture = req.file.filename;

  const chat = await Chat.findByIdAndUpdate(
    req.params.id,
    { name: { $set: req.body.name }, picture: { $set: req.body.picture }, members: { $push: req.body.members } },
    { new: true, runValidator: true }
  );

  if (!chat) return next(new AppError("No chat found with this id", 404));
  res.status(200).json({ status: "success", data: chat });
});
