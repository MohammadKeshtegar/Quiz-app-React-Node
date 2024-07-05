import express from "express";
import { createCategory, deleteAllCategories, deleteCategory, getAllCategories, updateCategory } from "../controller/categoryController.js";

const router = express.Router();

router.route("/").get(getAllCategories).post(createCategory).delete(deleteAllCategories);
router.route("/:id").put(updateCategory).delete(deleteCategory);

export default router;
