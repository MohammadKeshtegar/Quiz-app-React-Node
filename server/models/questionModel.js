import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: [true, "The question is required!"] },
  options: {
    type: {
      option1: String,
      option2: String,
      option3: String,
      option4: String,
    },
    required: [true, "Please provide all options!"],
    _id: false,
  },
  correctAnswer: { type: Number, required: [true, "The question needs to have a correct answer!"] },
  difficulty: { type: String, enum: ["easy", "medium", "hard"], required: [true, "Please specify question dfficulty!"] },
  score: { type: Number },
  owner: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  isCreatingQuiz: Boolean,
});

questionSchema.pre("save", function (next) {
  if (this.difficulty === "easy") this.score = 10;
  else if (this.difficulty === "medium") this.score = 20;
  else if (this.difficulty === "hard") this.score = 30;
  next();
});

questionSchema.methods.removeSpecifires = function () {
  this.owner = undefined;
  this.isCreatingQuiz = undefined;
};

const Question = mongoose.model("Question", questionSchema);

export default Question;
