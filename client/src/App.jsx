import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

import ToastNotif from "./ui/ToastNotif";
import AppLayout from "./ui/AppLayout";
import NotFound from "./ui/NotFound";

// Quiz
const ConfirmCreateQuiz = lazy(() => import("./features/quiz/ConfirmCreateQuiz"));
const ConfirmedQuizzes = lazy(() => import("./features/quiz/ConfirmedQuizzes"));
const ObserveQuiz = lazy(() => import("./features/quiz/ObserveQuiz"));
const ConfirmQuiz = lazy(() => import("./features/quiz/ConfirmQuiz"));
const QuizResult = lazy(() => import("./features/quiz/QuizResult"));
const CreateQuiz = lazy(() => import("./features/quiz/CreateQuiz"));
const ManageQuiz = lazy(() => import("./features/quiz/ManageQuiz"));
const QuizList = lazy(() => import("./features/quiz/QuizList"));

// Admin
const AdminDashboard = lazy(() => import("./features/admin/AdminDashboard"));

// Users
const UserDashboard = lazy(() => import("./features/user/UserDashboard"));
const PlayersList = lazy(() => import("./features/user/PlayersList"));
const ManageUsers = lazy(() => import("./features/user/ManageUser"));
const UserQuiz = lazy(() => import("./features/user/UserQuiz"));

// Inbox
const InboxMessage = lazy(() => import("./features/Inbox/InboxMessage"));
const Inbox = lazy(() => import("./features/Inbox/Inbox"));

// Auth
const Signup = lazy(() => import("./features/authentication/Signup"));
const Login = lazy(() => import("./features/authentication/Login"));

// Chat
const CreateChatGroup = lazy(() => import("./features/chat/CreateChatGroup"));
const ChatLayout = lazy(() => import("./features/chat/ChatLayout"));

const Home = lazy(() => import("./pages/Home"));

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/quiz",
        children: [
          { path: "create", element: <CreateQuiz /> },
          { path: "quiz-list", element: <QuizList /> },
          { path: "result/:id", element: <QuizResult /> },
          { path: "confirm-quiz/:id", element: <ConfirmQuiz /> },
        ],
      },
      {
        path: "/chats",
        children: [
          { path: "create", element: <CreateChatGroup /> },
          { path: "", element: <ChatLayout /> },
        ],
      },
      {
        path: "/inbox",
        children: [
          { path: "", element: <Inbox /> },
          { path: ":inbox", element: <InboxMessage /> },
        ],
      },
      { path: "/players", element: <PlayersList /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      {
        path: "/user",
        children: [
          { path: "dashboard", element: <UserDashboard /> },
          { path: "quiz", element: <UserQuiz /> },
          { path: "confirm-quiz", element: <ConfirmCreateQuiz /> },
          { path: "confirmed-quizzes", element: <ConfirmedQuizzes /> },
          { path: "observe-quiz/:quizId", element: <ObserveQuiz /> },
        ],
      },
      {
        path: "/admin",
        children: [
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "manage-quizzes", element: <ManageQuiz /> },
          { path: "manage-users", element: <ManageUsers /> },
          { path: "observe-quiz/:quizId", element: <ObserveQuiz /> },
        ],
      },
    ],
    errorElement: <NotFound />,
  },
]);

function App() {
  return (
    <>
      <ToastNotif />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
