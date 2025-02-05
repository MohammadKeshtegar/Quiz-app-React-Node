import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    message: { type: String, required: [true, "The message should have content!"] },
    sender: { type: mongoose.Types.ObjectId, ref: "User", required: [true, "Message must have a sender"] },
    chat: { type: mongoose.Types.ObjectId, ref: "Chat", required: [true, "Message must belong to a chat"] },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
