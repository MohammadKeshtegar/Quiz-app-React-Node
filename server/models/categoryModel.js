import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      unique: true,
      validate: {
        validator: function (val) {
          if (/[A-Za-z]/.test(val)) return val;
        },
        message: "The category must contains only letters!",
      },
    },
    color: { type: String, required: [true, "The category must have a color"], unique: true },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
