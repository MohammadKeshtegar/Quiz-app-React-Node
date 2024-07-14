import catchAsync from "../utils/catchAsync.js";
import appError from "../utils/appError.js";
import Inbox from "../models/inboxModel.js";
import User from "../models/userModel.js";

export const getAllInboxes = catchAsync(async (req, res, next) => {
  let inboxes;
  if (req.query.user) {
    inboxes = await Inbox.find({ $or: [{ sender: req.user.id }, { reciever: req.user.id }] })
      .populate("sender", "_id username photo chat")
      .populate("reciever", "_id username photo chat");
  } else {
    inboxes = await Inbox.find().populate("sender", "_id username photo chat").populate("reciever", "_id username photo chat");
  }
  res.status(200).json({ status: "success", data: inboxes });
});

export const createInbox = catchAsync(async (req, res, next) => {
  const newInbox = await Inbox.create(req.body);
  await User.findByIdAndUpdate(req.body.reciever, { $push: { inbox: newInbox } }, { new: true });
  res.status(200).json({ status: "success", data: newInbox });
});

export const deleteInbox = catchAsync(async (req, res, next) => {
  const inbox = await Inbox.findByIdAndDelete(req.params.id);
  if (!inbox) return next(new appError("No inbox found with this id!", 404));
  res.status(200).json({ status: "success", data: inbox });
});

export const readInbox = catchAsync(async (req, res, next) => {
  const inbox = await Inbox.findByIdAndUpdate(req.params.id, { $set: { read: true } }, { new: true });
  if (!inbox) return next(new appError("No inbox found with this id!", 404));
  res.status(200).json({ status: "success", data: inbox });
});
