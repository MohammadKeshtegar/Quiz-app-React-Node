import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";

import PageSpinner from "./ui/PageSpinner";
import ToastNotif from "./ui/ToastNotif";
import AppLayout from "./ui/AppLayout";
import NotFound from "./ui/NotFound";

const ConfirmCreateQuiz = lazy(() => import("./featuers/quiz/ConfirmCreateQuiz"));
const ConfirmedQuizzes = lazy(() => import("./featuers/quiz/ConfirmedQuizzes"));
const ObserveQuiz = lazy(() => import("./featuers/quiz/ObserveQuiz"));
const ConfirmQuiz = lazy(() => import("./featuers/quiz/ConfirmQuiz"));
const QuizResult = lazy(() => import("./featuers/quiz/QuizResult"));
const CreateQuiz = lazy(() => import("./featuers/quiz/CreateQuiz"));
const ManageQuiz = lazy(() => import("./featuers/quiz/ManageQuiz"));
const QuizList = lazy(() => import("./featuers/quiz/QuizList"));

const AdminDashboard = lazy(() => import("./featuers/admin/AdminDashboard"));

const UserDashboard = lazy(() => import("./featuers/user/UserDashboard"));
const PlayersList = lazy(() => import("./featuers/user/PlayersList"));
const ManageUsers = lazy(() => import("./featuers/user/ManageUser"));
const UserQuiz = lazy(() => import("./featuers/user/UserQuiz"));

const InboxMessage = lazy(() => import("./featuers/Inbox/InboxMessage"));
const Inbox = lazy(() => import("./featuers/Inbox/Inbox"));

const Signup = lazy(() => import("./featuers/authentication/Signup"));
const Login = lazy(() => import("./featuers/authentication/Login"));

const ChatLayout = lazy(() => import("./featuers/chat/ChatLayout"));
const CreateChat = lazy(() => import("./featuers/chat/CreateChat"));

const Home = lazy(() => import("./pages/Home"));

const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<PageSpinner />}>
        <AppLayout />
      </Suspense>
    ),
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
