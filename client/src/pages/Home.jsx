import { useSelector } from "react-redux";
import ButtonLink from "../ui/ButtonLink";

function Home() {
  const user = useSelector((state) => state.user);

  const links = [
    { path: "/quiz/quiz-list-category", label: "Start a quiz" },
    { path: "/chats", label: "Join a chat group" },
  ];

  return (
    <>
      {user ? (
        <div>
          <div className="text-center flex flex-col items-center mb-20">
            <div className="mb-10">
              <h1 className="bg-gradient-to-tr from-blue-700 to-blue-500 inline-block text-transparent bg-clip-text text-4xl font-bold">
                Welcome to QuizMaster!
              </h1>
              <br />
              <h2 className="bg-gradient-to-tr from-neutral-500 to-neutral-400 inline-block text-transparent bg-clip-text text-3xl font-bold">
                Unleash Your Curiosity
              </h2>
            </div>

            <p className="text-neutral-500 text-lg w-2/3">
              Are you ready to dive into a world of knowledge, fun, and friendly competition? Look no further! QuizMaster is your ultimate destination
              for quizzes, brain teasers, and mind-boggling challenges.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2">
            {links.map(({ path, label }) => (
              <ButtonLink key={label} url={path} styleType="fill" customeStyle="justify-center text-lg py-2">
                <div className="w-40 start-links-style">{label}</div>
              </ButtonLink>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-neutral-200">
          <h1 className="text-xl">Hi, Welcome to React Quiz App</h1>
        </div>
      )}
    </>
  );
}

export default Home;
