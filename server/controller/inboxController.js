import Inbox from "../models/inboxModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const getAllInboxes = catchAsync(async (req, res, next) => {
  const inboxes = await Inbox.find()
    .populate("sender", "_id name username email points photo chats")
    .populate("reciever", "_id name username email points photo chats");

  res.status(200).json({ status: "success", data: inboxes });
});

export const getInbox = catchAsync(async (req, res, next) => {
  const inbox = await Inbox.findById(req.params.id)
    .populate("sender", "_id name username email points photo chats")
    .populate("reciever", "_id name username email points photo chats");

  if (!inbox) return next(new AppError("No inbox found with this id", 404));

  res.status(200).json({ status: "success", data: inbox });
});

export const createInbox = catchAsync(async (req, res, next) => {
  const { sender, reciever } = req.body;
  if (!sender || !reciever) return next(new AppError("Please provide the content, sender and reciever"));
  const newInbox = await Inbox.create(req.body);
  res.status(201).json({ status: "success", data: newInbox });
});

export const updateInbox = catchAsync(async (req, res, next) => {
  if (req.body.status) req.body = { status: req.body.status };

  const updatedInbox = await Inbox.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidation: true });
  if (!updatedInbox) return next(new AppError("No inbox found with this id", 404));
  res.status(200).json({ status: "success", data: updatedInbox });
});

export const deleteInbox = catchAsync(async (req, res, next) => {
  const deletedInbox = await Inbox.findByIdAndDelete(req.params.id);
  if (!deletedInbox) return next(new AppError("No inbox found with this id", 404));
  res.status(200).json({ status: "success", data: deletedInbox });
});
