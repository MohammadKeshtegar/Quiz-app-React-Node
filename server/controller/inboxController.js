import catchAsync from "../utils/catchAsync.js";
import appError from "../utils/appError.js";
import Inbox from "../models/inboxModel.js";

export const createInbox = catchAsync(async (req, res, next) => {
  const newInbox = await Inbox.create(req.body);
  res.status(200).json({ status: "success", data: newInbox });
});

export const deleteInbox = catchAsync(async (req, res, next) => {
  const inbox = await Inbox.findByIdAndDelete(req.params.id);
  if (!inbox) return next(new appError("No inbox found with this id!", 404));
  res.status(200).json({ status: "success", data: inbox });
});
