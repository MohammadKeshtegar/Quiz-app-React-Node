import { Server as SocketIOServer } from "socket.io";
import Message from "./models/messageModel.js";
import Chat from "./models/chatModel.js";

export const setupSocket = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
      credentials: true,
    },
  });

  const userSocketMap = new Map();

  const disconnect = (socket) => {
    console.log(`Client disconnected ${socket.id}`);
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };

  const sendMessage = async (message) => {
    const { chat } = message;

    const createdMessage = await Message.create(message);
    const messageData = await Message.findById(createdMessage._id).populate("sender", "_id username email photo");

    const chatGroup = await Chat.findById(chat).populate("members");

    chatGroup.members.forEach((member) => {
      const memberSocketId = userSocketMap.get(member._id.toString());
      const adminSocketId = userSocketMap.get(chatGroup.admin.toString());

      if (memberSocketId) {
        io.to(memberSocketId).emit("recieve-message-chat", messageData);
      }
      if (adminSocketId) io.to(adminSocketId).emit("recieve-message-chat", messageData);
    });
  };

  io.on("connect", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap.set(userId, socket.id);
      // console.log(`User (${userId}) connected with socket ID: ${socket.id}`);
    } else {
      console.log("User id not provided");
    }

    socket.on("send-message-chat", sendMessage);
    socket.on("disconnect", () => disconnect(socket));
  });
};
