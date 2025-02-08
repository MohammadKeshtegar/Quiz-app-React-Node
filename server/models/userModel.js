import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "A user must have a name!"] },
    username: { type: String, required: [true, "A user must have a user name!"], unique: true },
    email: { type: String, required: [true, "A user must have an email address!"], unique: true },
    age: {
      type: Number,
      required: [true, "Please tell us your age!"],
      validate: {
        validator: function (val) {
          return val > 6;
        },
        message: "Your age is out of the proper rang to access to the content of this app, we appreciate your unstrestanding and cooperation",
      },
    },
    friends: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    confirmedQuiz: [
      {
        quizId: String,
        quizResult: [{ questionIndex: Number, optionIndex: Number, correctAnswer: Number, score: Number, _id: false }],
      },
    ],
    createdQuiz: [{ type: mongoose.Schema.ObjectId, ref: "Quiz" }],
    points: { type: Number, default: 0 },
    photo: { type: String, default: "default-user.png" },
    password: { type: String, required: [true, "Please provide a password!"], select: false },
    confirmPassword: {
      type: String,
      required: [true, "Please provide a password!"],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
      },
      message: "Password is not the same!",
    },
    role: {
      type: String,
      required: [true, "A user must have a role!"],
      enum: ["user", "admin"],
      default: "user",
      select: false,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    chat: { type: mongoose.Types.ObjectId, ref: "Chat" },
    telegram: { type: String, default: "" },
    discord: { type: String, default: "" },
    reddit: { type: String, default: "" },
    twitter: { type: String, default: "" },
    instagram: { type: String, default: "" },
    linkedin: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  this.password = await bcryptjs.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcryptjs.compare(candidatePassword, userPassword);
};

userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

    return JWTTimestamp < changedTimeStamp;
  }

  return false;
};

const User = mongoose.model("User", userSchema);

export default User;
