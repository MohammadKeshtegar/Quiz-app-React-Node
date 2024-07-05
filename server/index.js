import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import http from "http";

import globalErrorHandler from "./controller/errorController.js";
import categoryRouter from "./routes/categoryRoutes.js";
import questionRouter from "./routes/questionRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import quizRouter from "./routes/quizRoutes.js";
import userRouter from "./routes/userRoutes.js";

process.on("uncaughtException", (err) => {
  console.log("💥 UNCAUGHT EXCEPTION 💥, shutting down...");
  console.error(err);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const httpServer = http.Server(app);
app.use("/public/", express.static("public"));

app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));

// app.use((req, res, next) => {
//   console.log("cookies", req.cookies);
//   next();
// });

const DB = process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD);
const PORT = process.env.PORT || 5000;

mongoose.connect(DB).then(() => console.log("DB connection successful"));

httpServer.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

const socketIo = new Server(httpServer, {
  pingTimeout: 60000,
  cors: { origin: "http://localhost:5173" },
});

socketIo.on("connection", (socket) => {
  console.log(`⚡ : ${socket.id} user just connected`);

  socket.on("setup", (userData) => {
    // socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join-chat", (roomId) => {
    socket.join(roomId);
    console.log("User joined room: ", roomId);
  });
});

app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/question", questionRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/quiz", quizRouter);
app.use("/api/v1/chat", chatRouter);

app.use(globalErrorHandler);

process.on("unhandledRejection", (err) => {
  console.log("💥 UNHANDLERD REJECTION 💥, shutting down...");
  console.error(err);
  httpServer.close(() => {
    process.exit(1);
  });
});
