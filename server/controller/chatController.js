import catchAsync from "../utils/catchAsync.js";
import Message from "../models/messageModel.js";
import appError from "../utils/appError.js";
import AppError from "../utils/appError.js";
import Chat from "../models/chatModel.js";
import User from "../models/userModel.js";

export const getAllChats = catchAsync(async (req, res, next) => {
  let chats;
  if (req.body.chatIDs) {
    chats = await Chat.find({ _id: { $in: req.body.chatIDs } });
  } else {
    chats = await Chat.find();
  }

  res.status(200).json({ status: "success", data: chats });
});

export const getChat = catchAsync(async (req, res, next) => {
  const chat = await Chat.findById(req.params.id)
    .populate("members", "_id username photo points confirmedQuiz")
    .populate("admin", "_id username photo points confirmedQuiz");

  chat.members.unshift(chat.admin);
  chat.admin = chat.admin._id;

  if (!chat) return next(new AppError("No chat found with this id!", 404));
  res.status(200).json({ status: "success", data: chat });
});

export const createChat = catchAsync(async (req, res, next) => {
  const { name, members } = req.body;
  if (!name || members.length === 0) return next(new appError("Please provide chat group name and members"));

  const newChat = await Chat.create({ name, members, admin: req.user._id });
  res.status(201).json({ status: "success", data: newChat });
});

export const updateChat = catchAsync(async (req, res, next) => {
  const chat = await Chat.findByIdAndUpdate(req.params.chatId, { new: true });
  if (!chat) return next(new AppError("No chat found with this id", 404));
  res.status(200).json({ status: "success", data: chat });
});

export const deleteChat = catchAsync(async (req, res, next) => {
  const deletedChat = await Chat.findByIdAndDelete(req.params.chatId);

  if (!deletedChat) return next(new AppError("No chat found with this id!", 404));

  await User.findByIdAndUpdate({ _id: { $in: deletedChat.members } }, { chat: { $pull: deletedChat._id } });
  await Message.findByIdAndDelete({ chat: deleteChat._id });

  res.status(200).json({ status: "success", data: deleteChat });
});
