import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";

import ErrorRoute from "./ui/ErrorRoute";
import ToastNotif from "./ui/ToastNotif";
import AppLayout from "./ui/AppLayout";
import NotFound from "./ui/NotFound";
import Spinner from "./ui/Spinner";

// Quiz
const ConfirmCreateQuiz = lazy(() => import("./featues/quiz/ConfirmCreateQuiz"));
const ConfirmedQuizzes = lazy(() => import("./featues/quiz/ConfirmedQuizzes"));
const ObserveQuiz = lazy(() => import("./featues/quiz/ObserveQuiz"));
const ConfirmQuiz = lazy(() => import("./featues/quiz/ConfirmQuiz"));
const QuizResult = lazy(() => import("./featues/quiz/QuizResult"));
const CreateQuiz = lazy(() => import("./featues/quiz/CreateQuiz"));
const ManageQuiz = lazy(() => import("./featues/quiz/ManageQuiz"));
const QuizList = lazy(() => import("./featues/quiz/QuizList"));

// Admin
const AdminDashboard = lazy(() => import("./featues/admin/AdminDashboard"));

// User
const UserDashboard = lazy(() => import("./featues/user/UserDashboard"));
const PlayersList = lazy(() => import("./featues/user/PlayersList"));
const ManageUsers = lazy(() => import("./featues/user/ManageUser"));
const UserQuiz = lazy(() => import("./featues/user/UserQuiz"));

// Inbox
const InboxMessage = lazy(() => import("./featues/Inbox/InboxMessage"));
const Inbox = lazy(() => import("./featues/Inbox/Inbox"));

// Authentication
const ForgotPassword = lazy(() => import("./featues/authentication/ForgotPassword"));
const ResetPassword = lazy(() => import("./featues/authentication/ResetPassword"));
const Signup = lazy(() => import("./featues/authentication/Signup"));
const Login = lazy(() => import("./featues/authentication/Login"));

// Chat
const CreateChatGroup = lazy(() => import("./featues/chat/CreateChatGroup"));
const ChatLayout = lazy(() => import("./featues/chat/ChatLayout"));

// Home
const Home = lazy(() => import("./pages/Home"));

const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<Spinner />}>
        <AppLayout />
      </Suspense>
    ),
    errorElement: <ErrorRoute />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
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
          { path: ":id", element: <InboxMessage /> },
        ],
      },
      { path: "/players", element: <PlayersList /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/reset-password/:token", element: <ResetPassword /> },
      {
        path: "/user",
        children: [
          { path: "dashboard", element: <UserDashboard /> },
          { path: "quiz", element: <UserQuiz /> },
          { path: "confirm-quiz", element: <ConfirmCreateQuiz /> },
          { path: "confirmed-quizzes", element: <ConfirmedQuizzes /> },
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
        errorElement: <NotFound />,
      },
    ],
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
