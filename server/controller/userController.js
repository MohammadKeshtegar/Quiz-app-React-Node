import Quiz from "../models/quizModel.js";
import User from "../models/userModel.js";
import appError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
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
    if (req.query.filter) {
      users = await User.find({ username: { $regex: req.query.filter } }).select("+role");
    } else {
      users = await User.find().select("+role");
    }
  } else {
    users = await User.find({ role: { $ne: "admin" } });
  }
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

export const deleteUser = catchAsync(async (req, res, next) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);

  const userQuizzes = await Quiz.deleteMany({ owner: deletedUser._id });

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
