import { promisify } from "util";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import User from "../models/userModel.js";
import Email from "../utils/email.js";

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_SECRET_EXPIRES_IN * 24 * 60 * 60 * 100,
  });

const createToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    maxAge: process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: user,
  });
};

export const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    age: req.body.age,
    rank: req.body.rank,
    friends: req.body.friends,
    confirmedQuiz: req.body.confirmedQuiz,
    createdQuiz: req.body.createdQuiz,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    photo: req.body.photo,
    role: req.body.role,
    active: req.body.active,
  });

  createToken(newUser, 201, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return next(new AppError("Please provide email and password!", 400));

  const user = await User.findOne({ email })
    .select("+password")
    .select("+role")
    .populate("friends", "username photo points");

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError("Incorrect email or password!", 400));

  createToken(user, 200, res);
});

export const logout = catchAsync(async (req, res, next) => {
  res.clearCookie("jwt").status(200).json({ status: "success" });
});

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) return next(new AppError("You are not logged in! please login to get access", 401));

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id).select("+role");

  if (!currentUser) return next(new AppError("The user belong to this token does no longer exists", 401));

  if (currentUser.changePasswordAfter(decoded.iat)) {
    return next(new AppError("User recently changed password! please login again", 401));
  }

  req.user = currentUser;
  next();
});

export const restrickTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new AppError("You have not this permission to perform this action!", 403));
    next();
  };
};

export const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError("There is no user with this email address", 404));

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    const url = `${req.protocol}://${req.hostname}/api/v1/users/resetPassword/${resetToken}`;
    const resetPageUrl = `${req.protocol}://${req.hostname}:${req.body.port}/reset-password/${resetToken}`;
    await new Email(user, url, resetPageUrl).sendPasswordReset();

    res.status(200).json({ status: "success", message: "Token sent to email" });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: true });
    console.error(err);
    return next(new AppError("There was an error while sending the email, please try again later!", 500));
  }
});

export const resetPassowrd = catchAsync(async (req, res, next) => {
  const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

  const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } });

  if (!user) return next(new AppError("Token is invalid or has expired!", 400));

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  createToken(user, 200, res);
});

export const changePassword = catchAsync(async (req, res, next) => {
  console.log("change password");
  const user = await User.findById(req.user.id).select("+password");
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password)))
    return next(new AppError("Your current password is wrong!", 401));
  if (req.body.password !== req.body.confirmPassword) return next(new AppError("Password does not match!", 400));

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  await user.save();

  createToken(user, 200, res);
});
