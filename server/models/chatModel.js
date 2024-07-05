import mongoose from "mongoose";

const chatSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "A chat must have a name!"] },
    picture: { type: String, default: "default-back.png" },
    chatSize: { type: Number },
    members: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
    messages: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Message" }],
  },
  {
    timestamps: true,
  }
);

chatSchema.pre("save", function (next) {
  if (this.isNew) this.chatSize = this.members.length;
  next();
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
