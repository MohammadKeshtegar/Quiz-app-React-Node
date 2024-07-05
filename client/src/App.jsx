import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";

import ToastNotif from "./ui/ToastNotif";
import AppLayout from "./ui/AppLayout";
import NotFound from "./ui/NotFound";
import Spinner from "./ui/Spinner";

const ConfirmCreateQuiz = lazy(() => import("./featues/quiz/ConfirmCreateQuiz"));
const ConfirmedQuizzes = lazy(() => import("./featues/quiz/ConfirmedQuizzes"));
const ObserveQuiz = lazy(() => import("./featues/quiz/ObserveQuiz"));
const ConfirmQuiz = lazy(() => import("./featues/quiz/ConfirmQuiz"));
const QuizResult = lazy(() => import("./featues/quiz/QuizResult"));
const CreateQuiz = lazy(() => import("./featues/quiz/CreateQuiz"));
const ManageQuiz = lazy(() => import("./featues/quiz/ManageQuiz"));
const QuizList = lazy(() => import("./featues/quiz/QuizList"));

const AdminDashboard = lazy(() => import("./featues/admin/AdminDashboard"));

const UserDashboard = lazy(() => import("./featues/user/UserDashboard"));
const PlayersList = lazy(() => import("./featues/user/PlayersList"));
const ManageUsers = lazy(() => import("./featues/user/ManageUser"));
const UserQuiz = lazy(() => import("./featues/user/UserQuiz"));

const InboxMessage = lazy(() => import("./featues/Inbox/InboxMessage"));
const Inbox = lazy(() => import("./featues/Inbox/Inbox"));

const Signup = lazy(() => import("./featues/authentication/Signup"));
const Login = lazy(() => import("./featues/authentication/Login"));

const ChatLayout = lazy(() => import("./featues/chat/ChatLayout"));
const CreateChat = lazy(() => import("./featues/chat/CreateChat"));

const Home = lazy(() => import("./pages/Home"));

const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<Spinner />}>
        <AppLayout />
      </Suspense>
    ),
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
          { path: "create", element: <CreateChat /> },
          { path: "", element: <ChatLayout /> },
        ],
      },
      {
        path: "/inbox",
        children: [
          { path: "", element: <Inbox /> },
          { path: ":sender", element: <InboxMessage /> },
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
