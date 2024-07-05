import Category from "../models/categoryModel.js";
import catchAsync from "../utils/catchAsync.js";
import appError from "../utils/appError.js";

export const getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json({ status: "success", results: categories.length, data: categories });
});

export const createCategory = catchAsync(async (req, res, next) => {
  const newCategory = await Category.create({ category: req.body.category });
  res.status(201).json({ status: "success", data: newCategory });
});

export const updateCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!category) return next(new appError("No category found with this id!", 404));
  res.status(200).json({ status: "success", data: category });
});

export const deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) return next(new appError("No category found with this id!", 404));
  res.status(200).json({ status: "success" });
});

export const deleteAllCategories = catchAsync(async (req, res, next) => {
  await Category.deleteMany();
  res.status(200).json({ status: "success", data: "All categories deleted successfully" });
});
