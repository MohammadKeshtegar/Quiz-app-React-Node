import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Chat from "../models/chatModel.js";

export const getAllChats = catchAsync(async (req, res, next) => {
  const chats = await Chat.find();
  res.status(200).json({ status: "success", data: chats });
});

export const getChat = catchAsync(async (req, res, next) => {
  const chat = await Chat.findById(req.params.id).populate("messages");
  if (!chat) return next(new AppError("No chat found with this id!", 404));
  res.status(200).json({ status: "success", data: chat });
});

export const createChat = catchAsync(async (req, res, next) => {
  const { name, users } = req.body;
  const newChat = await Chat.create({ name, users });
  res.status(201).json({ status: "success", data: newChat });
});

export const deleteChat = catchAsync(async (req, res, next) => {
  const chat = await Chat.findByIdAndDelete(req.params.chatId);
  if (!chat) return next(new AppError("No chat found with this id!", 404));
  res.status(200).json({ status: "success", data: chat });
});

export const updateChat = catchAsync(async (req, res, next) => {
  const chat = await Chat.findByIdAndUpdate(req.params.chatId, { new: true });
  if (!chat) return next(new AppError("No chat found with this id", 404));
  res.status(200).json({ status: "success", data: chat });
});
