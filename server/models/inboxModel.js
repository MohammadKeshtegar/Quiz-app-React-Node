import mongoose from "mongoose";

const inboxSchema = new mongoose.Schema(
  {
    message: { type: string },
    read: { type: Boolean, default: false },
    sender: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
      required: [true, "Inbox must have a sender!"],
    },
  },
  {
    timestamps: true,
  }
);

const Inbox = mongoose.model("Inbox", inboxSchema);

export default Inbox;
