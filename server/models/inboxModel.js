import mongoose from "mongoose";

const inboxSchema = new mongoose.Schema(
  {
    messageType: { type: String, required: [true, "An inbox must have a message type!"], enum: ["invite chat", "invite as friend"] },
    read: { type: Boolean, default: false },
    sender: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: [true, "Inbox must have a sender!"] },
    reciever: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: [true, "Inbox must have a reciever!"] },
  },
  {
    timestamps: true,
  }
);

const Inbox = mongoose.model("Inbox", inboxSchema);

export default Inbox;
