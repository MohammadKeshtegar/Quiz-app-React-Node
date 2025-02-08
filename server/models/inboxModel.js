import mongoose from "mongoose";

const inboxSchema = new mongoose.Schema(
  {
    message: String,
    messageType: { type: String, enum: ["chat-invite", "friend-invite", "custom"], required: [true, "Please set the type of the mail"] },
    chatGroupName: String,
    read: { type: Boolean, default: false },
    sender: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: [true, "Inbox must have a sender!"] },
    reciever: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: [true, "Inbox must have a sender!"] },
    status: { type: String, enum: ["accept", "reject", "unknown"], default: "unknown" },
  },
  { timestamps: true }
);

const Inbox = mongoose.model("Inbox", inboxSchema);

export default Inbox;
