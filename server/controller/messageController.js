import Message from "../models/messageModel.js";
import catchAsync from "../utils/catchAsync.js";
import appError from "../utils/appError.js";

export const getAllMessages = catchAsync(async (req, res, next) => {
  let query = {};
  if (req.query.chatID) query["chat"] = req.query.chatID;

  const messages = await Message.find(query);
  res.status(200).json({ status: "success", data: messages });
});

export const getAllChatMessages = catchAsync(async (req, res, next) => {
  const messages = await Message.findById(req.params.id).populate("sender", "name username photo");
  res.status(200).json({ status: "success", data: messages });
});

export const createMessage = catchAsync(async (req, res, next) => {
  const newMessage = await Message.create(req.body);
  res.status(201).json({ status: "success", data: newMessage });
});

export const deleteMessage = catchAsync(async (req, res, next) => {
  const deletedMessage = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!deletedMessage) return next(new appError("No message found with this id!", 404));
  res.status(200).json({ status: "success", data: deletedMessage });
});
