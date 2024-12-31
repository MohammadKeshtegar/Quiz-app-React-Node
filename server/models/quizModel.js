import mongoose from "mongoose";
import Question from "./questionModel.js";

const quizSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "Please select the category of this quize!"],
    },
    quizTime: { type: Number, required: [true, "Quiz must have a certain time!"] },
    questionNum: Number,
    owner: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    questions: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Question",
        min: 3,
        max: 10,
      },
    ],
  },
  {
    timestamps: true,
  }
);

quizSchema.pre("save", async function (next) {
  this.questionNum = this.questions.length;
  await Question.updateMany({ _id: { $in: this.questions } }, { $set: { isCreatingQuiz: false } });
  next();
});

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
