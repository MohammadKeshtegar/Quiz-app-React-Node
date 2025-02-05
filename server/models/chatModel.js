import mongoose from "mongoose";

const chatSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "A chat must have a name!"] },
    picture: { type: String, default: "default-back.png" },
    chatSize: { type: Number },
    members: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
    admin: { type: mongoose.Types.ObjectId, ref: "User", required: [true, "Can not create a chat group without an admin"] },
  },
  {
    timestamps: true,
  }
);

chatSchema.pre("save", function (next) {
  if (this.isNew) this.chatSize = this.members.length + 1;
  next();
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
